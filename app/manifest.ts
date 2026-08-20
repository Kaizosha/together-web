import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Together by Kaizōsha",
    short_name: "Together",
    description:
      "Private, on-device video captions and translation for iPhone and iPad.",
    start_url: "/",
    display: "standalone",
    background_color: "#101010",
    theme_color: "#101010",
    icons: [
      {
        src: "https://kaizosha.org/icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
