"use client";

import { useEffect } from "react";

export function DocumentNavigation() {
  useEffect(() => {
    const documentNav = document.querySelector<HTMLElement>(".document-nav");
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section"));
    if (!documentNav || !sections.length) return;

    let frame: number | null = null;
    let current: HTMLElement | null = null;

    const update = () => {
      frame = null;
      const navBounds = documentNav.getBoundingClientRect();
      const stickyTop = Number.parseFloat(
        window.getComputedStyle(documentNav).top,
      ) || 0;
      const isScrolled =
        window.scrollY > 0 && navBounds.top <= stickyTop + 0.5;
      let next = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= navBounds.bottom + 1) {
          next = section;
        } else {
          break;
        }
      }

      document.body.classList.toggle("document-is-scrolled", isScrolled);

      if (next === current) return;
      current?.classList.remove("is-current");
      next.classList.add("is-current");
      current = next;
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    update();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      document.body.classList.remove("document-is-scrolled");
    };
  }, []);

  return null;
}
