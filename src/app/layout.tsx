import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fix11y — Soluções de Acessibilidade Web WCAG 2.2",
  description:
    "Soluções práticas e rápidas para problemas de acessibilidade web associadas às diretrizes da WCAG 2.2.",
  keywords: ["acessibilidade", "WCAG", "a11y", "web", "HTML", "CSS"],
  openGraph: {
    title: "Fix11y — Soluções de Acessibilidade Web",
    description:
      "Guia prático de soluções WCAG 2.2 para acessibilidade web. Open-source.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0b0f17] text-slate-100">
        {children}
      </body>
    </html>
  );
}
