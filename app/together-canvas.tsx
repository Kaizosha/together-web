"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { FrameLink } from "./frame-link";

const capabilities = [
  {
    id: "caption",
    slot: "top-left",
    label: "Caption",
    eyebrow: "01 / SPEECH FINDS ITS TIME",
    description:
      "Generate realtime captions on device, use an embedded track, or bring a supported sidecar file. The words stay aligned with the video.",
    meta: "REALTIME / EMBEDDED / SIDECAR",
  },
  {
    id: "translate",
    slot: "top-right",
    label: "Translate",
    eyebrow: "02 / KEEP EITHER LINE OR BOTH",
    description:
      "Translation begins Off. Choose a target language, then read the original, the translation, or a bilingual pair while the video keeps moving.",
    meta: "ORIGINAL / TRANSLATED / BILINGUAL",
  },
  {
    id: "export",
    slot: "bottom-left",
    label: "Export",
    eyebrow: "03 / THE OUTPUT IS YOURS",
    description:
      "Save captions as a file, add a selectable subtitle track to a new video, or render the words into every frame. The selected source is never modified.",
    meta: "VTT / SRT / TTML / TXT / MD / JSON / MOV / MP4",
  },
  {
    id: "private",
    slot: "bottom-right",
    label: "Private",
    eyebrow: "04 / THE DEVICE IS THE BOUNDARY",
    description:
      "No account, advertising, analytics, tracking, crash-report upload, or cloud sync. Your selected media and its derived text are not uploaded to Kaizōsha.",
    meta: "ON DEVICE / NO MEDIA UPLOAD",
  },
] as const;

export function TogetherCanvas() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mountedDetailId, setMountedDetailId] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const canvasRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const markRef = useRef<HTMLButtonElement>(null);
  const detailHideTimer = useRef<number | null>(null);
  const introCloseTimer = useRef<number | null>(null);
  const pointerActivationTimer = useRef<number | null>(null);
  const dialogReturnCapability = useRef<string | null>(null);
  const suppressFocusActivation = useRef(false);
  const suppressPointerActivation = useRef(false);
  const active = capabilities.find((item) => item.id === activeId) ?? null;

  const clearDetailHide = useCallback(() => {
    if (detailHideTimer.current !== null) {
      window.clearTimeout(detailHideTimer.current);
      detailHideTimer.current = null;
    }
  }, []);

  const activateCapability = useCallback(
    (id: string) => {
      clearDetailHide();
      setMountedDetailId(id);
      setActiveId(id);
    },
    [clearDetailHide],
  );

  const closeCapability = useCallback(
    (id: string, restoreFocus = false, immediate = false) => {
      clearDetailHide();
      setActiveId((current) => (current === id ? null : current));

      const hideDetail = () => {
        setMountedDetailId((current) => (current === id ? null : current));
        detailHideTimer.current = null;
      };

      if (
        immediate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        hideDetail();
      } else {
        detailHideTimer.current = window.setTimeout(hideDetail, 620);
      }

      if (restoreFocus) {
        suppressFocusActivation.current = true;
        suppressPointerActivation.current = true;
        if (pointerActivationTimer.current !== null) {
          window.clearTimeout(pointerActivationTimer.current);
        }
        pointerActivationTimer.current = window.setTimeout(() => {
          suppressPointerActivation.current = false;
          pointerActivationTimer.current = null;
        }, 620);
        window.requestAnimationFrame(() => {
          document.getElementById(`${id}-button`)?.focus({ preventScroll: true });
          suppressFocusActivation.current = false;
        });
      }
    },
    [clearDetailHide],
  );

  function openProductInfo(returnCapabilityId: string | null = null) {
    dialogReturnCapability.current = returnCapabilityId;
    if (activeId) closeCapability(activeId, false, true);

    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.classList.remove("is-closing");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    setInfoOpen(true);
  }

  function closeProductInfo() {
    const dialog = dialogRef.current;
    if (!dialog || introCloseTimer.current !== null) return;

    const finish = () => {
      introCloseTimer.current = null;
      if (typeof dialog.close === "function") dialog.close();
      else {
        dialog.removeAttribute("open");
        handleProductInfoClosed();
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    dialog.classList.add("is-closing");
    introCloseTimer.current = window.setTimeout(finish, 180);
  }

  function handleProductInfoClosed() {
    const dialog = dialogRef.current;
    dialog?.classList.remove("is-closing");
    setInfoOpen(false);

    const returnId = dialogReturnCapability.current;
    dialogReturnCapability.current = null;

    if (returnId) {
      suppressFocusActivation.current = true;
      activateCapability(returnId);
      window.requestAnimationFrame(() => {
        document
          .getElementById(`${returnId}-button`)
          ?.focus({ preventScroll: true });
        suppressFocusActivation.current = false;
      });
      return;
    }

    markRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      clearDetailHide();
      if (introCloseTimer.current !== null) {
        window.clearTimeout(introCloseTimer.current);
      }
      if (pointerActivationTimer.current !== null) {
        window.clearTimeout(pointerActivationTimer.current);
      }
    },
    [clearDetailHide],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeId) {
        event.preventDefault();
        closeCapability(activeId, true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, closeCapability]);

  return (
    <main
      className="together-canvas"
      id="main-content"
      ref={canvasRef}
      tabIndex={-1}
      data-active-slot={active?.slot}
      aria-labelledby="site-title"
      onPointerLeave={() => {
        if (
          finePointer &&
          activeId &&
          !canvasRef.current?.contains(document.activeElement)
        ) {
          closeCapability(activeId);
        }
      }}
    >
      <h1 className="u-screen-reader" id="site-title">
        Together — private captions and translation for iPhone and iPad
      </h1>

      <dialog
        id="product-intro"
        className="product-intro"
        ref={dialogRef}
        aria-labelledby="product-intro-title"
        aria-describedby="product-intro-description"
        onCancel={(event) => {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            event.preventDefault();
            closeProductInfo();
          }
        }}
        onClose={handleProductInfoClosed}
      >
        <div className="product-intro__file" aria-hidden="true">
          [ PRODUCT.md ]
        </div>
        <div className="product-intro__body">
          <p className="product-intro__brand">Together / Kaizōsha</p>
          <h2 id="product-intro-title">Different language. Same moment.</h2>
          <div id="product-intro-description">
            <p className="product-intro__lead">
              Together captions and optionally translates selected videos on
              iPhone and iPad.
            </p>
            <p className="product-intro__focus">
              Imported media and the text derived from it are processed on the
              device and are not uploaded to Kaizōsha.
            </p>
          </div>
          <div className="product-intro__meta">
            <span>iPhone + iPad / iOS 26+</span>
            <span>In development</span>
          </div>
        </div>
        <div className="product-intro__actions">
          <button type="button" onClick={closeProductInfo}>
            [ CLOSE ]
          </button>
          <a href="mailto:contact@kaizosha.org?subject=Together">
            [ ASK ABOUT TOGETHER ↗ ]
          </a>
        </div>
      </dialog>

      <header className="together-toolbar">
        <FrameLink href="https://kaizosha.org/">[ ← KAIZŌSHA ]</FrameLink>
        <span aria-hidden="true">[ TOGETHER.md ]</span>
        <FrameLink href="/privacy">[ PRIVACY ]</FrameLink>
      </header>

      <div
        className={`capability-grid${active ? " has-active" : ""}`}
        role="list"
        aria-label="Together capabilities"
      >
        {capabilities.map((capability) => {
          const isActive = capability.id === activeId;

          return (
            <article
              className={`capability-cell${isActive ? " is-active" : ""}`}
              data-slot={capability.slot}
              key={capability.id}
              role="listitem"
              onPointerEnter={(event) => {
                if (
                  finePointer &&
                  event.pointerType !== "touch" &&
                  !suppressPointerActivation.current
                ) {
                  activateCapability(capability.id);
                }
              }}
              onFocus={() => {
                if (!suppressFocusActivation.current) {
                  activateCapability(capability.id);
                }
              }}
            >
              <div className="capability-cell__content">
                <h2 className="capability-cell__heading">
                  <button
                    id={`${capability.id}-button`}
                    type="button"
                    className="capability-cell__name"
                    aria-expanded={isActive}
                    aria-controls={`${capability.id}-detail`}
                    onClick={() => activateCapability(capability.id)}
                  >
                    {capability.label}
                  </button>
                </h2>

                <div
                  className="capability-cell__detail"
                  id={`${capability.id}-detail`}
                  aria-hidden={!isActive}
                  hidden={mountedDetailId !== capability.id}
                >
                  <p className="capability-cell__eyebrow">
                    {capability.eyebrow}
                  </p>
                  <p className="capability-cell__description">
                    {capability.description}
                  </p>
                  <p className="capability-cell__meta">{capability.meta}</p>
                  <div className="capability-cell__actions">
                    <button
                      type="button"
                      tabIndex={isActive ? undefined : -1}
                      onClick={() => closeCapability(capability.id, true)}
                    >
                      [ CLOSE ]
                    </button>
                    {capability.id === "private" ? (
                      <FrameLink
                        href="/privacy"
                        tabIndex={isActive ? undefined : -1}
                      >
                        [ APP PRIVACY → ]
                      </FrameLink>
                    ) : (
                      <button
                        type="button"
                        tabIndex={isActive ? undefined : -1}
                        aria-haspopup="dialog"
                        aria-controls="product-intro"
                        onClick={() => openProductInfo(capability.id)}
                      >
                        [ PRODUCT INFO → ]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="u-screen-reader" role="status" aria-live="polite">
        {active ? `${active.label} capability expanded.` : ""}
      </p>

      <button
        className="together-mark"
        type="button"
        ref={markRef}
        aria-label="Open Together product information"
        aria-haspopup="dialog"
        aria-controls="product-intro"
        aria-expanded={infoOpen}
        onClick={() => openProductInfo(null)}
      >
        <span className="together-mark__eyebrow" aria-hidden="true">
          ```product
        </span>
        <strong>TOGETHER</strong>
        <span>DIFFERENT LANGUAGE.</span>
        <span>SAME MOMENT.</span>
        <span className="together-mark__end" aria-hidden="true">
          ```
        </span>
      </button>

      <div className="maker-stamp" aria-hidden="true">
        <BrandMark compact />
        <span>KAIZŌSHA</span>
      </div>

      <footer className="together-statusbar">
        <nav aria-label="Together links">
          <FrameLink href="/privacy">[ APP PRIVACY ]</FrameLink>
          <span aria-hidden="true"> / </span>
          <a href="https://kaizosha.org/contact">[ CONTACT ]</a>
        </nav>
        <span>001 / TOGETHER / EOF</span>
      </footer>
    </main>
  );
}
