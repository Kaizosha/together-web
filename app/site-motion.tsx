"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frame: number | null = null;
    let previousTime = 0;

    const writePosition = () => {
      root.style.setProperty("--grid-shift-x", `${current.x.toFixed(2)}px`);
      root.style.setProperty("--grid-shift-y", `${current.y.toFixed(2)}px`);
    };

    const stop = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      previousTime = 0;
    };

    const animate = (time: number) => {
      if (document.hidden || reducedMotion.matches) {
        stop();
        return;
      }

      const duration = previousTime ? Math.min(time - previousTime, 50) : 16.67;
      const easing = 1 - Math.pow(0.88, duration / 16.67);
      previousTime = time;
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      if (
        Math.abs(target.x - current.x) < 0.02 &&
        Math.abs(target.y - current.y) < 0.02
      ) {
        current.x = target.x;
        current.y = target.y;
        writePosition();
        stop();
        return;
      }

      writePosition();
      frame = window.requestAnimationFrame(animate);
    };

    const requestFrame = () => {
      if (frame === null && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const reset = () => {
      target.x = 0;
      target.y = 0;
      requestFrame();
    };

    const handlePointer = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      target.x = (event.clientX / window.innerWidth - 0.5) * 64;
      target.y = (event.clientY / window.innerHeight - 0.5) * 48;
      requestFrame();
    };

    const syncPreferences = () => {
      if (reducedMotion.matches) {
        target.x = 0;
        target.y = 0;
        current.x = 0;
        current.y = 0;
        stop();
        writePosition();
      } else if (!finePointer.matches) {
        reset();
      }
    };

    const clearLeavingState = () => {
      document
        .querySelectorAll<HTMLElement>(
          ".together-canvas.is-leaving, .document-shell.is-leaving, .error-main.is-leaving",
        )
        .forEach((frameElement) => frameElement.classList.remove("is-leaving"));
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else requestFrame();
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("pageshow", clearLeavingState);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", handleVisibility);
    finePointer.addEventListener("change", syncPreferences);
    reducedMotion.addEventListener("change", syncPreferences);
    syncPreferences();
    clearLeavingState();

    return () => {
      stop();
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", reset);
      window.removeEventListener("pageshow", clearLeavingState);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", handleVisibility);
      finePointer.removeEventListener("change", syncPreferences);
      reducedMotion.removeEventListener("change", syncPreferences);
      root.style.removeProperty("--grid-shift-x");
      root.style.removeProperty("--grid-shift-y");
    };
  }, []);

  return null;
}
