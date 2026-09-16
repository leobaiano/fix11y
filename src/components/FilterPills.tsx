"use client";

import { RotateCcw } from "lucide-react";
import type { WcagLevel, Category } from "@/types/faq";

interface FilterPillsProps {
  selectedLevel: WcagLevel | "ALL";
  selectedCategory: Category | "ALL";
  onSelectLevel: (level: WcagLevel | "ALL") => void;
  onSelectCategory: (category: Category | "ALL") => void;
  onClearFilters: () => void;
}

const LEVELS: { value: WcagLevel | "ALL"; label: string; dot?: string }[] = [
  { value: "ALL", label: "Todos os níveis" },
  {
    value: "A",
    label: "Nível A · Requisito mínimo",
    dot: "bg-[#22c55e]",
  },
  {
    value: "AA",
    label: "Nível AA · Padrão de mercado",
    dot: "bg-[#eab308]",
  },
  {
    value: "AAA",
    label: "Nível AAA · Avançado",
    dot: "bg-[#3b82f6]",
  },
];

const CATEGORIES: { value: Category | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todas as categorias" },
  { value: "Formulários", label: "Formulários" },
  { value: "Interação e teclado", label: "Interação e teclado" },
  { value: "Componentes e ARIA", label: "Componentes e ARIA" },
  { value: "Imagens & Mídia", label: "Imagens & Mídia" },
  { value: "Cores & Contraste", label: "Cores & Contraste" },
  { value: "Conteúdo e linguagem", label: "Conteúdo e linguagem" },
  { value: "Tempo e movimento", label: "Tempo e movimento" },
];

function Pill({
  active,
  onClick,
  children,
  id,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "bg-[#064e3b] text-[#22c55e] shadow-sm ring-1 ring-[#047857]"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function FilterPills({
  selectedLevel,
  selectedCategory,
  onSelectLevel,
  onSelectCategory,
  onClearFilters,
}: FilterPillsProps) {
  const hasActiveFilters = selectedLevel !== "ALL" || selectedCategory !== "ALL";

  return (
    <div
      className="sticky top-14 z-40 border-b border-white/5 bg-[#111827]/95 backdrop-blur-md"
      role="region"
      aria-label="Filtros de conteúdo"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Refine os resultados
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Row 1 – WCAG Level */}
        <fieldset className="mb-2">
          <legend className="mb-1.5 text-xs font-medium text-slate-300">
            Nível WCAG
          </legend>
          <div className="flex flex-wrap items-center gap-1.5">
            {LEVELS.map((lvl) => (
              <Pill
                key={lvl.value}
                id={`filter-level-${lvl.value}`}
                active={selectedLevel === lvl.value}
                onClick={() => onSelectLevel(lvl.value)}
              >
                {lvl.dot && (
                  <span
                    className={`h-2 w-2 rounded-full ${lvl.dot}`}
                    aria-hidden="true"
                  />
                )}
                {lvl.label}
              </Pill>
            ))}
          </div>
        </fieldset>

        {/* Row 2 – Categories */}
        <fieldset>
          <legend className="mb-1.5 text-xs font-medium text-slate-300">
            Categoria
          </legend>
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <Pill
                key={cat.value}
                id={`filter-cat-${cat.value.replace(/[^a-z0-9]/gi, "-")}`}
                active={selectedCategory === cat.value}
                onClick={() => onSelectCategory(cat.value)}
              >
                {cat.label}
              </Pill>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
