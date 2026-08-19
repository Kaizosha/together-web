import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How the local-first Together app handles videos, captions, permissions, and on-device storage.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "article",
    url: "/privacy",
    siteName: "Together by Kaizōsha",
    locale: "en_US",
    title: "Together Privacy Notice",
    description:
      "How the local-first Together app handles videos, captions, permissions, and on-device storage.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Together Privacy Notice",
    description:
      "How the local-first Together app handles videos, captions, permissions, and on-device storage.",
    images: [],
    site: "@KaizoshaX",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function CompactMark() {
  return (
    <span className="brand-mark brand-mark--compact" aria-hidden="true">
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

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">
        Skip to content
      </a>
      <div className="site-shell">
        <header className="file-bar">
          <Link className="file-brand" href="/">
            <CompactMark />
            <span>[ TOGETHER-PRIVACY.md ]</span>
          </Link>
          <span>APP NOTICE / 2026-08-18</span>
        </header>

        <nav className="document-nav" aria-label="Document navigation">
          <Link href="/">[ ← TOGETHER ]</Link>
          <span>TOGETHER-PRIVACY.md</span>
        </nav>

        <main className="document-main" id="privacy-content" tabIndex={-1}>
          <header className="document-hero">
            <p className="eyebrow">APP PRIVACY / LAST UPDATED AUGUST 18, 2026</p>
            <h1>Together Privacy Notice</h1>
            <p>
              Together is a local-first iPhone and iPad app from Kaizōsha. This
              notice describes the app&apos;s privacy behavior; visits to this site
              are covered by the separate Kaizōsha website privacy policy.
            </p>
          </header>

          <section className="legal-section" aria-labelledby="collected-title">
            <header>
              <h2 id="collected-title">## DATA COLLECTED BY KAIZŌSHA</h2>
              <span>01</span>
            </header>
            <div>
              <p>
                Together does not collect personal data. The app has no account,
                advertising, analytics, tracking, crash-report upload, or cloud-sync
                service. Kaizōsha does not receive the videos, audio, captions,
                transcripts, language choices, export history, or preferences used
                in Together.
              </p>
              <p>
                Together does not sell or share app data with advertisers, data
                brokers, or analytics providers.
              </p>
            </div>
          </section>

          <section className="legal-section" aria-labelledby="processing-title">
            <header>
              <h2 id="processing-title">## ON-DEVICE PROCESSING</h2>
              <span>02</span>
            </header>
            <div>
              <p>
                Together uses Apple system frameworks to play imported videos,
                generate speech transcripts, translate captions, and export files.
                Media and the text derived from it are processed on the device and
                are not uploaded to a Together or Kaizōsha server.
              </p>
              <p>
                Apple may download system language or speech resources under
                Apple&apos;s own terms and privacy policies. Together does not send the
                imported media or transcript text to Kaizōsha as part of that
                process.
              </p>
            </div>
          </section>

          <section className="legal-section" aria-labelledby="permissions-title">
            <header>
              <h2 id="permissions-title">## PERMISSIONS</h2>
              <span>03</span>
            </header>
            <div>
              <ul>
                <li>
                  <strong>Photos:</strong> Together uses Apple&apos;s system picker so
                  you can choose the videos you want to open. It does not request
                  unrestricted photo-library access for that workflow.
                </li>
                <li>
                  <strong>Speech Recognition:</strong> Together requests Speech
                  permission only when you use realtime captions or transcription.
                  Audio from the selected video is transcribed on the device.
                </li>
                <li>
                  <strong>Notifications:</strong> Export notifications are optional,
                  local, and disabled by default. Together asks only after you
                  explicitly enable a notification category.
                </li>
              </ul>
              <p>
                Denying a permission leaves unrelated app features available.
                Permissions can be changed later in iOS or iPadOS Settings.
              </p>
            </div>
          </section>

          <section className="legal-section" aria-labelledby="storage-title">
            <header>
              <h2 id="storage-title">## LOCAL STORAGE AND DELETION</h2>
              <span>04</span>
            </header>
            <div>
              <p>
                Together temporarily stages only the media needed for active
                playback, inspection, or export and removes app-owned temporary
                copies after no operation needs them. Together never deletes a
                source file you selected.
              </p>
              <p>
                Preferences, caption drafts, and export queue or history state
                remain on the device. Completed exports stay in the Files location
                you chose until you delete them. Deleting Together removes its
                app-owned container according to iOS or iPadOS behavior; files
                already saved elsewhere remain under your control.
              </p>
              <p>
                Queue or history items and completed exports can be removed using
                Together&apos;s controls or the Files app, as applicable.
              </p>
              <p>
                Local notifications use generic copy and do not include a filename
                or media details. Live Activities may show a locally chosen export
                title, broad stage, and progress on the device. Neither sends that
                content to a Kaizōsha server.
              </p>
            </div>
          </section>

          <section className="legal-section" aria-labelledby="links-title">
            <header>
              <h2 id="links-title">## EXTERNAL LINKS</h2>
              <span>05</span>
            </header>
            <div>
              <p>
                Together can open Kaizōsha marketing, help, legal, or contact pages
                in a web browser. Browsing those pages is governed by the
                <a href="https://kaizosha.org/privacy"> Kaizōsha website privacy policy</a>
                rather than this app notice.
              </p>
            </div>
          </section>

          <section className="legal-section" aria-labelledby="contact-title">
            <header>
              <h2 id="contact-title">## CHANGES AND CONTACT</h2>
              <span>06</span>
            </header>
            <div>
              <p>
                If Together&apos;s data practices change, this notice and the App
                Store privacy disclosures will be updated before the changed
                version is released.
              </p>
              <p>
                Questions about Together privacy can be sent through the
                <a href="https://kaizosha.org/contact"> Kaizōsha contact page</a>.
              </p>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a href="https://kaizosha.org/">[ KAIZŌSHA ]</a>
          <nav aria-label="Legal and contact links">
            <a href="https://kaizosha.org/terms">[ TERMS ]</a>
            <a href="https://kaizosha.org/privacy">[ WEB PRIVACY ]</a>
            <a href="https://kaizosha.org/contact">[ CONTACT ]</a>
          </nav>
          <span>002 / PRIVACY / EOF</span>
        </footer>
      </div>
    </>
  );
}
