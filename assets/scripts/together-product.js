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
  const savedProductState = window.history.state?.kaizoshaProduct;
  const requestedSlot = currentUrl.searchParams.has("slot")
    ? currentUrl.searchParams.get("slot")
    : savedProductState?.slot;
  const requestedScroll = Number.parseFloat(
    currentUrl.searchParams.has("scroll")
      ? currentUrl.searchParams.get("scroll") ?? ""
      : String(savedProductState?.scroll ?? ""),
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
  const activeCell = main.querySelector(".product-cell.is-active");
  const scrollRegion = main.querySelector(".product-scroll, .together-scroll");
  const lead = scrollRegion?.querySelector(
    ":scope > .product-lead, :scope > .together-lead",
  );
  const cue = main.querySelector("[data-product-cue]");
  const returnCue = main.querySelector("[data-product-return]");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const productName = main.dataset.activeProduct ?? "product";

  if (!activeCell || !scrollRegion || !lead || !returnCue) {
    return;
  }

  const returnDestination = new URL("https://kaizosha.org/");

  returnDestination.searchParams.set("handoff", "return");
  returnDestination.searchParams.set("product", productName);
  returnDestination.searchParams.set("slot", activeSlot);
  returnCue.href = returnDestination.href;

  if (Number.isFinite(requestedScroll) && requestedScroll > 0) {
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

      if (Number.isFinite(requestedScroll) && requestedScroll > 0) {
        destination.searchParams.set(
          "scroll",
          String(Math.round(requestedScroll * 100) / 100),
        );
      }

      link.href = destination.href;
    },
  );

  const removeDuplicateReferences = (root) => {
    root.querySelectorAll("[id]").forEach((element) => {
      element.removeAttribute("id");
    });

    root
      .querySelectorAll("[aria-controls], [aria-describedby], [aria-labelledby]")
      .forEach((element) => {
        element.removeAttribute("aria-controls");
        element.removeAttribute("aria-describedby");
        element.removeAttribute("aria-labelledby");
      });
  };

  const returnPreview = lead.cloneNode(true);

  returnPreview.classList.add("product-return-preview-lead");
  returnPreview.setAttribute("aria-hidden", "true");
  returnPreview.setAttribute("inert", "");
  removeDuplicateReferences(returnPreview);

  const previewHeading = returnPreview.querySelector("h1");

  if (previewHeading) {
    const replacementHeading = document.createElement("h2");

    Array.from(previewHeading.attributes).forEach((attribute) => {
      replacementHeading.setAttribute(attribute.name, attribute.value);
    });

    while (previewHeading.firstChild) {
      replacementHeading.append(previewHeading.firstChild);
    }

    previewHeading.replaceWith(replacementHeading);
  }

  const previewCue = returnPreview.querySelector("[data-product-cue]");

  previewCue?.removeAttribute("data-product-cue");
  activeCell.append(returnPreview);

  const returnStatus = document.createElement("p");

  returnStatus.className = "u-screen-reader";
  returnStatus.setAttribute("role", "status");
  returnStatus.setAttribute("aria-live", "polite");
  returnStatus.setAttribute("aria-atomic", "true");
  main.append(returnStatus);

  const regularCueText = () =>
    finePointer.matches
      ? `[ SCROLL TO OPEN ${productName} ↓ ]`
      : `[ SWIPE UP TO OPEN ${productName} ↑ ]`;
  const returnCueText = () =>
    finePointer.matches
      ? "[ KEEP SCROLLING TO RETURN TO KAIZŌSHA ↓ ]"
      : "[ SWIPE UP TO RETURN TO KAIZŌSHA ↑ ]";
  let isReturningToDirectory = false;

  const syncCues = () => {
    if (cue) {
      cue.textContent = regularCueText();
    }

    returnCue.textContent = isReturningToDirectory
      ? regularCueText()
      : returnCueText();

    if (previewCue) {
      previewCue.textContent = regularCueText();
    }
  };

  syncCues();
  finePointer.addEventListener?.("change", syncCues);

  const returnWheelThreshold = 220;
  const returnTouchThreshold = 120;
  const returnFrameCompletion = 0.82;
  const returnNavigationDelay = 160;
  let returnProgress = 0;
  let returnResetTimer = null;
  let returnFrameResetTimer = null;
  let returnFrameOrigin = null;
  let returnFrameTarget = null;
  let returnPinFrame = null;
  let touchIsTracking = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const clearReturnReset = () => {
    if (returnResetTimer !== null) {
      window.clearTimeout(returnResetTimer);
      returnResetTimer = null;
    }
  };

  const clearReturnFrameReset = () => {
    if (returnFrameResetTimer !== null) {
      window.clearTimeout(returnFrameResetTimer);
      returnFrameResetTimer = null;
    }
  };

  const stopPinningScrollEnd = () => {
    if (returnPinFrame !== null) {
      window.cancelAnimationFrame(returnPinFrame);
      returnPinFrame = null;
    }
  };

  const pinScrollEnd = () => {
    if (returnProgress <= 0) {
      stopPinningScrollEnd();
      return;
    }

    scrollRegion.scrollTop = scrollRegion.scrollHeight;
    returnPreview.scrollTop = returnPreview.scrollHeight;
    returnPinFrame = window.requestAnimationFrame(pinScrollEnd);
  };

  const startPinningScrollEnd = () => {
    if (returnPinFrame === null) {
      pinScrollEnd();
    }
  };

  const getReturnFrameTarget = () => {
    const originalClass = main.getAttribute("class");
    const originalStyle = main.getAttribute("style");

    main.classList.remove("product-main", "together-main");
    main.classList.remove(
      "is-product-return-preview",
      "is-product-return-resetting",
      "is-wheel-return",
    );
    main.style.removeProperty("width");
    main.style.removeProperty("height");
    main.style.setProperty("animation", "none");

    const frame = main.getBoundingClientRect();

    if (originalClass === null) {
      main.removeAttribute("class");
    } else {
      main.setAttribute("class", originalClass);
    }

    if (originalStyle === null) {
      main.removeAttribute("style");
    } else {
      main.setAttribute("style", originalStyle);
    }

    return { height: frame.height, width: frame.width };
  };

  const updateReturnFrame = (progress) => {
    clearReturnFrameReset();
    main.classList.remove("is-product-return-resetting");

    if (!returnFrameOrigin) {
      const frame = main.getBoundingClientRect();

      returnFrameOrigin = { height: frame.height, width: frame.width };
      returnFrameTarget = getReturnFrameTarget();
    }

    const frameProgress = Math.min(1, progress / returnFrameCompletion);
    const width =
      returnFrameOrigin.width +
      (returnFrameTarget.width - returnFrameOrigin.width) * frameProgress;
    const height =
      returnFrameOrigin.height +
      (returnFrameTarget.height - returnFrameOrigin.height) * frameProgress;

    main.classList.add("is-product-return-preview");
    main.style.width = `${width}px`;
    main.style.height = `${height}px`;
    main.style.setProperty(
      "--product-return-preview-opacity",
      String(Math.min(1, progress / 0.35)),
    );
    startPinningScrollEnd();
  };

  const resetReturnFrame = ({ immediate = false } = {}) => {
    clearReturnFrameReset();
    main.classList.remove("is-wheel-return");

    if (immediate || reducedMotion.matches) {
      returnFrameOrigin = null;
      returnFrameTarget = null;
      main.classList.remove(
        "is-product-return-preview",
        "is-product-return-resetting",
      );
      main.style.removeProperty("width");
      main.style.removeProperty("height");
      main.style.removeProperty("--product-return-preview-opacity");
      return;
    }

    main.classList.add("is-product-return-resetting");
    main.style.setProperty("--product-return-preview-opacity", "0");
    main.style.removeProperty("width");
    main.style.removeProperty("height");
    returnFrameResetTimer = window.setTimeout(() => {
      returnFrameOrigin = null;
      returnFrameTarget = null;
      main.classList.remove(
        "is-product-return-preview",
        "is-product-return-resetting",
      );
      main.style.removeProperty("--product-return-preview-opacity");
      returnFrameResetTimer = null;
    }, 220);
  };

  const setReturnProgress = (value) => {
    returnProgress = Math.min(1, Math.max(0, value));
    returnCue.style.setProperty(
      "--scroll-handoff-progress",
      String(returnProgress),
    );

    if (returnProgress > 0) {
      startPinningScrollEnd();

      if (!reducedMotion.matches || returnProgress === 1) {
        updateReturnFrame(returnProgress);
      }
    } else {
      stopPinningScrollEnd();
    }
  };

  const resetReturn = ({ immediate = false } = {}) => {
    clearReturnReset();
    setReturnProgress(0);
    resetReturnFrame({ immediate });
  };

  const scheduleReturnReset = () => {
    clearReturnReset();
    returnResetTimer = window.setTimeout(() => {
      if (!isReturningToDirectory) {
        resetReturn();
      }
    }, 1100);
  };

  const isAtScrollEnd = () =>
    scrollRegion.scrollTop + scrollRegion.clientHeight >=
    scrollRegion.scrollHeight - 3;

  const buildReturnUrl = () => {
    const destination = new URL(returnDestination.href);
    const compactScrollTop = Math.max(
      0,
      returnPreview.scrollHeight - returnPreview.clientHeight,
    );

    if (compactScrollTop > 0) {
      destination.searchParams.set(
        "scroll",
        String(Math.round(compactScrollTop * 100) / 100),
      );
    }

    return destination;
  };

  const openDirectory = () => {
    if (isReturningToDirectory) {
      return;
    }

    isReturningToDirectory = true;
    touchIsTracking = false;
    clearReturnReset();
    setReturnProgress(1);
    main.classList.add("is-product-return-navigating");
    syncCues();
    returnStatus.textContent = `Returning from ${productName} to Kaizōsha.`;

    const navigate = () => window.location.assign(buildReturnUrl().href);

    window.requestAnimationFrame(() => {
      if (reducedMotion.matches) {
        window.requestAnimationFrame(navigate);
        return;
      }

      window.setTimeout(navigate, returnNavigationDelay);
    });
  };

  returnCue.addEventListener("click", (event) => {
    event.preventDefault();
    main.classList.add("is-wheel-return");
    openDirectory();
  });

  scrollRegion.addEventListener(
    "wheel",
    (event) => {
      if (isReturningToDirectory) {
        event.preventDefault();
        return;
      }

      const multiplier =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      const deltaX = event.deltaX * multiplier;
      const deltaY = event.deltaY * multiplier;

      if (deltaY <= 0 || Math.abs(deltaY) <= Math.abs(deltaX)) {
        if (deltaY < 0 && returnProgress > 0) {
          resetReturn();
        }

        return;
      }

      if (returnProgress === 0 && !isAtScrollEnd()) {
        return;
      }

      event.preventDefault();
      clearReturnReset();
      main.classList.add("is-wheel-return");
      setReturnProgress(
        returnProgress + deltaY / returnWheelThreshold,
      );

      if (returnProgress >= 1) {
        openDirectory();
        return;
      }

      scheduleReturnReset();
    },
    { passive: false },
  );

  scrollRegion.addEventListener(
    "touchstart",
    (event) => {
      if (
        event.touches.length !== 1 ||
        isReturningToDirectory ||
        !isAtScrollEnd()
      ) {
        touchIsTracking = false;
        return;
      }

      const touch = event.touches[0];

      resetReturn();
      touchIsTracking = true;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  scrollRegion.addEventListener(
    "touchmove",
    (event) => {
      if (
        !touchIsTracking ||
        event.touches.length !== 1 ||
        isReturningToDirectory
      ) {
        return;
      }

      const touch = event.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touchStartY - touch.clientY;

      if (deltaY <= 0 || Math.abs(deltaY) <= Math.abs(deltaX)) {
        touchIsTracking = false;
        resetReturn();
        return;
      }

      event.preventDefault();
      setReturnProgress(deltaY / returnTouchThreshold);
    },
    { passive: false },
  );

  scrollRegion.addEventListener("touchend", () => {
    const shouldReturn = touchIsTracking && returnProgress >= 1;

    touchIsTracking = false;

    if (shouldReturn) {
      openDirectory();
    } else if (!isReturningToDirectory) {
      resetReturn();
    }
  });

  scrollRegion.addEventListener("touchcancel", () => {
    touchIsTracking = false;

    if (!isReturningToDirectory) {
      resetReturn();
    }
  });

  main.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && returnProgress > 0) {
      event.preventDefault();
      touchIsTracking = false;
      resetReturn();
    }
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted && !isReturningToDirectory) {
      return;
    }

    isReturningToDirectory = false;
    touchIsTracking = false;
    clearReturnReset();
    clearReturnFrameReset();
    returnProgress = 0;
    returnFrameOrigin = null;
    returnFrameTarget = null;
    stopPinningScrollEnd();
    main.classList.remove(
      "is-product-return-preview",
      "is-product-return-resetting",
      "is-product-return-navigating",
      "is-wheel-return",
    );
    main.style.removeProperty("width");
    main.style.removeProperty("height");
    main.style.removeProperty("--product-return-preview-opacity");
    returnCue.style.setProperty("--scroll-handoff-progress", "0");
    returnStatus.textContent = "";
    syncCues();
  });

  const syncReturnFrameForViewport = () => {
    if (
      returnProgress <= 0 ||
      isReturningToDirectory ||
      (reducedMotion.matches && returnProgress < 1)
    ) {
      return;
    }

    const currentFrame = main.getBoundingClientRect();
    const frameProgress = Math.min(
      1,
      returnProgress / returnFrameCompletion,
    );

    returnFrameTarget = getReturnFrameTarget();

    if (frameProgress < 1) {
      returnFrameOrigin = {
        width:
          (currentFrame.width - returnFrameTarget.width * frameProgress) /
          (1 - frameProgress),
        height:
          (currentFrame.height - returnFrameTarget.height * frameProgress) /
          (1 - frameProgress),
      };
    }

    updateReturnFrame(returnProgress);
  };

  window.addEventListener("resize", syncReturnFrameForViewport);
  window.visualViewport?.addEventListener(
    "resize",
    syncReturnFrameForViewport,
  );

  if (
    currentUrl.searchParams.has("slot") ||
    currentUrl.searchParams.has("scroll")
  ) {
    currentUrl.searchParams.delete("slot");
    currentUrl.searchParams.delete("scroll");
    const remainingQuery = currentUrl.searchParams.toString();

    const currentState =
      window.history.state && typeof window.history.state === "object"
        ? { ...window.history.state }
        : {};

    currentState.kaizoshaProduct = {
      version: 1,
      slot: activeSlot,
      scroll:
        Number.isFinite(requestedScroll) && requestedScroll > 0
          ? Math.round(requestedScroll * 100) / 100
          : 0,
    };

    window.history.replaceState(
      currentState,
      "",
      `${currentUrl.pathname}${remainingQuery ? `?${remainingQuery}` : ""}${currentUrl.hash}`,
    );
  }

  document.documentElement.classList.remove("product-page-booting");
})();
