import type { Metadata } from "next";
import Link from "next/link";
import { AlignmentStage } from "./convergence-stage";
import { BrandMark } from "./brand-mark";

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

      <div className="site-frame">
        <header className="session-bar">
          <a className="session-brand" href="https://kaizosha.org/">
            <BrandMark compact />
            <span>[ TOGETHER.session ]</span>
          </a>
          <span className="session-state">
            <i aria-hidden="true" /> IN DEVELOPMENT / LOCAL-FIRST
          </span>
          <nav className="session-nav" aria-label="Together navigation">
            <a href="#trace">TRACE</a>
            <a href="#boundary">BOUNDARY</a>
            <Link href="/privacy">PRIVACY</Link>
          </nav>
        </header>

        <main>
          <AlignmentStage />

          <section className="trace" id="trace" aria-labelledby="trace-title">
            <header className="trace-intro">
              <p className="overline">01 / ONE VIDEO / FOUR STATES</p>
              <h2 id="trace-title">Follow one line.</h2>
              <p>
                Together processes a selected video and its derived text on the
                device. One cue becomes timed text, optionally a second language,
                then a file you control.
              </p>
            </header>

            <div className="cue-reel">
              <article className="cue cue--select">
                <div className="cue-time">
                  <span>00:00.000</span>
                  <i aria-hidden="true" />
                </div>
                <div className="cue-copy">
                  <p className="overline">01 / SELECT</p>
                  <h3>Begin with the video.</h3>
                  <p>
                    Choose one or more videos from Photos or Files, or open one
                    through the system handoff. Together keeps the queue in the
                    order you chose.
                  </p>
                </div>
                <div className="file-entry">
                  <span>PHOTOS</span>
                  <b>INTERVIEW_001.MOV</b>
                  <span>FILES</span>
                </div>
              </article>

              <article className="cue cue--caption">
                <div className="cue-time">
                  <span>00:07.240</span>
                  <i aria-hidden="true" />
                </div>
                <div className="cue-copy">
                  <p className="overline">02 / CAPTION</p>
                  <h3>Speech finds its time.</h3>
                  <p>
                    Generate realtime captions on device, use an embedded track,
                    or bring a supported sidecar file. Native caption styles stay
                    in charge of how the words appear.
                  </p>
                </div>
                <div className="timed-cue">
                  <span>00:12.480 → 00:15.120</span>
                  <p lang="fr">La vidéo reste ici.</p>
                  <i aria-hidden="true" />
                </div>
              </article>

              <article className="cue cue--translate">
                <div className="cue-time">
                  <span>00:14.880</span>
                  <i aria-hidden="true" />
                </div>
                <div className="cue-copy">
                  <p className="overline">03 / TRANSLATE</p>
                  <h3>Keep either line. Or both.</h3>
                  <p>
                    Translation begins Off. Choose a target to read the original,
                    the translation, or a bilingual pair while the video keeps moving.
                  </p>
                  <p className="cue-note">
                    High Fidelity can be selected only when the device, language
                    pair, Apple Intelligence status, and required resources support
                    it. Otherwise, Together explains what is unavailable.
                  </p>
                </div>
                <div className="translation-cue">
                  <p><span>FR</span><b lang="fr">La vidéo reste ici.</b></p>
                  <p><span>EN</span><b>The video stays here.</b></p>
                </div>
              </article>

              <article className="cue cue--export">
                <div className="cue-time">
                  <span>00:21.600</span>
                  <i aria-hidden="true" />
                </div>
                <div className="cue-copy">
                  <p className="overline">04 / EXPORT</p>
                  <h3>One cue. Three ways to keep it.</h3>
                  <p>
                    Save the captions alone, add a selectable subtitle track to a
                    new video, or render captions into every frame. The selected
                    source is never modified.
                  </p>
                </div>
                <div className="output-strip" aria-label="Together export options">
                  <div>
                    <span>CAPTION FILE</span>
                    <b>VTT · SRT · TTML · TXT · MD · JSON</b>
                  </div>
                  <div>
                    <span>SELECTABLE</span>
                    <b>MOV · MP4</b>
                  </div>
                  <div>
                    <span>BURNED IN</span>
                    <b>MOV · MP4</b>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="boundary" id="boundary" aria-labelledby="boundary-title">
            <div className="boundary-diagram" aria-hidden="true">
              <span className="boundary-input">VIDEO</span>
              <i />
              <div>
                <BrandMark />
                <span>DEVICE</span>
              </div>
              <i />
              <span className="boundary-stop">NO MEDIA UPLOAD / TO KAIZŌSHA</span>
            </div>
            <div className="boundary-copy">
              <p className="overline">02 / THE DEVICE BOUNDARY</p>
              <h2 id="boundary-title">The device is the boundary.</h2>
              <p>
                Together has no account, advertising, analytics, tracking,
                crash-report upload, or cloud sync. Kaizōsha does not receive
                the video, audio, captions, transcript text, language choices,
                export history, or preferences used in Together.
              </p>
              <ul>
                <li><span>SELECTED</span> through Apple&apos;s system pickers or an Open In handoff</li>
                <li><span>PROCESSED</span> with Apple frameworks on device</li>
                <li><span>CLEANED</span> app-owned working copies when no active operation needs them</li>
              </ul>
              <p className="boundary-note">
                Apple may download speech or language resources under Apple&apos;s
                own terms.
              </p>
              <Link className="text-link text-link--inverse" href="/privacy">
                READ THE APP PRIVACY NOTICE →
              </Link>
            </div>
          </section>

          <section className="final-cue" id="status" aria-labelledby="status-title">
            <p className="overline">00:30.000 / STATUS / IN DEVELOPMENT</p>
            <h2 id="status-title">The next frame is still being built.</h2>
            <p>
              Together is in development at Kaizōsha for iPhone and iPad running
              iOS or iPadOS 26 and later. There is no release date to announce yet.
            </p>
            <div>
              <a className="text-link" href="mailto:contact@kaizosha.org?subject=Together">
                ASK ABOUT TOGETHER ↗
              </a>
              <Link className="text-link" href="/privacy">
                READ APP PRIVACY →
              </Link>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a href="https://kaizosha.org/">KAIZŌSHA</a>
          <nav aria-label="Legal and contact links">
            <a href="https://kaizosha.org/terms">TERMS</a>
            <Link href="/privacy">APP PRIVACY</Link>
            <a href="https://kaizosha.org/contact">CONTACT</a>
          </nav>
          <span>001 / TOGETHER / EOF</span>
        </footer>
      </div>
    </>
  );
}
