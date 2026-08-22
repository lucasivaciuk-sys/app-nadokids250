import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NadoKids 250",
    short_name: "NadoKids",
    description: "250 treinos detalhados de natação infantil.",
    start_url: "/area",
    display: "standalone",
    background_color: "#F5F8FC",
    theme_color: "#0B5FFF",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/nadokids-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/nadokids-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
}
