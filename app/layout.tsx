import type { Metadata, Viewport } from "next";
import PwaRegister from "./pwa-register";
import "./globals.css";
import "./member.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://app-nadokids-250.lucasivaciuk.chatgpt.site"),
  title: "NadoKids 250 — Área de Membros",
  description:
    "250 treinos, aulas, atividades e dinâmicas para profissionais de natação infantil.",
  openGraph: {
    title: "NadoKids 250 — Área de Membros",
    description: "250 treinos de natação infantil organizados por idade, nível e objetivo.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NadoKids 250" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NadoKids 250 — Área de Membros",
    description: "250 treinos de natação infantil organizados por idade, nível e objetivo.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/nadokids-swimmer-logo.png",
    shortcut: "/images/nadokids-swimmer-logo.png",
    apple: "/icons/nadokids-192.png",
  },
  appleWebApp: {
    capable: true,
    title: "NadoKids 250",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body><PwaRegister />{children}</body>
    </html>
  );
}
