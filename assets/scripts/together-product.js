(() => {
  "use strict";

  const allowedSlots = new Set([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]);
  const main = document.querySelector(".home-main[data-default-slot]");

  if (!main) {
    return;
  }

  const currentUrl = new URL(window.location.href);
  const requestedSlot = currentUrl.searchParams.get("slot");
  const requestedScroll = Number.parseFloat(
    currentUrl.searchParams.get("scroll") ?? "",
  );
  const defaultSlot = main.dataset.defaultSlot;

  if (allowedSlots.has(requestedSlot) && allowedSlots.has(defaultSlot)) {
    const activeCell = main.querySelector(".product-cell.is-active");
    const previousSlot = activeCell?.dataset.productSlot;
    const destinationCell = main.querySelector(
      `.product-cell[data-product-slot="${requestedSlot}"]`,
    );

    if (activeCell && destinationCell && previousSlot !== requestedSlot) {
      destinationCell.dataset.productSlot = previousSlot;
      activeCell.dataset.productSlot = requestedSlot;
    }

    main.dataset.activeSlot = requestedSlot;
  }

  const activeSlot = allowedSlots.has(main.dataset.activeSlot)
    ? main.dataset.activeSlot
    : defaultSlot;

  const scrollRegion = main.querySelector(".product-scroll, .together-scroll");

  if (scrollRegion && Number.isFinite(requestedScroll) && requestedScroll > 0) {
    const restoreScroll = () => {
      scrollRegion.scrollTo({
        top: requestedScroll,
        behavior: "instant",
      });
    };

    restoreScroll();
    window.requestAnimationFrame(restoreScroll);
  }

  main.querySelectorAll("[data-product-previous], [data-product-next]").forEach(
    (link) => {
      const destination = new URL(link.href);

      destination.searchParams.set("slot", activeSlot);
      link.href = destination.href;
    },
  );

  const cue = main.querySelector("[data-product-cue]");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const productName = main.dataset.activeProduct ?? "product";
  const syncCue = () => {
    if (!cue) {
      return;
    }

    cue.textContent = finePointer.matches
      ? `[ SCROLL TO OPEN ${productName} ↓ ]`
      : `[ SWIPE UP TO OPEN ${productName} ↑ ]`;
  };

  syncCue();
  finePointer.addEventListener?.("change", syncCue);

  if (
    currentUrl.searchParams.has("slot") ||
    currentUrl.searchParams.has("scroll")
  ) {
    currentUrl.searchParams.delete("slot");
    currentUrl.searchParams.delete("scroll");
    const remainingQuery = currentUrl.searchParams.toString();
    window.history.replaceState(
      null,
      "",
      `${currentUrl.pathname}${remainingQuery ? `?${remainingQuery}` : ""}${currentUrl.hash}`,
    );
  }
})();
