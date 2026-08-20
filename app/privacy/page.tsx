import type { Metadata } from "next";
import { DocumentNavigation } from "../document-navigation";
import { FrameLink } from "../frame-link";

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

export default function PrivacyPage() {
  return (
    <div className="document-page">
      <DocumentNavigation />
      <a className="skip-link" href="#privacy-content">
        Skip to content
      </a>

      <main
        className="document-shell"
        id="privacy-content"
        tabIndex={-1}
        data-file="TOGETHER-PRIVACY.md"
      >
        <nav className="document-nav" aria-label="Document navigation">
          <FrameLink className="document-back" href="/">
            ← Together
          </FrameLink>
          <span>APP NOTICE / UPDATED 2026-08-18</span>
        </nav>

        <section className="section" id="notice" aria-labelledby="notice-title">
          <header className="section-head">
            <h1 className="section-title" id="notice-title">
              Together Privacy Notice
            </h1>
          </header>
          <div className="body-lines">
            <p className="document-meta">Last updated August 18, 2026</p>
            <p>
              Together is a local-first iPhone and iPad app from Kaizōsha. This
              notice describes the app&apos;s privacy behavior. Visits to this site
              are covered by the separate Kaizōsha website privacy policy.
            </p>
          </div>
        </section>

        <section
          className="section"
          id="collection"
          aria-labelledby="collection-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="collection-title">
              Data collected by Kaizōsha
            </h2>
          </header>
          <div className="body-lines">
            <p>
              Together does not collect personal data. The app has no account,
              advertising, analytics, tracking, crash-report upload, or cloud
              sync. Kaizōsha does not receive the videos, audio, captions,
              transcripts, language choices, export history, or preferences used
              in Together.
            </p>
            <p>
              Together does not sell or share app data with advertisers, data
              brokers, or analytics providers.
            </p>
          </div>
        </section>

        <section
          className="section"
          id="processing"
          aria-labelledby="processing-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="processing-title">
              On-device processing
            </h2>
          </header>
          <div className="body-lines">
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

        <section
          className="section"
          id="permissions"
          aria-labelledby="permissions-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="permissions-title">
              Permissions
            </h2>
          </header>
          <div className="body-lines">
            <div className="entry-list">
              <p className="entry-head">
                <strong>Photos</strong>
                <span>
                  Uses Apple&apos;s system picker so you choose the videos Together
                  can open. It does not request unrestricted library access for
                  this workflow.
                </span>
              </p>
              <p className="entry-head">
                <strong>Speech Recognition</strong>
                <span>
                  Requested only when you use realtime captions or transcription.
                  Audio from the selected video is transcribed on device.
                </span>
              </p>
              <p className="entry-head">
                <strong>Notifications</strong>
                <span>
                  Export notifications are optional, local, and disabled by
                  default. Together asks only after you enable a notification
                  category.
                </span>
              </p>
            </div>
            <p>
              Denying a permission leaves unrelated app features available.
              Permissions can be changed later in iOS or iPadOS Settings.
            </p>
          </div>
        </section>

        <section
          className="section"
          id="storage"
          aria-labelledby="storage-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="storage-title">
              Local storage and deletion
            </h2>
          </header>
          <div className="body-lines">
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

        <section
          className="section"
          id="links"
          aria-labelledby="links-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="links-title">
              External links
            </h2>
          </header>
          <div className="body-lines">
            <p>
              Together can open Kaizōsha marketing, help, legal, or contact
              pages in a web browser. Browsing those pages is governed by the{" "}
              <FrameLink href="https://kaizosha.org/privacy">
                Kaizōsha website privacy policy
              </FrameLink>
              {" "}rather than this app notice.
            </p>
          </div>
        </section>

        <section
          className="section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <header className="section-head">
            <h2 className="section-title" id="contact-title">
              Changes and contact
            </h2>
          </header>
          <div className="body-lines">
            <p>
              If Together&apos;s data practices change, this notice and the App
              Store privacy disclosures will be updated before the changed
              version is released.
            </p>
            <p>
              Questions about Together privacy can be sent through the
              {" "}
              <FrameLink href="https://kaizosha.org/contact">
                Kaizōsha contact page
              </FrameLink>
              .
            </p>
          </div>
        </section>

        <footer className="document-footer">
          <FrameLink href="/">Together</FrameLink>
          <FrameLink href="https://kaizosha.org/privacy">
            Web privacy
          </FrameLink>
          <FrameLink href="https://kaizosha.org/terms">Terms</FrameLink>
          <FrameLink href="https://kaizosha.org/contact">Contact</FrameLink>
        </footer>
      </main>
    </div>
  );
}
