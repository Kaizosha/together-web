import type { Metadata } from "next";
import { TogetherCanvas } from "./together-canvas";

export const metadata: Metadata = {
  title: {
    absolute: "Together — Different Language. Same Moment.",
  },
  description:
    "Together captions and optionally translates selected videos on iPhone and iPad without uploading media to Kaizōsha.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Together by Kaizōsha",
    title: "Together — Different Language. Same Moment.",
    description:
      "Together captions and optionally translates selected videos on iPhone and iPad without uploading media to Kaizōsha.",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Together — Different language. Same moment. Private captions and translation for iPhone and iPad.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Together — Different Language. Same Moment.",
    description:
      "Together captions and optionally translates selected videos on iPhone and iPad without uploading media to Kaizōsha.",
    site: "@KaizoshaX",
    images: [
      {
        url: "/og.png",
        alt: "Together — Different language. Same moment. Private captions and translation for iPhone and iPad.",
      },
    ],
  },
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
      <div className="directory-page">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <TogetherCanvas />
      </div>
    </>
  );
}
