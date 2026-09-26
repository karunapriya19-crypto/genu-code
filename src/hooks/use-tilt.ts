import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

/**
 * Small reusable 3D pointer-tilt effect. Attach the returned props to any
 * card-like element for a premium hover tilt — no extra libraries needed.
 *
 *   const tilt = useTilt3D();
 *   <div ref={tilt.ref} style={tilt.style} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
 */
export function useTilt3D(maxTiltDeg = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 350ms ease",
  });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${px * maxTiltDeg * 2}deg) rotateX(${-py * maxTiltDeg * 2}deg)`,
      transition: "transform 60ms ease-out",
    });
  }

  function onMouseLeave() {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 400ms ease",
    });
  }

  return { ref, style, onMouseMove, onMouseLeave };
}

