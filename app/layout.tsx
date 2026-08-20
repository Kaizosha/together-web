import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteMotion } from "./site-motion";

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
  icons: {
    icon: "https://kaizosha.org/icon.png",
    apple: "https://kaizosha.org/icon.png",
  },
  manifest: "/manifest.webmanifest",
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
      <body>
        <SiteMotion />
        {children}
      </body>
    </html>
  );
}
