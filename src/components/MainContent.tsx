"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import FilterPills from "@/components/FilterPills";
import AccordionItem from "@/components/AccordionItem";
import rawFaq from "@/data/faq.json";
import type { FaqItem, WcagLevel, Category } from "@/types/faq";

const faqItems = rawFaq as FaqItem[];

const CATEGORY_ORDER: Category[] = [
  "Formulários",
  "Interação e teclado",
  "Componentes e ARIA",
  "Imagens & Mídia",
  "Cores & Contraste",
  "Conteúdo e linguagem",
  "Tempo e movimento",
];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchableText(item: FaqItem) {
  return [
    item.title,
    item.summary,
    item.criterion,
    item.criteria?.join(" "),
    item.category,
    item.keywords?.join(" "),
    item.userImpact,
    item.howToTest?.join(" "),
    item.notes?.join(" "),
    item.codeWrong,
    item.codeRight,
  ]
    .filter(Boolean)
    .join(" ");
}

function getSearchScore(item: FaqItem, term: string) {
  if (!term) return 0;

  const title = normalizeSearchText(item.title);
  const criterion = normalizeSearchText(item.criterion);
  const criteria = normalizeSearchText(item.criteria?.join(" ") ?? "");
  const keywords = normalizeSearchText(item.keywords?.join(" ") ?? "");
  const summary = normalizeSearchText(item.summary ?? "");
  const content = normalizeSearchText(getSearchableText(item));

  if (title === term || criterion === term || criteria.includes(term)) {
    return 100;
  }

  return (
    (title.includes(term) ? 60 : 0) +
    (keywords.includes(term) ? 45 : 0) +
    (summary.includes(term) ? 30 : 0) +
    (content.includes(term) ? 10 : 0)
  );
}

export default function MainContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<WcagLevel | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");
  const normalizedSearchTerm = normalizeSearchText(searchTerm);
  const isSearching = normalizedSearchTerm.length > 0;

  const filtered = useMemo(() => {
    return faqItems
      .map((item, index) => ({
        item,
        index,
        score: getSearchScore(item, normalizedSearchTerm),
      }))
      .filter(({ item }) => {
        const matchesSearch =
          !normalizedSearchTerm ||
          normalizeSearchText(getSearchableText(item)).includes(normalizedSearchTerm);
        const matchesLevel = selectedLevel === "ALL" || item.level === selectedLevel;
        const matchesCategory =
          selectedCategory === "ALL" || item.category === selectedCategory;
        return matchesSearch && matchesLevel && matchesCategory;
      })
      .sort((first, second) => {
        if (!isSearching) return first.index - second.index;
        return second.score - first.score || first.index - second.index;
      })
      .map(({ item }) => item);
  }, [isSearching, normalizedSearchTerm, selectedLevel, selectedCategory]);

  // Browse by problem domain when there is no explicit search.
  const grouped = useMemo(() => {
    const map = new Map<Category, FaqItem[]>();
    for (const category of CATEGORY_ORDER) {
      const items = filtered.filter((item) => item.category === category);
      if (items.length > 0) map.set(category, items);
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
        onClearFilters={() => {
          setSelectedLevel("ALL");
          setSelectedCategory("ALL");
        }}
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
          isSearching ? (
            <section aria-label="Resultados ordenados por relevância">
              <p className="mb-4 text-sm text-slate-400">
                Resultados por relevância para “{searchTerm.trim()}”
              </p>
              <div className="space-y-3">
                {filtered.map((item) => (
                  <AccordionItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          ) : (
            <div className="space-y-10">
              {CATEGORY_ORDER.map((category) => {
                const items = grouped.get(category);
                if (!items) return null;
                const headingId = `group-category-${CATEGORY_ORDER.indexOf(category)}`;
                return (
                  <section key={category} aria-labelledby={headingId}>
                    <div className="mb-4 border-b border-white/5 pb-3">
                      <h3
                        id={headingId}
                        className="text-sm font-semibold text-slate-200"
                      >
                        {category}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <AccordionItem key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )
        )}
      </main>
    </>
  );
}
