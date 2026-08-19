import type { Metadata } from "next";
import Link from "next/link";
import { TogetherDemo } from "./together-demo";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Together",
  description:
    "Private, on-device video captions and translation for iPhone and iPad.",
  url: "https://together.kaizosha.org/",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "iOS 26 or later; iPadOS 26 or later",
  author: {
    "@type": "Organization",
    name: "Kaizōsha",
    url: "https://kaizosha.org/",
  },
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}`}
      aria-hidden="true"
    >
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">改</span>
      </span>
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">造</span>
      </span>
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">社</span>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="site-shell">
        <header className="file-bar">
          <a className="file-brand" href="https://kaizosha.org/">
            <BrandMark compact />
            <span>[ KAIZŌSHA / TOGETHER.md ]</span>
          </a>
          <nav className="site-nav" aria-label="Together navigation">
            <a href="#workflow">[ WORKFLOW ]</a>
            <a href="#privacy">[ PRIVACY ]</a>
            <a href="#status">[ STATUS ]</a>
          </nav>
        </header>

        <main>
        <section
          className="hero"
          id="main-content"
          tabIndex={-1}
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">01 / IOS + IPADOS / IN DEVELOPMENT</p>
            <h1 id="hero-title">
              Bring worlds
              <br />
              <span>together.</span>
            </h1>
            <p className="hero-lead">
              Understand video in another language without sending it away.
              Together adds private, on-device captions and optional translation
              while you watch.
            </p>
            <div className="hero-actions">
              <a className="literal-link" href="#workflow">
                [ SEE HOW IT WORKS ↓ ]
              </a>
              <a
                className="literal-link"
                href="mailto:contact@kaizosha.org?subject=Together"
              >
                [ ASK ABOUT TOGETHER ↗ ]
              </a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>PLATFORMS</dt>
                <dd>iPhone + iPad</dd>
              </div>
              <div>
                <dt>PROCESSING</dt>
                <dd>Local-first</dd>
              </div>
              <div>
                <dt>REQUIRES</dt>
                <dd>iOS 26+</dd>
              </div>
            </dl>
          </div>

          <TogetherDemo />
        </section>

        <div className="section-band" id="workflow">
          <h2>## THE SHORTEST PATH</h2>
          <span>02</span>
        </div>

        <section className="workflow content-section" aria-labelledby="workflow-title">
          <header className="section-intro">
            <p className="eyebrow">VIDEO → UNDERSTANDING → YOUR FILES</p>
            <h2 id="workflow-title">One video. More understanding.</h2>
            <p>
              The common path stays compact: choose a video, set the languages,
              watch, and export only when you need to.
            </p>
          </header>
          <ol className="step-grid">
            <li>
              <span>01</span>
              <div className="step-glyph step-glyph--choose" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <h3>Choose</h3>
              <p>Add one or more videos from Photos or Files, or open one in Together.</p>
            </li>
            <li>
              <span>02</span>
              <div className="step-glyph step-glyph--languages" aria-hidden="true">
                <b>EN</b>
                <i />
                <b>FR</b>
              </div>
              <h3>Set</h3>
              <p>Confirm the spoken language and optionally choose a translation.</p>
            </li>
            <li>
              <span>03</span>
              <div className="step-glyph step-glyph--watch" aria-hidden="true">
                <i />
                <b />
              </div>
              <h3>Watch</h3>
              <p>Play with realtime or existing captions using native-feeling controls.</p>
            </li>
            <li>
              <span>04</span>
              <div className="step-glyph step-glyph--export" aria-hidden="true">
                <i>VTT</i>
                <i>MOV</i>
              </div>
              <h3>Export</h3>
              <p>Save captions, a selectable subtitle track, or a burned-in video.</p>
            </li>
          </ol>
        </section>

        <div className="section-band">
          <h2>## CAPTIONS IN CONTEXT</h2>
          <span>03</span>
        </div>

        <section className="caption-story content-section" aria-labelledby="captions-title">
          <header className="section-intro section-intro--wide">
            <p className="eyebrow">READ IT YOUR WAY</p>
            <h2 id="captions-title">The video stays central.</h2>
            <p>
              Together uses native playback and caption styles, so words remain
              readable without turning the player into a control panel.
            </p>
          </header>
          <div className="caption-options">
            <article>
              <p className="code-comment">&lt;!-- SOURCE --&gt;</p>
              <h3>Realtime or already there.</h3>
              <p>
                Generate captions from speech, use a readable track in the video,
                or bring a supported caption file.
              </p>
              <span>REALTIME / VIDEO / FILE</span>
            </article>
            <article>
              <p className="code-comment">&lt;!-- PRESENTATION --&gt;</p>
              <h3>One language or both.</h3>
              <p>
                Switch between original, translated, and bilingual captions as
                the moment calls for it.
              </p>
              <span>ORIGINAL / TRANSLATED / BILINGUAL</span>
            </article>
            <article>
              <p className="code-comment">&lt;!-- TRANSCRIPT --&gt;</p>
              <h3>Review before it leaves.</h3>
              <p>
                Search, inspect, share, and edit the transcript before creating
                the output you want.
              </p>
              <span>SEARCH / EDIT / SHARE</span>
            </article>
          </div>
        </section>

        <div className="section-band">
          <h2>## TRANSLATION MODES</h2>
          <span>04</span>
        </div>

        <section className="translation-section content-section" aria-labelledby="translation-title">
          <header className="section-intro">
            <p className="eyebrow">CHOOSE THE RIGHT PACE</p>
            <h2 id="translation-title">Fast when it matters. Focused when context counts.</h2>
          </header>
          <div className="mode-grid">
            <article>
              <span>01 / LOW LATENCY</span>
              <h3>Start sooner.</h3>
              <p>
                The default path favors prompt, broadly available on-device
                translation while the video keeps moving.
              </p>
              <div className="latency-graphic" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <b />
              </div>
            </article>
            <article>
              <span>02 / HIGH FIDELITY</span>
              <h3>Choose quality.</h3>
              <p>
                When the device and Apple Intelligence resources support it,
                choose the optional quality-focused translation strategy.
              </p>
              <div className="fidelity-graphic" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          </div>
        </section>

        <div className="section-band">
          <h2>## OUTPUTS</h2>
          <span>05</span>
        </div>

        <section className="export-section content-section" aria-labelledby="export-title">
          <header className="section-intro">
            <p className="eyebrow">MAKE THE RESULT USEFUL</p>
            <h2 id="export-title">Captions when you need them. Video when you don&apos;t.</h2>
          </header>
          <div className="export-list">
            <article>
              <span>01</span>
              <div>
                <h3>Caption file</h3>
                <p>Separate captions or a readable transcript. The source video stays untouched.</p>
              </div>
              <p>VTT / SRT / TTML / TXT / MD / JSON</p>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Selectable captions</h3>
                <p>Create a new MOV or MP4 with captions the receiving player can turn on or off.</p>
              </div>
              <p>MOV / MP4</p>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Burned in</h3>
                <p>Render captions into every frame using the chosen native system caption style.</p>
              </div>
              <p>MOV / MP4</p>
            </article>
          </div>
        </section>

        <div className="section-band" id="privacy">
          <h2>## PRIVATE BY ARCHITECTURE</h2>
          <span>06</span>
        </div>

        <section className="privacy-section content-section" aria-labelledby="privacy-title">
          <div className="privacy-copy">
            <p className="eyebrow">YOUR VIDEO STAYS WITH YOUR DEVICE</p>
            <h2 id="privacy-title">No account. No upload. No tracking.</h2>
            <p>
              Together processes imported media and the text derived from it on
              your iPhone or iPad. Kaizōsha does not receive your videos, audio,
              captions, transcripts, language choices, history, or preferences.
            </p>
            <Link className="literal-link" href="/privacy">
              [ READ THE TOGETHER PRIVACY NOTICE → ]
            </Link>
          </div>
          <div className="privacy-diagram" aria-label="On-device processing diagram">
            <div className="device-outline">
              <span>YOUR DEVICE</span>
              <div>
                <i>VIDEO</i>
                <b>→</b>
                <i>CAPTIONS</i>
              </div>
              <p>PROCESSING STAYS HERE</p>
            </div>
            <ul>
              <li>NO ACCOUNT</li>
              <li>NO ANALYTICS</li>
              <li>NO CLOUD SYNC</li>
            </ul>
          </div>
        </section>

        <section className="closing" id="status" aria-labelledby="closing-title">
          <div className="closing-mark" aria-hidden="true">
            <BrandMark />
          </div>
          <p className="eyebrow">07 / IN DEVELOPMENT AT KAIZŌSHA</p>
          <h2 id="closing-title">Watch anything. Hear everything.</h2>
          <p>
            Together is being built for iPhone and iPad. There is no release date
            to announce yet.
          </p>
          <a
            className="literal-link literal-link--large"
            href="mailto:contact@kaizosha.org?subject=Together"
          >
            [ ASK ABOUT TOGETHER ↗ ]
          </a>
        </section>
        </main>

        <footer className="site-footer">
          <a href="https://kaizosha.org/">[ KAIZŌSHA ]</a>
          <nav aria-label="Legal and contact links">
            <a href="https://kaizosha.org/terms">[ TERMS ]</a>
            <Link href="/privacy">[ APP PRIVACY ]</Link>
            <a href="https://kaizosha.org/contact">[ CONTACT ]</a>
          </nav>
          <span>001 / TOGETHER / EOF</span>
        </footer>
      </div>
    </>
  );
}
