import { useEffect } from "react";

/** Light tactile acknowledgement on supported touch devices; controls work without vibration. */
export function TouchFeedback() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !navigator.vibrate) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button:not(:disabled), a[href], [role='tab'], [role='slider']")) {
        navigator.vibrate(8);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);
  return null;
}