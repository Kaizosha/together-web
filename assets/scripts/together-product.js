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

})();
