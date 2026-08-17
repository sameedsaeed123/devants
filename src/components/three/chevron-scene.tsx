"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/* ============================================================
   DevAnts 3D hero scene.

   Engine pattern adapted from the scroll-3d plugin's
   3d-scene-effect / pointer-follow-effect engines
   (github.com/ankitstage21/3D-website), ported from vanilla
   DOMContentLoaded scripts to a React effect:
     - progress()      -> scrollProgress()
     - capDPR()        -> Math.min(devicePixelRatio, 2)
     - lerp damping    -> pointer easing in the rAF tick
     - reduced motion  -> single static pose, no rAF loop
   The subject is modelled on the DevAnts mark: three stacked
   chevrons plus two antennae.
   ============================================================ */

/** Shared scroll math: 0 at section top, 1 when it has scrolled past. */
function scrollProgress(rect: DOMRect, viewportHeight: number): number {
  const scrollable = rect.height - viewportHeight;
  if (scrollable <= 0) {
    return Math.min(Math.max(-rect.top / rect.height, 0), 1);
  }
  return Math.min(Math.max(-rect.top / scrollable, 0), 1);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * One chevron: two bevelled arms meeting at a point, like the logo's stripes.
 * Arms are rotated 45° and offset so their inner ends meet at x=0, forming a
 * clean downward "V" rather than crossing over into an X.
 */
function buildChevron(material: THREE.Material, span: number, thickness: number): THREE.Group {
  const chevron = new THREE.Group();
  const armLength = span * 0.58;
  const tilt = 0.7; // ~40°

  for (const side of [-1, 1]) {
    const geometry = new THREE.BoxGeometry(armLength, thickness, thickness * 1.3);
    const arm = new THREE.Mesh(geometry, material);
    // Inner tips meet at the BOTTOM centre and outer tips rise away, so the pair
    // forms a downward-pointing "V" — matching the DevAnts mark, not an inverted caret.
    const half = armLength / 2;
    arm.position.set(side * half * Math.cos(tilt), -half * Math.sin(tilt), 0);
    arm.rotation.z = side * tilt;
    chevron.add(arm);
  }

  return chevron;
}

/** Slender curved antenna with a rounded tip. */
function buildAntenna(material: THREE.Material, side: number): THREE.Group {
  const antenna = new THREE.Group();

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 0.1, 0, 0),
    new THREE.Vector3(side * 0.45, 0.6, 0),
    new THREE.Vector3(side * 0.95, 1.05, 0),
  ]);

  const stalk = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, 0.045, 10, false), material);
  antenna.add(stalk);

  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), material);
  tip.scale.set(1.5, 0.85, 0.85);
  tip.position.copy(curve.getPoint(1));
  tip.rotation.z = side * 0.7;
  antenna.add(tip);

  return antenna;
}

export function ChevronScene({
  className,
  /** Section whose scroll drives the camera. Defaults to the canvas's parent. */
  scrollTargetId,
  /** Overall size of the mark. 1 fills its container; lower it when sitting behind text. */
  scale = 1,
  /** Push the mark away from camera. Use for the behind-the-headline treatment. */
  depth = 0,
}: {
  className?: string;
  scrollTargetId?: string;
  scale?: number;
  depth?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scrollTarget: HTMLElement =
      (scrollTargetId ? document.getElementById(scrollTargetId) : null) ??
      canvas.parentElement ??
      canvas;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // let the CSS/hero gradient show through
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();

    // --- Materials: brand teal, lightly metallic so the rim light reads ------
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#12b2ad"),
      metalness: 0.62,
      roughness: 0.28,
      emissive: new THREE.Color("#04565c"),
      emissiveIntensity: 0.35,
    });
    const antennaMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2fcfc9"),
      metalness: 0.5,
      roughness: 0.35,
    });

    // --- Subject: the DevAnts mark -----------------------------------------
    const mark = new THREE.Group();
    const chevronSpans = [2.6, 2.42, 2.24];
    const chevrons: THREE.Group[] = [];

    chevronSpans.forEach((span, index) => {
      const chevron = buildChevron(bodyMaterial, span, 0.26);
      chevron.position.y = 0.95 - index * 0.85;
      chevron.userData.restY = chevron.position.y;
      chevron.userData.index = index;
      chevrons.push(chevron);
      mark.add(chevron);
    });

    const antennae = new THREE.Group();
    antennae.add(buildAntenna(antennaMaterial, -1));
    antennae.add(buildAntenna(antennaMaterial, 1));
    // Antennae rise from the top chevron's outer edge, as in the mark
    antennae.position.y = 1.5;
    mark.add(antennae);

    mark.rotation.x = 0.1;
    // Scale is set in resize() from the measured bounds — keep it at 1 here so
    // the bounding box below is measured at the model's natural size.
    mark.position.z = -depth;
    scene.add(mark);

    // --- Ambient particle field for depth ----------------------------------
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#6ee4de"),
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Lighting: key + rim + fill (never ambient-only) -------------------
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(3.5, 4.5, 5);
    const rim = new THREE.DirectionalLight(new THREE.Color("#2fcfc9"), 1.5);
    rim.position.set(-4.5, 1.5, -3.5);
    const under = new THREE.PointLight(new THREE.Color("#0d8a86"), 12, 12);
    under.position.set(0, -2.6, 2);
    const fill = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(key, rim, under, fill);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    /** Orbit radius. Held CONSTANT so the mark never changes apparent size. */
    const radius = 7.2;
    camera.position.set(0, 0, radius);

    // Natural size of the model, measured once, used to fit it to any canvas.
    const bounds = new THREE.Box3().setFromObject(mark);
    const size = bounds.getSize(new THREE.Vector3());
    const centerOffset = bounds.getCenter(new THREE.Vector3());
    // Re-centre the mark on the origin so orbit and fit are both predictable.
    // Shift down by an extra 10% of height so the asymmetric antenna tips
    // (which only extend upward) have clearance at the top of the canvas.
    mark.position.y -= centerOffset.y + size.y * 0.1;
    const baseHeight = size.y || 1;
    const baseWidth = size.x || 1;

    function resize() {
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      /*
        Fit-to-frame: derive the scale from the visible frustum at orbit distance
        rather than hard-coding one. Without this the mark clips off the edge on
        narrow columns and looks lost on wide ones.
        0.72 (down from 0.82) gives extra headroom for the antenna tips which
        sit above the bounding-box centre after the asymmetric re-centring.
      */
      const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * radius;
      const visibleWidth = visibleHeight * camera.aspect;
      const fit = Math.min(visibleHeight / baseHeight, visibleWidth / baseWidth) * 0.72;
      mark.scale.setScalar(fit * scale);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    /**
     * Scroll drives a true constant-radius orbit plus a gentle chevron spread.
     * Radius must stay fixed on both axes — an elliptical path changes the
     * camera distance, which makes the mark swell and clip its own canvas.
     */
    const antennaeRestY = antennae.position.y;

    function applyProgress(p: number) {
      const angle = p * Math.PI * 0.42;
      camera.position.x = Math.sin(angle) * radius;
      camera.position.z = Math.cos(angle) * radius;
      // Reduced from 1.1 → 0.4 so the camera rising upward doesn't push the
      // antenna tips out of the top of the canvas during scroll.
      camera.position.y = p * 0.4;
      camera.lookAt(0, 0, 0);

      chevrons.forEach((chevron) => {
        const index = chevron.userData.index as number;
        chevron.position.y = (chevron.userData.restY as number) - p * (index + 1) * 0.16;
        chevron.rotation.y = p * Math.PI * (0.3 + index * 0.12);
        chevron.position.z = p * index * 0.28;
      });

      // Reduced from 0.5 → 0.2 so the antennae don't rise out of the canvas top.
      antennae.position.y = antennaeRestY + p * 0.2;
      antennae.rotation.y = p * 0.6;
      particles.rotation.y = p * 0.6;
    }

    /** Pointer adds a shallow parallax tilt on top of the scroll pose. */
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    function applyPointer() {
      mark.rotation.y += pointerX * 0.22;
      mark.rotation.x = 0.1 + pointerY * 0.14;
    }

    function render() {
      renderer.render(scene, camera);
    }

    // Reduced motion: one static, well-composed pose. No rAF, no listeners.
    if (reduceMotion) {
      applyProgress(0.12);
      render();
      return () => {
        observer.disconnect();
        renderer.dispose();
        particleGeometry.dispose();
        bodyMaterial.dispose();
        antennaMaterial.dispose();
        particleMaterial.dispose();
      };
    }

    function onPointerMove(event: PointerEvent) {
      const rect = scrollTarget.getBoundingClientRect();
      pointerTargetX = Math.min(Math.max(((event.clientX - rect.left) / rect.width) * 2 - 1, -1), 1);
      pointerTargetY = Math.min(Math.max(((event.clientY - rect.top) / rect.height) * 2 - 1, -1), 1);
    }
    function onPointerLeave() {
      pointerTargetX = 0;
      pointerTargetY = 0;
    }

    if (finePointer) {
      scrollTarget.addEventListener("pointermove", onPointerMove);
      scrollTarget.addEventListener("pointerleave", onPointerLeave);
    }

    let frame = 0;
    let elapsed = 0;

    function tick() {
      elapsed += 0.006;

      const rect = scrollTarget.getBoundingClientRect();
      const visible = !(rect.bottom < -window.innerHeight || rect.top > window.innerHeight);

      if (visible) {
        applyProgress(scrollProgress(rect, window.innerHeight));

        pointerX = lerp(pointerX, pointerTargetX, 0.06);
        pointerY = lerp(pointerY, pointerTargetY, 0.06);
        applyPointer();

        // Idle breathing so the scene is never completely still
        mark.position.y = Math.sin(elapsed) * 0.09;
        particles.rotation.x = Math.sin(elapsed * 0.4) * 0.08;

        render();
      }

      frame = requestAnimationFrame(tick);
    }

    render();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (finePointer) {
        scrollTarget.removeEventListener("pointermove", onPointerMove);
        scrollTarget.removeEventListener("pointerleave", onPointerLeave);
      }
      // Release every GPU resource — the page mounts several WebGL sections
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      particleGeometry.dispose();
      bodyMaterial.dispose();
      antennaMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [scrollTargetId, scale, depth]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("size-full", className)}
      // Decorative: the hero headline carries the meaning
      aria-hidden="true"
    />
  );
}

export default ChevronScene;
