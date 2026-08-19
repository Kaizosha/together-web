import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Together page could not be found.",
  alternates: {},
  openGraph: {
    type: "website",
    url: "/404",
    siteName: "Together by Kaizōsha",
    locale: "en_US",
    title: "Page Not Found — Together",
    description: "The requested Together page could not be found.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Page Not Found — Together",
    description: "The requested Together page could not be found.",
    site: "@KaizoshaX",
    images: [],
  },
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#not-found-content">
        Skip to content
      </a>
      <div className="site-frame">
        <header className="file-bar">
          <span>[ 404.signal ]</span>
          <span>TOGETHER / NOT FOUND</span>
        </header>
        <main
          className="not-found"
          id="not-found-content"
          tabIndex={-1}
          aria-labelledby="not-found-title"
        >
          <p className="eyebrow">404 / END OF FILE</p>
          <h1 id="not-found-title">This page isn&apos;t together.</h1>
          <p>The address may have moved, or it may never have existed.</p>
          <Link className="text-link" href="/">
            RETURN TO TOGETHER →
          </Link>
        </main>
        <footer className="site-footer">
          <a href="https://kaizosha.org/">KAIZŌSHA</a>
          <span>404 / TOGETHER / EOF</span>
        </footer>
      </div>
    </>
  );
}
