import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A rotating "neural network" sphere: nodes on a Fibonacci sphere joined to
 * their nearest neighbours, a few accent "active" nodes that pulse, and a tilted
 * orbit ring with a travelling satellite. Follows the pointer, reacts to scroll,
 * pauses off-screen, and renders a single still frame for reduced motion.
 * Colours come from the theme tokens, so it re-tints in light / dark mode.
 */
export default function NeuralOrb({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // no WebGL — the hero simply shows without the orb
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0;transition:opacity 1.4s ease';
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = 5.2; // frames the 1.38 orbit ring with margin
    const group = new THREE.Group();
    group.rotation.x = 0.35;
    scene.add(group);

    // ── Nodes on a Fibonacci sphere ──
    const N = small ? 420 : 900;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const j = 1 + (Math.random() - 0.5) * 0.07;
      nodes.push(new THREE.Vector3(Math.cos(golden * i) * r * j, y * j, Math.sin(golden * i) * r * j));
    }
    const inkPos: number[] = [];
    const accentPos: number[] = [];
    nodes.forEach(p => (Math.random() < 0.09 ? accentPos : inkPos).push(p.x, p.y, p.z));

    // ── Edges: up to 3 nearest neighbours within reach ──
    const reach = Math.sqrt((4 * Math.PI) / N) * 1.45;
    const edgePos: number[] = [];
    for (let a = 0; a < N; a++) {
      let links = 0;
      for (let b = a + 1; b < N && links < 3; b++) {
        if (nodes[a].distanceTo(nodes[b]) < reach) {
          edgePos.push(nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z);
          links++;
        }
      }
    }

    // Round point sprite
    const dot = document.createElement('canvas');
    dot.width = dot.height = 64;
    const g = dot.getContext('2d')!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.55, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(dot);

    const geoOf = (arr: number[]) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
      return geo;
    };

    const inkGeo = geoOf(inkPos);
    const accentGeo = geoOf(accentPos);
    const edgeGeo = geoOf(edgePos);
    const inkMat = new THREE.PointsMaterial({ size: small ? 0.05 : 0.042, map: sprite, transparent: true, depthWrite: false, alphaTest: 0.05 });
    const accentMat = new THREE.PointsMaterial({ size: small ? 0.1 : 0.09, map: sprite, transparent: true, depthWrite: false, alphaTest: 0.05 });
    const edgeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.24, depthWrite: false });
    group.add(new THREE.LineSegments(edgeGeo, edgeMat));
    group.add(new THREE.Points(inkGeo, inkMat));
    group.add(new THREE.Points(accentGeo, accentMat));

    // ── Orbit ring + satellite ──
    const ringPts = new THREE.EllipseCurve(0, 0, 1.38, 1.38, 0, Math.PI * 2).getPoints(160);
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts.map(p => new THREE.Vector3(p.x, p.y, 0)));
    const ringMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55 });
    const ring = new THREE.LineLoop(ringGeo, ringMat);
    const orbit = new THREE.Group();
    orbit.rotation.set(1.15, 0.35, 0);
    orbit.add(ring);
    const satGeo = new THREE.SphereGeometry(0.045, 20, 20);
    const satMat = new THREE.MeshBasicMaterial();
    const sat = new THREE.Mesh(satGeo, satMat);
    orbit.add(sat);
    scene.add(orbit);

    // ── Theme colours (with depth fog towards the page background) ──
    const applyTheme = () => {
      const css = getComputedStyle(document.documentElement);
      const ink = new THREE.Color(css.getPropertyValue('--ink').trim() || '#14213d');
      const accent = new THREE.Color(css.getPropertyValue('--accent').trim() || '#ff6b5b');
      const bg = new THREE.Color(css.getPropertyValue('--bg').trim() || '#f4ede0');
      inkMat.color = ink;
      edgeMat.color = ink;
      accentMat.color = accent;
      ringMat.color = accent;
      satMat.color = accent;
      scene.fog = new THREE.Fog(bg, 4.4, 6.9); // back of the sphere fades into the page
    };
    applyTheme();

    // ── Sizing ──
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ── Input ──
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // ── Loop ──
    let raf = 0;
    let visible = true;
    let t = 0;
    let scale = 0.72;
    let last = performance.now();
    const clock = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      return dt;
    };

    const draw = (dt: number) => {
      t += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const scrollP = Math.min(window.scrollY / window.innerHeight, 1.2);
      scale += (1 - scrollP * 0.12 - scale) * 0.05;

      group.rotation.y = t * 0.09 + pointer.x * 0.6 + scrollP * 1.2;
      group.rotation.x = 0.35 + pointer.y * 0.35;
      group.scale.setScalar(scale);
      orbit.scale.setScalar(scale);
      orbit.rotation.z = t * 0.05;
      const a = t * 0.6;
      sat.position.set(Math.cos(a) * 1.38, Math.sin(a) * 1.38, 0);
      accentMat.opacity = 0.7 + Math.sin(t * 2.2) * 0.3;
      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        clock();
        return;
      }
      draw(clock());
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(host);

    const themeObserver = new MutationObserver(() => {
      applyTheme();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (reduced) {
      scale = 1;
      draw(0);
    } else {
      loop();
    }
    requestAnimationFrame(() => (canvas.style.opacity = '1'));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      [inkGeo, accentGeo, edgeGeo, ringGeo, satGeo].forEach(x => x.dispose());
      [inkMat, accentMat, edgeMat, ringMat, satMat].forEach(x => x.dispose());
      sprite.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
