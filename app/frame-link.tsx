"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type FrameLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

export function FrameLink({ children, href, onClick, ...props }: FrameLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    const frame = document.querySelector<HTMLElement>(
      ".together-canvas, .document-shell, .error-main",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!frame || reducedMotion) {
      window.location.assign(href);
      return;
    }

    frame.classList.add("is-leaving");
    window.setTimeout(() => window.location.assign(href), 180);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
