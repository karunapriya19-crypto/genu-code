import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Purely decorative 3D scene for the hero section: a wireframe "market orb"
 * with a nested glow shell, two orbiting rings, a warm halo, and a
 * multi-colored drifting particle field — colored from the same design
 * tokens as the rest of the site (emerald / azure / gold). It idles with a
 * gentle float and gently tilts toward the pointer. No market data is
 * involved — visual flourish only, client-rendered (safe under TanStack
 * Start's SSR since everything here runs inside useEffect).
 */
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.set(0, 0, 9.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Warm halo — a large back-facing, near-transparent sphere that reads as
    // an atmospheric glow behind everything else.
    const haloGeo = new THREE.IcosahedronGeometry(5.2, 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    group.add(halo);

    // Emerald wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Gold inner glow shell
    const glowGeo = new THREE.IcosahedronGeometry(2.05, 2);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // Gold orbital ring
    const ringGoldGeo = new THREE.TorusGeometry(3.6, 0.025, 12, 120);
    const ringGoldMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.5,
    });
    const ringGold = new THREE.Mesh(ringGoldGeo, ringGoldMat);
    ringGold.rotation.x = Math.PI / 2.3;
    group.add(ringGold);

    // Azure orbital ring, different tilt and speed
    const ringAzureGeo = new THREE.TorusGeometry(4.2, 0.02, 12, 120);
    const ringAzureMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
    });
    const ringAzure = new THREE.Mesh(ringAzureGeo, ringAzureMat);
    ringAzure.rotation.x = -Math.PI / 2.6;
    ringAzure.rotation.y = 0.4;
    group.add(ringAzure);

    // Multi-colored particle field (emerald / azure / gold)
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0x34d399),
      new THREE.Color(0x60a5fa),
      new THREE.Color(0xfbbf24),
    ];
    for (let i = 0; i < particleCount; i += 1) {
      const r = 3.3 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[i % palette.length]!;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    let targetX = 0;
    let targetY = 0;
    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.7;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
    }
    if (!prefersReducedMotion) window.addEventListener("pointermove", onPointerMove);

    function onResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", onResize);

    let frameId = 0;
    const clock = new THREE.Clock();

    function renderFrame() {
      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 0.6) * 0.15;
      group.rotation.y = t * 0.12 + targetX;
      group.rotation.x = targetY;
      core.rotation.y = t * 0.18;
      core.rotation.x = t * 0.09;
      glow.rotation.y = -t * 0.12;
      glow.rotation.x = t * 0.06;
      ringGold.rotation.z = t * 0.15;
      ringAzure.rotation.z = -t * 0.11;
      particles.rotation.y = t * 0.04;
      renderer.render(scene, camera);
    }

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        renderFrame();
      };
      animate();
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      ringGoldGeo.dispose();
      ringGoldMat.dispose();
      ringAzureGeo.dispose();
      ringAzureMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-70 md:opacity-95"
      aria-hidden="true"
    />
  );
}

