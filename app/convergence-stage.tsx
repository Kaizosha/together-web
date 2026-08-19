"use client";

import { useState, type CSSProperties } from "react";

const modes = [
  { label: "SOURCE", split: 100 },
  { label: "COMPARE", split: 52 },
  { label: "TARGET", split: 0 },
] as const;

function World({ target = false }: { target?: boolean }) {
  return (
    <div className={`world-plane${target ? " world-plane--target" : ""}`} aria-hidden={target || undefined}>
      <div className="world-plane__telemetry">
        <span>TOGETHER / IOS + IPADOS / IN DEVELOPMENT</span>
        <span>{target ? "TRANSLATION / FR" : "SOURCE / EN"}</span>
      </div>

      <div className="world-plane__copy">
        {target ? (
          <div className="world-plane__headline">
            Langue différente.
            <br />
            Même instant.
          </div>
        ) : (
          <h1 id="hero-title">
            Different language.
            <br />
            Same moment.
          </h1>
        )}
        <p>
          {target
            ? "Together sous-titre et traduit en option les vidéos sélectionnées sur iPhone et iPad. Les médias et le texte dérivé sont traités sur l’appareil, sans être envoyés à Kaizōsha."
            : "Together captions and optionally translates selected videos on iPhone and iPad. Imported media and derived text are processed on device and are not uploaded to Kaizōsha."}
        </p>
      </div>

      <div className="world-plane__caption">
        {target ? (
          <p lang="fr">
            <span>00:12.480 / FR</span>
            <b>La vidéo reste ici.</b>
          </p>
        ) : (
          <p>
            <span>00:12.480 / EN</span>
            <b>The video stays here.</b>
          </p>
        )}
      </div>
    </div>
  );
}

export function AlignmentStage() {
  const [split, setSplit] = useState(52);
  const [activeMode, setActiveMode] = useState("COMPARE");
  const style = { "--split": `${split}%` } as CSSProperties;
  const edge = split >= 90 ? "source" : split <= 10 ? "target" : "center";

  function chooseMode(label: string, nextSplit: number) {
    setActiveMode(label);
    setSplit(nextSplit);
  }

  return (
    <section
      className="alignment-stage"
      id="main-content"
      tabIndex={-1}
      aria-labelledby="hero-title"
      data-dragging={activeMode === "CUSTOM"}
      data-edge={edge}
      style={style}
    >
      <World />
      <World target />

      <p className="visually-hidden" aria-live="polite">
        Website preview: {split}% source and {100 - split}% translated.
        {split < 100 ? (
          <span lang="fr"> Traduction française : La vidéo reste ici.</span>
        ) : null}
      </p>

      <div className="alignment-seam" aria-hidden="true">
        <span>PREVIEW / {split.toString().padStart(2, "0")}</span>
        <i />
      </div>

      <label className="alignment-range">
        <span className="visually-hidden">Translation alignment</span>
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          aria-valuetext={`${split}% source and ${100 - split}% translated in the website preview`}
          onChange={(event) => {
            setSplit(Number(event.target.value));
            setActiveMode("CUSTOM");
          }}
        />
      </label>

      <div className="stage-controls">
        <div className="stage-modes" role="group" aria-label="Website caption comparison">
          {modes.map((mode) => (
            <button
              key={mode.label}
              type="button"
              aria-pressed={activeMode === mode.label}
              onClick={() => chooseMode(mode.label, mode.split)}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <a href="#trace">FOLLOW ONE LINE ↓</a>
        <a href="mailto:contact@kaizosha.org?subject=Together">ASK ABOUT TOGETHER ↗</a>
      </div>

      <dl className="stage-scope">
        <div><dt>INPUT</dt><dd>PHOTOS · FILES · OPEN IN</dd></div>
        <div><dt>CAPTIONS</dt><dd>REALTIME · EMBEDDED · SIDECAR</dd></div>
        <div><dt>REQUIRES</dt><dd>IOS 26+</dd></div>
        <div><dt>PREVIEW</dt><dd>WEBSITE INTERACTION · NOT AN IN-APP CONTROL</dd></div>
      </dl>
    </section>
  );
}
