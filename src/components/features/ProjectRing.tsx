import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useNavigate } from 'react-router';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Project } from '../../types/portfolio';
import { useUI } from '../../lib/ui-strings';
import { useLanguage } from '../../context/LanguageContext';
import { Chevron, linkClass } from '../ui/primitives';
import { gsap } from '../../lib/motion';
import { HOME_RETURN_KEY } from '../../lib/smoothScroll';

/* Geometry and feel. Modelled on the React Bits "Circular Carousel" cylinder preset. */

/** Card widths in px (laptop, wide screen). The ring radius is derived from the width so cards never overlap. */
const CARD_W = 352;
const CARD_W_WIDE = 448;
const WIDE_QUERY = '(min-width: 1280px)';
const CARD_GAP = 36;
/** Camera: distance in px, and angle in degrees (negative looks down onto the ring). */
const PERSPECTIVE = 2500;
const TILT = -5;
/** How far the camera leans toward the pointer, in degrees. */
const LEAN_Y = 2.5;
const LEAN_X = 1.2;
/** How strongly cards fade as they turn away (0 to 1), and how dark the inside faces at the back are. */
const DEPTH_FADE = 0.78;
const INNER_SHADE = 0.6;
/** A thrown ring keeps gliding for roughly this long (ms) before friction stops it. */
const GLIDE_MS = 620;
/** Idle drift in degrees per second, and how long it takes to pick up speed (ms). */
const DRIFT_SPEED = 8;
const DRIFT_RAMP_MS = 900;

const RING_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/** Address of one project's card on the Projects page. */
const projectHref = (project: Project) => `/projects#project-${project.id}`;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    onChange => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Category and title of one project. NDA status and metrics are left to the Projects page. */
function ProjectInfo({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-ink-muted">{project.category}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{project.title}</h3>
    </div>
  );
}

/**
 * Project showcase for the home page.
 *
 * Large screens: the project images sit on a 3D ring seen from slightly above,
 * with the far side visible and faded. Grab it and it follows the cursor; throw
 * it and it glides to a stop on the nearest project. Arrow buttons, arrow keys
 * and a sideways trackpad swipe also turn it. Clicking a card that faces you
 * (the front one or either neighbour) opens that project on the Projects page;
 * pressing Back returns to the ring.
 * Left alone, it drifts slowly and stops while the pointer is over it.
 *
 * Phones, tablets and reduced motion: a flat row that swipes sideways, with
 * each project's details under its own image.
 */
export function ProjectRing({ projects }: { projects: Project[] }) {
  const ui = useUI();
  const navigate = useNavigate();
  const { dir } = useLanguage();
  const items = projects.filter(p => p.image);
  const count = items.length;
  const useRing = useMediaQuery(RING_QUERY) && count >= 5;
  const cardW = useMediaQuery(WIDE_QUERY) ? CARD_W_WIDE : CARD_W;
  const cardH = cardW * 0.625;

  const rootRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  // Drift direction: -1 carries the front cards left, +1 right. A throw sets it to the way it was thrown.
  const drift = useRef({ speed: 0, dir: -1 });
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const state = useRef({ v: 0 }); // ring rotation in degrees
  const drag = useRef({ active: false, moved: false, startX: 0, startV: 0, lastX: 0, lastT: 0, vel: 0 });
  const [active, setActive] = useState(0);

  const step = 360 / Math.max(count, 1);
  // In Arabic the next project comes from the left, so the ring is laid out mirrored.
  const sign = dir === 'rtl' ? -1 : 1;
  const radius = Math.round(cardW / 2 / Math.tan(Math.PI / Math.max(count, 3)) + CARD_GAP);
  // Degrees per pixel dragged, chosen so the front card stays under the cursor (arc length = distance dragged).
  const degPerPx = 180 / (Math.PI * radius);

  /** Paint the current rotation: turn the ring, fade each card by how far it faces away. */
  const render = useCallback(() => {
    const v = state.current.v;
    if (ringRef.current) gsap.set(ringRef.current, { z: -radius, rotationY: v });
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const facing = Math.cos(((sign * i * step + v) * Math.PI) / 180); // 1 = front, -1 = back
      const away = (1 - facing) / 2;
      card.style.opacity = String(1 - DEPTH_FADE * Math.pow(away, 0.6));
      card.style.filter = facing < 0 ? `brightness(${INNER_SHADE})` : '';
    });
    setActive(mod(Math.round(-v / (sign * step)), count));
  }, [radius, sign, step, count]);

  /** Current position measured in cards (fractional while moving). */
  const position = useCallback(() => -state.current.v / (sign * step), [sign, step]);

  /** Rotate to a position measured in cards (may be fractional or beyond one turn). */
  const rotateTo = useCallback(
    (target: number, duration = 0.9, ease = 'power3.out') => {
      gsap.to(state.current, { v: -target * sign * step, duration, ease, overwrite: true, onUpdate: render });
    },
    [render, sign, step],
  );

  /** Go to a card by index, taking the shorter way round. */
  const goTo = useCallback(
    (index: number) => {
      const now = position();
      let delta = mod(index - now, count);
      if (delta > count / 2) delta -= count;
      rotateTo(now + delta);
    },
    [count, position, rotateTo],
  );

  const shift = (by: number) => rotateTo(Math.round(position()) + by);

  // Lay the ring out whenever its geometry changes (first paint, resize, language switch).
  useEffect(() => {
    if (!useRing) return;
    state.current.v = 0;
    if (cameraRef.current) gsap.set(cameraRef.current, { rotationX: TILT, rotationY: 0 });
    render();
    return () => {
      gsap.killTweensOf(state.current);
    };
  }, [useRing, render]);

  // Idle drift: while the ring is on screen and nobody is touching it, it turns slowly on its own.
  // It stops the moment the pointer or keyboard focus is on the showcase, during a drag, and while
  // the ring is settling, then eases back up to speed afterwards.
  useEffect(() => {
    const root = rootRef.current;
    if (!useRing || !root) return;
    drift.current = { speed: 0, dir: -sign };
    let onScreen = false;
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.35 });
    observer.observe(root);

    const tick = (_time: number, deltaMs: number) => {
      const d = drift.current;
      const idle =
        onScreen &&
        !hovered.current &&
        !drag.current.active &&
        !gsap.isTweening(state.current) &&
        !root.contains(document.activeElement);
      if (!idle) {
        d.speed = 0;
        return;
      }
      d.speed += (DRIFT_SPEED - d.speed) * Math.min(1, deltaMs / DRIFT_RAMP_MS);
      state.current.v += d.dir * d.speed * (deltaMs / 1000);
      render();
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
    };
  }, [useRing, sign, render]);

  // A sideways trackpad swipe turns the ring; vertical scrolling is left to the page.
  useEffect(() => {
    const stage = stageRef.current;
    if (!useRing || !stage) return;
    let settle = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      gsap.killTweensOf(state.current);
      state.current.v -= e.deltaX * degPerPx;
      render();
      window.clearTimeout(settle);
      settle = window.setTimeout(() => rotateTo(Math.round(position()), 0.7), 140);
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      window.clearTimeout(settle);
    };
  }, [useRing, degPerPx, render, rotateTo, position]);

  /** Remember where the home page is, so pressing Back returns to the showcase. */
  const rememberPlace = () => {
    try {
      sessionStorage.setItem(HOME_RETURN_KEY, String(Math.round(window.scrollY)));
    } catch {
      // storage unavailable
    }
  };

  /** Open a project's card on the Projects page. */
  const openProject = (project: Project) => {
    rememberPlace();
    navigate(projectHref(project));
  };

  if (count === 0) return null;

  /* ---------- Flat row: phones, tablets, reduced motion ---------- */
  if (!useRing) {
    return (
      <div>
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
          {items.map(project => (
            <li key={project.id} className="w-[84%] shrink-0 snap-center sm:w-[22rem]">
              <Link to={projectHref(project)} onClick={rememberPlace} className="block aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface-2">
                <img loading="lazy" decoding="async" src={project.image} alt={project.title} className="size-full object-cover" />
              </Link>
              <ProjectInfo project={project} className="mt-5 text-center" />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">
          <Link to="/projects" className={linkClass()}>
            {ui.viewAllProjects}
            <Chevron />
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- 3D ring ---------- */
  const lean = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    gsap.to(cameraRef.current, {
      rotationY: px * 2 * LEAN_Y,
      rotationX: TILT - py * 2 * LEAN_X,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    gsap.killTweensOf(state.current);
    drag.current = { active: true, moved: false, startX: e.clientX, startV: state.current.v, lastX: e.clientX, lastT: e.timeStamp, vel: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    lean(e);
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 8) return;
      d.moved = true;
      // Capture only once it is clearly a drag, so plain clicks still reach the cards.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const dt = e.timeStamp - d.lastT;
    // Smoothed pointer speed in px/ms, so one jittery frame cannot fling the ring.
    if (dt > 0) d.vel = 0.7 * ((e.clientX - d.lastX) / dt) + 0.3 * d.vel;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    state.current.v = d.startV + dx * degPerPx;
    render();
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    // Hand the pointer back straight away, so the very next click reaches a card.
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d.moved) return;
    // A pause before letting go means no throw. Otherwise the ring keeps the speed it
    // was released at and friction slows it: it travels speed x GLIDE_MS further (one
    // full turn at most), lands on the nearest card, and a harder throw glides longer.
    const speed = e.timeStamp - d.lastT > 80 ? 0 : d.vel * degPerPx; // degrees per ms
    const glide = gsap.utils.clamp(-360, 360, speed * GLIDE_MS);
    const target = Math.round(-(state.current.v + glide) / (sign * step));
    const duration = 0.8 + 1.6 * Math.min(1, Math.abs(glide) / 180);
    if (glide !== 0) drift.current.dir = Math.sign(glide); // keep drifting the way it was thrown
    rotateTo(target, duration, 'expo.out');
  };

  /**
   * Which card is drawn at a screen point, or -1.
   *
   * The browser's own hit detection cannot be trusted here: cards that are tilted or
   * turned away sit partly behind the ring's flat container in 3D, so the browser
   * reports a click on the container instead of on the card. This works it out from
   * where each card is actually drawn, and where cards overlap picks the one facing
   * the visitor most, which is the one drawn on top.
   */
  const cardAt = (x: number, y: number) => {
    let best = -1;
    let bestFacing = -Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const box = card.getBoundingClientRect();
      if (x < box.left || x > box.right || y < box.top || y > box.bottom) return;
      const facing = Math.cos(((sign * i * step + state.current.v) * Math.PI) / 180);
      if (facing > bestFacing) {
        bestFacing = facing;
        best = i;
      }
    });
    return best;
  };

  // One click handler for the whole ring, so a click counts wherever it lands on a card,
  // even while the ring is still turning.
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) return;
    const index = cardAt(e.clientX, e.clientY);
    if (index < 0) return;
    // Cards facing the visitor (the front one and its two neighbours) open their project.
    // Cards on the far side of the ring come to the front first.
    let offset = mod(index - Math.round(position()), count);
    if (offset > count / 2) offset -= count;
    if (Math.abs(offset) <= 1) openProject(items[index]);
    else goTo(index);
  };

  const onPointerLeave = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current, { rotationY: 0, rotationX: TILT, duration: 1, ease: 'power3.out', overwrite: true });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      openProject(items[active]);
      return;
    }
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const forward = (e.key === 'ArrowRight') === (dir === 'ltr');
    shift(forward ? 1 : -1);
  };

  const current = items[active] ?? items[0];
  const navBtn =
    'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2';

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => {
        hovered.current = true;
        // Pointer arrived: ease to a stop on the nearest project, unless the ring is already settling.
        if (!drag.current.active && !gsap.isTweening(state.current)) rotateTo(Math.round(position()), 0.8);
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
    >
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={ui.sections.selectedWork}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        className="relative mx-auto cursor-grab touch-pan-y rounded-3xl select-none active:cursor-grabbing"
        style={{ perspective: `${PERSPECTIVE}px`, height: cardH + 150 }}
      >
        {/* camera: tilts down onto the ring and leans toward the pointer */}
        <div ref={cameraRef} className="absolute inset-x-0 top-[90px] bottom-0 [transform-style:preserve-3d]">
          <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d]">
            {items.map((project, i) => (
              <button
                key={project.id}
                ref={el => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                tabIndex={-1}
                aria-label={project.title}
                aria-current={i === active ? 'true' : undefined}
                data-index={i}
                className="absolute top-1/2 left-1/2 aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl border border-line bg-surface-2"
                style={{
                  width: cardW,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `rotateY(${sign * i * step}deg) translateZ(${radius}px)`,
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  src={project.image}
                  alt=""
                  className="pointer-events-none size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between gap-6">
        <button type="button" onClick={() => shift(-1)} className={navBtn} aria-label={ui.project.prev}>
          <LuChevronLeft size={20} aria-hidden="true" className="rtl:-scale-x-100" />
        </button>

        <div className="min-h-24 flex-1 text-center" aria-live="polite">
          {/* key restarts the fade each time the focused project changes */}
          <div key={current.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ProjectInfo project={current} />
          </div>
        </div>

        <button type="button" onClick={() => shift(1)} className={navBtn} aria-label={ui.project.next}>
          <LuChevronRight size={20} aria-hidden="true" className="rtl:-scale-x-100" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="font-mono text-sm text-ink-muted tabular-nums" dir="ltr">
          {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <Link to="/projects" className={linkClass()}>
          {ui.viewAllProjects}
          <Chevron />
        </Link>
      </div>
    </div>
  );
}
