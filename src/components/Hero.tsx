"use client";

import { Search } from "lucide-react";

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function Hero({ searchTerm, onSearchChange }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#0b0f17] pt-20 pb-16 sm:pt-28 sm:pb-20"
      aria-labelledby="hero-title"
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        {/* Kicker */}
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#10b981] uppercase">
          Acessibilidade, sem rodeios.
        </p>

        {/* H1 */}
        <h1
          id="hero-title"
          className="mb-5 text-6xl font-black tracking-tight text-white sm:text-7xl"
        >
          Fix11y
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-base leading-relaxed text-slate-400 text-balance sm:text-lg">
          Soluções práticas e rápidas para problemas de acessibilidade web
          associadas às diretrizes da WCAG 2.2.
        </p>

        {/* Search */}
        <div className="relative mx-auto max-w-xl">
          <label htmlFor="search-input" className="sr-only">
            Buscar por problema ou código WCAG
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="search"
            role="searchbox"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Busque por problema ou código WCAG..."
            autoComplete="off"
            className="w-full rounded-xl border border-white/10 bg-[#111827] py-3.5 pl-12 pr-4 text-sm text-slate-100 placeholder-slate-500 shadow-lg transition-all focus:border-[#10b981]/50 focus:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
          />
        </div>
      </div>
    </section>
  );
}
