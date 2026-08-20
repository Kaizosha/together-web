import type { Metadata } from "next";
import { FrameLink } from "./frame-link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Together page could not be found.",
  openGraph: {
    type: "website",
    title: "Page Not Found — Together",
    description: "The requested Together page could not be found.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Page Not Found — Together",
    description: "The requested Together page could not be found.",
    images: [],
  },
};

export default function NotFound() {
  return (
    <div className="error-page">
      <a className="skip-link" href="#not-found-content">
        Skip to content
      </a>
      <main
        className="error-main"
        id="not-found-content"
        tabIndex={-1}
        data-file="404.md"
      >
        <h1>This page isn&apos;t together.</h1>
        <p>The address may have moved, or it may never have existed.</p>
        <p>
          <FrameLink href="/">Return to Together</FrameLink>
        </p>
      </main>
    </div>
  );
}
