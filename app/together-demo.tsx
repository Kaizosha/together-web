"use client";

import { useState } from "react";

const demoModes = {
  transcribe: {
    number: "01",
    label: "Transcribe",
    file: "speech.session",
    status: "LISTENING / ON DEVICE",
    description:
      "Together turns speech into timed captions while the video stays on your device.",
  },
  translate: {
    number: "02",
    label: "Translate",
    file: "translation.session",
    status: "EN → FR / BILINGUAL",
    description:
      "Keep the original, show a translation, or read both languages together.",
  },
  export: {
    number: "03",
    label: "Export",
    file: "export.queue",
    status: "CAPTIONS + VIDEO / READY",
    description:
      "Take the result with you as a caption file or a new video with captions included.",
  },
} as const;

type DemoMode = keyof typeof demoModes;

function DemoVisual({ mode }: { mode: DemoMode }) {
  if (mode === "transcribe") {
    return (
      <div className="waveform" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    );
  }

  if (mode === "translate") {
    return (
      <div className="language-route" aria-hidden="true">
        <span>EN</span>
        <i>
          <b />
        </i>
        <span>FR</span>
      </div>
    );
  }

  return (
    <div className="export-stack" aria-hidden="true">
      <span>VTT</span>
      <span>TTML</span>
      <span>MOV</span>
      <span>MP4</span>
    </div>
  );
}

export function TogetherDemo() {
  const [demoMode, setDemoMode] = useState<DemoMode>("transcribe");
  const activeDemo = demoModes[demoMode];

  return (
    <figure className={`caption-demo caption-demo--${demoMode}`}>
      <div className="demo-toolbar">
        <span>[ {activeDemo.file} ]</span>
        <span>{activeDemo.status}</span>
      </div>
      <div className="demo-stage">
        <div className="draft-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <DemoVisual mode={demoMode} />
        <div className="caption-pair">
          <p>
            <span>ORIGINAL / EN</span>
            Watch anything.
          </p>
          <p
            className={demoMode === "transcribe" ? "is-muted" : ""}
            lang="fr"
          >
            <span>TRANSLATED / FR</span>
            Regardez ce que vous voulez.
          </p>
        </div>
      </div>
      <figcaption className="demo-caption">
        <div
          className="demo-controls"
          role="group"
          aria-label="Explore Together features"
        >
          {(Object.keys(demoModes) as DemoMode[]).map((mode) => {
            const item = demoModes[mode];
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={demoMode === mode}
                onClick={() => setDemoMode(mode)}
              >
                <span>{item.number}</span> {item.label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite">{activeDemo.description}</p>
      </figcaption>
    </figure>
  );
}
