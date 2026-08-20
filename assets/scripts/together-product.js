(() => {
  "use strict";

  const allowedSlots = new Set([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]);
  const main = document.querySelector(".home-main");
  const requestedSlot = new URL(window.location.href).searchParams.get("slot");

  if (main && allowedSlots.has(requestedSlot)) {
    const activeCell = main.querySelector(".product-cell.is-active");
    const previousSlot = activeCell?.dataset.productSlot;
    const destinationCell = main.querySelector(
      `.product-cell[data-product-slot="${requestedSlot}"]`,
    );

    if (activeCell && destinationCell && previousSlot) {
      destinationCell.dataset.productSlot = previousSlot;
      activeCell.dataset.productSlot = requestedSlot;
    }

    main.dataset.activeSlot = requestedSlot;

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("slot");
    window.history.replaceState(null, "", `${cleanUrl.pathname}${cleanUrl.hash}`);
  }

  const clearLeavingState = () => {
    main?.classList.remove("is-navigating-product");
  };

  window.addEventListener("pageshow", clearLeavingState);

  document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.addEventListener("click", (event) => {
      const eventTarget =
        event.target instanceof Element ? event.target : null;
      const link = eventTarget?.closest("a[href]");
      const isSameDocumentHash =
        Boolean(link?.hash) &&
        link.origin === window.location.origin &&
        link.pathname === window.location.pathname;

      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.protocol === "mailto:" ||
        isSameDocumentHash
      ) {
        return;
      }

      event.preventDefault();
      main?.classList.add("is-navigating-product");

      const navigate = () => window.location.assign(link.href);

      if (!main || reducedMotion.matches) {
        navigate();
        return;
      }

      window.setTimeout(navigate, 180);
    });
  });
})();
