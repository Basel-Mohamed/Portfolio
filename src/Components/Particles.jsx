import theme from './styles/theme';
import { useMemo } from 'react';

export default function Particles() {
  const { colors } = theme;

  const particles = useMemo(() => {
    const generateRandomParticles = () => {
      return [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`
      }));
    };
    return generateRandomParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float"
          style={{
            backgroundColor: colors.effects.particle,
            opacity: colors.effects.particleOpacity,
            ...style
          }}
        />
      ))}
    </div>
  );
}