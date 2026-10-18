import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface OrbitSphereProps {
  images: string[];
  isPaused: boolean;
  onTogglePause: () => void;
  label: string;
}

const OrbitSphere: React.FC<OrbitSphereProps> = ({ images, isPaused, onTogglePause, label }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload images
    let isCancelled = false;
    const loaded: HTMLImageElement[] = [];

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isCancelled) {
          loaded.push(img);
        }
      };
    });

    loadedImagesRef.current = loaded;

    return () => {
      isCancelled = true;
    };
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina support for ultra-crisp resolution
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2.5) : 1;
    const baseSize = 448;
    canvas.width = Math.round(baseSize * dpr);
    canvas.height = Math.round(baseSize * dpr);
    canvas.style.width = `${baseSize}px`;
    canvas.style.height = `${baseSize}px`;

    // Number of floating items arranged on a sphere (dense cloud of project screens)
    const count = 22;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    // Generate points on sphere (Fibonacci sphere algorithm)
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      return { x, y, z, imgIndex: i % images.length };
    });

    // 20% larger dimensions: 234 x 150 (was 195 x 125)
    const sphereRadius = 220;
    const cardBaseW = 234;
    const cardBaseH = 150;

    let lastTime = performance.now();
    const rotationSpeed = 0.00018; // Slow, fluid, cinematic rotation

    const render = (now: number) => {
      const delta = Math.min(now - lastTime, 32);
      lastTime = now;

      if (!isPaused) {
        angleRef.current += rotationSpeed * delta;
      }

      const rot = angleRef.current;
      const cx = baseSize / 2;
      const cy = baseSize / 2;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.clearRect(0, 0, baseSize, baseSize);

      // Deep space dark background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, baseSize, baseSize);

      // Subtle ambient center glow
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 230);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, baseSize, baseSize);

      // Rotate points around Y and slightly X axis
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);
      const tilt = 0.26; // slight tilt for 3D perspective
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      const projected = points.map((p) => {
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;
        let ry = p.y;

        let ty = ry * cosX - rz * sinX;
        let tz = ry * sinX + rz * cosX;

        // Scale and perspective
        const k = 520 / (520 - tz * sphereRadius);
        const px = cx + rx * sphereRadius * k;
        const py = cy + ty * sphereRadius * k;

        // Scale factor: closer cards are larger
        const scale = (tz + 1.25) / 2.25;
        const opacity = Math.max(0.28, Math.min(1, (tz + 1.1) / 1.55));

        return {
          px,
          py,
          tz,
          scale,
          opacity,
          imgIndex: p.imgIndex
        };
      });

      // Sort by tz (draw farthest first for correct painter's depth)
      projected.sort((a, b) => a.tz - b.tz);

      // Draw cards
      projected.forEach((p) => {
        const w = cardBaseW * p.scale;
        const h = cardBaseH * p.scale;
        const x = p.px - w / 2;
        const y = p.py - h / 2;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        // Drop shadow for 3D depth
        if (p.tz > 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
          ctx.shadowBlur = 20 * p.scale;
          ctx.shadowOffsetY = 10 * p.scale;
        }

        // Rounded rect card
        const radius = 10 * p.scale;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, [radius]);
        ctx.fillStyle = '#1c1c1e';
        ctx.fill();

        // Border
        ctx.lineWidth = 1;
        ctx.strokeStyle = p.tz > 0 ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.08)';
        ctx.stroke();

        // Clip to rounded rect for image
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, [radius]);
        ctx.clip();

        const img = loadedImagesRef.current[p.imgIndex % loadedImagesRef.current.length];
        if (img && img.complete && img.naturalWidth > 0) {
          // Object-fit: cover with top alignment to preserve crisp design details
          const imgW = img.naturalWidth;
          const imgH = img.naturalHeight;
          const targetRatio = w / h;
          let srcW = imgW;
          let srcH = imgW / targetRatio;
          let srcX = 0;
          let srcY = 0;

          if (srcH > imgH) {
            srcH = imgH;
            srcW = imgH * targetRatio;
            srcX = (imgW - srcW) / 2;
            srcY = 0;
          }

          ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
        } else {
          // Placeholder gradient if image not yet loaded
          const phGrad = ctx.createLinearGradient(x, y, x + w, y + h);
          phGrad.addColorStop(0, '#2a2a2e');
          phGrad.addColorStop(1, '#18181a');
          ctx.fillStyle = phGrad;
          ctx.fill();
        }

        ctx.restore();
        ctx.restore();
      });

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPaused, images]);

  return (
    <div className="federal-orbit-box">
      <div className="orbit-canvas-wrapper" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="orbit-canvas"
        />
      </div>
      <p className="sr-only">{label}</p>
      <div className="orbit-btn-container">
        <button
          type="button"
          tabIndex={0}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
          onClick={onTogglePause}
          className="orbit-playback-btn"
        >
          {isPaused ? (
            // Play fill icon
            <svg fill="currentColor" height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4v16l13-8z" />
            </svg>
          ) : (
            // Pause fill icon
            <svg fill="currentColor" height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export const HomeFeatureSections: React.FC = () => {
  const { language } = useLanguage();
  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);

  // High-resolution real preview images (varied & dense project catalog)
  const projectImages = [
    '/wayk-mages/1.png',
    '/wayk-mages/6.png',
    '/wayk-mages/2.png',
    '/resources-images/helix-preview.png',
    '/wayk-mages/3.png',
    '/wayk-mages/7.png',
    '/wayk-mages/4.png',
    '/resources-images/waykout-preview.png',
    '/wayk-mages/5.png',
    '/wayk-mages/1.png',
    '/wayk-mages/6.png',
    '/wayk-mages/2.png',
    '/wayk-mages/7.png',
    '/wayk-mages/3.png'
  ];

  const resourceImages = [
    '/resources-images/cover-components.png',
    '/resources-images/modes.png',
    '/resources-images/icons-var.png',
    '/resources-images/cover-ui-flow.png',
    '/resources-images/helix-preview.png'
  ];

  const copy = {
    es: {
      projects: {
        heading: "Diseño de producto\n\"end-to-end\"",
        body: "De MVPs de cero a uno hasta sistemas de diseño a gran escala. Estrategia, investigación de usuarios y artesanía visual rigurosa para crear productos digitales consistentes.",
        cta: "Ver proyectos",
        link: "/projects",
        sr: "Esfera animada de capturas de proyectos girando en órbita 3D."
      },
      resources: {
        heading: "Herramientas abiertas\npara la comunidad",
        body: "Plugins de Figma, sistemas de variables y plantillas de flujo de trabajo creadas para elevar el oficio y compartidas con más de 1000 diseñadores.",
        cta: "Explorar recursos",
        link: "/resources",
        sr: "Esfera animada de recursos y plugins de Figma girando en órbita 3D."
      }
    },
    en: {
      projects: {
        heading: "End-to-end\nProduct Design",
        body: "From zero-to-one MVPs to large-scale enterprise design systems. Grounded in user research, systems thinking, and meticulous visual craft.",
        cta: "See projects",
        link: "/projects",
        sr: "Animated 3D sphere of product previews rotating in space."
      },
      resources: {
        heading: "Open tools for the\ndesign community",
        body: "Figma plugins, variable libraries, and workflow documentation built to elevate the craft—used by 1000+ product designers worldwide.",
        cta: "Explore resources",
        link: "/resources",
        sr: "Animated 3D sphere of Figma plugins and resources rotating in space."
      }
    }
  };

  const text = language === 'es' ? copy.es : copy.en;

  return (
    <section id="how-it-works" className="site-feature-container">
      {/* SECTION 1: PROJECTS */}
      <div className="site-feature-row">
        {/* Col Start 3 (Media) */}
        <div className="site-feature-media-col">
          <OrbitSphere
            images={projectImages}
            isPaused={paused1}
            onTogglePause={() => setPaused1(!paused1)}
            label={text.projects.sr}
          />
        </div>

        {/* Col Start 8 (Copy) */}
        <div className="site-feature-copy-col">
          <div className="site-feature-text-group">
            <h2 className="type-feature-heading">
              {text.projects.heading.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < text.projects.heading.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="type-site-body">
              {text.projects.body}
            </p>
          </div>
          <Link to={text.projects.link} className="site-underline-link">
            {text.projects.cta}
          </Link>
        </div>
      </div>

      {/* SECTION 2: RESOURCES */}
      <div className="site-feature-row">
        {/* Col Start 3 (Media) */}
        <div className="site-feature-media-col">
          <div className="federal-orbit-box browser-dock-box">
            <svg aria-hidden="true" className="size-full" viewBox="0 0 453 453" fill="none">
              <g clipPath="url(#clip0_52_31647)">
                <path d="M0 0H453V453H0V0Z" fill="url(#paint0_linear_52_31647)" />
                <g filter="url(#filter0_d_52_31647)">
                  <path
                    d="M825.25 121H65.75C45.4535 121 29 137.454 29 157.75V280.25C29 300.546 45.4535 317 65.75 317H825.25C845.546 317 862 300.546 862 280.25V157.75C862 137.454 845.546 121 825.25 121Z"
                    fill="url(#paint1_linear_52_31647)"
                    stroke="white"
                    strokeOpacity={0.85}
                  />
                  <path
                    d="M482.25 157.75H408.75C395.219 157.75 384.25 168.719 384.25 182.25V255.75C384.25 269.281 395.219 280.25 408.75 280.25H482.25C495.781 280.25 506.75 269.281 506.75 255.75V182.25C506.75 168.719 495.781 157.75 482.25 157.75Z"
                    fill="white"
                  />
                </g>
                <path
                  d="M162.75 157.3H89.25C75.719 157.3 64.75 168.269 64.75 181.8V255.3C64.75 268.831 75.719 279.8 89.25 279.8H162.75C176.281 279.8 187.25 268.831 187.25 255.3V181.8C187.25 168.269 176.281 157.3 162.75 157.3Z"
                  fill="white"
                />
                <g clipPath="url(#clip1_52_31647)">
                  <path d="M125.927 217.551C125.927 210.987 131.247 205.667 137.807 205.667H139.525C139.572 205.669 139.623 205.666 139.672 205.666C147.032 205.666 153 211.638 153 219C153 226.362 147.032 232.333 139.672 232.333C139.623 232.333 139.572 232.331 139.524 232.331L137.807 232.333C131.247 232.333 125.927 227.01 125.927 220.447V217.551Z" fill="#00B6FF" />
                  <path d="M99 245.669C99 238.305 104.968 232.333 112.328 232.333L125.927 232.335V245.532C125.927 252.972 119.831 259 112.394 259C105.035 259 99 253.031 99 245.669Z" fill="#24CB71" />
                  <path d="M125.927 179.002V205.667H139.525C139.572 205.666 139.623 205.669 139.672 205.669C147.032 205.669 153 199.696 153 192.334C153 184.971 147.032 179 139.672 179C139.623 179 139.572 179.002 139.524 179.002H125.927Z" fill="#FF7237" />
                  <path d="M99 192.333C99 199.696 104.968 205.667 112.328 205.667H125.927V179.001H112.327C104.968 179.001 99 184.971 99 192.333Z" fill="#FF3737" />
                  <path d="M99 219C99 226.364 104.968 232.335 112.328 232.335H125.927V205.669H112.327C104.968 205.669 99 211.638 99 219Z" fill="#874FFF" />
                </g>
                <g clipPath="url(#clip2_52_31647)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M252.774 158H320.226C335.502 158 348 170.454 348 185.676V252.324C348 267.546 335.502 280 320.226 280H252.774C237.498 280 225 267.546 225 252.324V185.676C225 170.454 237.498 158 252.774 158Z"
                    fill="#D77655"
                  />
                  <path
                    d="M259.178 233.794L276.872 223.901L277.17 223.042L276.872 222.564L276.01 222.564L273.053 222.382L262.943 222.11L254.175 221.747L245.68 221.293L243.543 220.839L241.539 218.207L241.745 216.895L243.543 215.69L246.117 215.914L251.807 216.301L260.344 216.888L266.538 217.252L275.713 218.201H277.17L277.377 217.615L276.879 217.252L276.49 216.888L267.655 210.922L258.091 204.618L253.082 200.987L250.374 199.148L249.007 197.423L248.419 193.66L250.878 190.961L254.181 191.185L255.025 191.409L258.371 193.974L265.518 199.487L274.85 206.336L276.217 207.468L276.763 207.081L276.83 206.808L276.217 205.786L271.141 196.643L265.724 187.343L263.313 183.489L262.676 181.178C262.451 180.228 262.287 179.429 262.287 178.455L265.087 174.667L266.635 174.171L270.369 174.667L271.942 176.029L274.262 181.317L278.02 189.643L283.85 200.964L285.556 204.322L286.467 207.432L286.807 208.382L287.395 208.381V207.837L287.875 201.459L288.761 193.63L289.624 183.555L289.921 180.718L291.33 177.317L294.129 175.478L296.315 176.519L298.112 179.084L297.863 180.742L296.795 187.664L294.7 198.507L293.334 205.767H294.129L295.04 204.86L298.726 199.983L304.92 192.268L307.652 189.207L310.84 185.825L312.886 184.215L316.754 184.215L319.602 188.432L318.327 192.789L314.344 197.823L311.04 202.088L306.304 208.441L303.347 213.524L303.62 213.929L304.325 213.863L315.024 211.594L320.804 210.553L327.702 209.373L330.823 210.825L331.164 212.302L329.937 215.321L322.559 217.136L313.907 218.861L301.021 221.898L300.864 222.013L301.046 222.237L306.851 222.782L309.334 222.915H315.412L326.73 223.756L329.688 225.704L331.461 228.088L331.163 229.904L326.609 232.215L320.464 230.763L306.122 227.362L301.203 226.14L300.523 226.14V226.545L304.622 230.539L312.133 237.297L321.539 246.01L322.019 248.164L320.81 249.865L319.535 249.683L311.271 243.487L308.083 240.698L300.863 234.641L300.384 234.641V235.276L302.048 237.703L310.834 250.863L311.289 254.899L310.652 256.212L308.375 257.004L305.873 256.551L300.73 249.356L295.423 241.254L291.142 233.994L290.62 234.29L288.094 261.403L286.91 262.788L284.177 263.829L281.9 262.105L280.692 259.315L281.9 253.803L283.358 246.609L284.541 240.891L285.61 233.788L286.248 231.428L286.205 231.271L285.683 231.337L280.309 238.689L272.136 249.695L265.669 256.593L264.121 257.204L261.437 255.818L261.686 253.344L263.186 251.141L272.136 239.796L277.534 232.765L281.02 228.705L280.995 228.118H280.789L257.017 243.499L252.784 244.044L250.963 242.343L251.188 239.554L252.05 238.647L259.197 233.745L259.172 233.77L259.178 233.794Z"
                    fill="#FCF2EE"
                  />
                </g>
                <image href="/resources-images/google-antigravity.png" x="402" y="179" width="88" height="80" />
              </g>
              <defs>
                <filter id="filter0_d_52_31647" x="-11.5" y="84.5" width="914" height="277" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="20" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_52_31647" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_52_31647" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_52_31647" x1="0" y1="0" x2="453" y2="453" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FAFAFA" />
                  <stop offset="1" stopColor="#EEEEEE" />
                </linearGradient>
                <linearGradient id="paint1_linear_52_31647" x1="-2.01282e-07" y1="122.45" x2="-2.01282e-07" y2="316.45" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E9E9E9" />
                  <stop offset="1" stopColor="#D8D8D8" />
                </linearGradient>
                <clipPath id="clip0_52_31647">
                  <rect width="453" height="453" fill="white" />
                </clipPath>
                <clipPath id="clip1_52_31647">
                  <rect width="54" height="80" fill="white" transform="translate(99 179)" />
                </clipPath>
                <clipPath id="clip2_52_31647">
                  <rect width="123" height="122" fill="white" transform="translate(225 158)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {/* Col Start 8 (Copy) */}
        <div className="site-feature-copy-col">
          <div className="site-feature-text-group">
            <h2 className="type-feature-heading">
              {text.resources.heading.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < text.resources.heading.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="type-site-body">
              {text.resources.body}
            </p>
          </div>
          <Link to={text.resources.link} className="site-underline-link">
            {text.resources.cta}
          </Link>
        </div>
      </div>
    </section>
  );
};
