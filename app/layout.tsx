import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://together.kaizosha.org"),
  title: {
    default: "Together — Different Language. Same Moment.",
    template: "%s — Together",
  },
  description:
    "Together captions and optionally translates selected videos on iPhone and iPad without uploading media to Kaizōsha.",
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
    title: "Together — Different Language. Same Moment.",
    description:
      "Together captions and optionally translates selected videos on iPhone and iPad without uploading media to Kaizōsha.",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Together — Different language. Same moment.",
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
        alt: "Together — Different language. Same moment.",
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
