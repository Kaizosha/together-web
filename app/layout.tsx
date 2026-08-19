import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://together.kaizosha.org"),
  title: {
    default: "Together — Watch Anything. Hear Everything.",
    template: "%s — Together",
  },
  description:
    "Together brings private, on-device captions and translation to video on iPhone and iPad.",
  applicationName: "Together",
  authors: [{ name: "Kaizōsha", url: "https://kaizosha.org/" }],
  creator: "Kaizōsha",
  publisher: "Kaizōsha",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://kaizosha.org/icon.png",
    apple: "https://kaizosha.org/icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Together by Kaizōsha",
    title: "Together — Watch Anything. Hear Everything.",
    description:
      "Private, on-device video captions and translation for iPhone and iPad.",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Together — Bring worlds together. Watch anything. Hear everything.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Together — Watch Anything. Hear Everything.",
    description:
      "Private, on-device video captions and translation for iPhone and iPad.",
    site: "@KaizoshaX",
    images: [
      {
        url: "/og.png",
        alt: "Together — Bring worlds together. Watch anything. Hear everything.",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
