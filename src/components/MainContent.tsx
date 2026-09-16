"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import FilterPills from "@/components/FilterPills";
import AccordionItem from "@/components/AccordionItem";
import rawFaq from "@/data/faq.json";
import type { FaqItem, WcagLevel, Category } from "@/types/faq";

const faqItems = rawFaq as FaqItem[];

const LEVEL_ORDER: WcagLevel[] = ["A", "AA", "AAA"];
const LEVEL_LABELS: Record<WcagLevel, string> = {
  A: "Nível A",
  AA: "Nível AA",
  AAA: "Nível AAA",
};
const LEVEL_SUBTITLES: Record<WcagLevel, string> = {
  A: "Requisito mínimo",
  AA: "Padrão de mercado",
  AAA: "Avançado",
};
const LEVEL_DOT: Record<WcagLevel, string> = {
  A: "bg-[#22c55e]",
  AA: "bg-[#eab308]",
  AAA: "bg-[#3b82f6]",
};

export default function MainContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<WcagLevel | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return faqItems.filter((item) => {
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.criterion.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      const matchesLevel = selectedLevel === "ALL" || item.level === selectedLevel;
      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchTerm, selectedLevel, selectedCategory]);

  // Group by level in order
  const grouped = useMemo(() => {
    const map = new Map<WcagLevel, FaqItem[]>();
    for (const level of LEVEL_ORDER) {
      const items = filtered.filter((i) => i.level === level);
      if (items.length > 0) map.set(level, items);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <FilterPills
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onSelectLevel={setSelectedLevel}
        onSelectCategory={setSelectedCategory}
      />

      <main
        id="main-content"
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6"
        aria-label="Base de conhecimento de acessibilidade"
      >
        {/* Section label */}
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#10b981]">
              Base de Conhecimento
            </p>
            <h2 className="text-2xl font-bold text-slate-100">
              Problemas e soluções
            </h2>
          </div>
          <p className="shrink-0 text-sm text-slate-500" aria-live="polite" aria-atomic="true">
            {filtered.length}{" "}
            {filtered.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#111827] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-300">
              Nenhum resultado encontrado
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Tente uma busca diferente ou remova os filtros.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {LEVEL_ORDER.map((level) => {
              const items = grouped.get(level);
              if (!items) return null;
              return (
                <section key={level} aria-labelledby={`group-${level}`}>
                  {/* Group heading */}
                  <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${LEVEL_DOT[level]}`}
                      aria-hidden="true"
                    />
                    <h3
                      id={`group-${level}`}
                      className="text-sm font-semibold text-slate-200"
                    >
                      {LEVEL_LABELS[level]}
                    </h3>
                    <span className="text-sm text-slate-500">
                      {LEVEL_SUBTITLES[level]}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <AccordionItem key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
