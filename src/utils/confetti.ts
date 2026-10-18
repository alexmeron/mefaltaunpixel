export const fireConfetti = (originX?: number, originY?: number) => {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const startX = originX ?? w / 2;
  const startY = originY ?? h / 2;

  const COLORS = [
    '#FAC31D', // Brand yellow
    '#F6085A', // Accent magenta
    '#3B82F6', // Vibrant blue
    '#10B981', // Emerald mint
    '#8B5CF6', // Purple
    '#FF9F43', // Orange
    '#00E5FF', // Cyan
    '#EC4899'  // Pink
  ];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    aspect: number;
    shape: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    life: number;
    maxLife: number;
    drag: number;
    gravity: number;
  }

  const particles: Particle[] = [];
  const count = 130;

  for (let i = 0; i < count; i++) {
    // Burst upwards & outwards in a fountain arc
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.35;
    const speed = Math.random() * 15 + 7;
    const life = Math.random() * 50 + 65;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 7 + 5,
      aspect: Math.random() > 0.4 ? Math.random() * 1.4 + 1.2 : 1,
      shape: Math.floor(Math.random() * 3), // 0: rect, 1: pill, 2: circle
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      life,
      maxLife: life,
      drag: 0.955,
      gravity: 0.35
    });
  }

  let animId: number;
  const render = () => {
    ctx.clearRect(0, 0, w, h);
    let active = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.life <= 0) continue;
      active++;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.rotation += p.rotationSpeed;
      p.life--;
      p.opacity = Math.max(0, p.life / p.maxLife);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      const pw = p.size * p.aspect;
      const ph = p.size;

      if (p.shape === 0) {
        ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
      } else if (p.shape === 1) {
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2);
        } else {
          ctx.rect(-pw / 2, -ph / 2, pw, ph);
        }
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (active > 0) {
      animId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animId);
      canvas.remove();
    }
  };

  animId = requestAnimationFrame(render);
};
