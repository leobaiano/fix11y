"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  X,
  Check,
  ExternalLink,
  Copy,
  AlertTriangle,
} from "lucide-react";
import type { FaqItem, WcagLevel } from "@/types/faq";

interface AccordionItemProps {
  item: FaqItem;
}

const LEVEL_CONFIG: Record<
  WcagLevel,
  { label: string; badgeBg: string; badgeText: string; dot: string }
> = {
  A: {
    label: "Nível A",
    badgeBg: "bg-[#052e16]",
    badgeText: "text-[#22c55e]",
    dot: "bg-[#22c55e]",
  },
  AA: {
    label: "Nível AA",
    badgeBg: "bg-[#422006]",
    badgeText: "text-[#eab308]",
    dot: "bg-[#eab308]",
  },
  AAA: {
    label: "Nível AAA",
    badgeBg: "bg-[#172554]",
    badgeText: "text-[#3b82f6]",
    dot: "bg-[#3b82f6]",
  },
};

export default function AccordionItem({ item }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentId = `content-${item.id}`;
  const triggerId = `trigger-${item.id}`;
  const contentRef = useRef<HTMLDivElement>(null);
  const lvl = LEVEL_CONFIG[item.level];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.codeRight);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <div
      className={[
        "rounded-xl border transition-all duration-200",
        isOpen
          ? "border-[#10b981]/30 bg-[#1e293b]"
          : "border-white/5 bg-[#111827] hover:border-white/10",
      ].join(" ")}
    >
      {/* ── Trigger ── */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        {/* Criterion badge */}
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold tracking-wide ${lvl.badgeBg} ${lvl.badgeText}`}
          aria-label={`Critério WCAG ${item.criterion}`}
        >
          {item.criterion}
        </span>

        {/* Title + category */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-100">
            {item.title}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{item.category}</p>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={[
            "shrink-0 text-slate-400 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/* ── Expandable Content ── */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion-content"
        ref={contentRef}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 300ms ease",
        }}
      >
        <div className="accordion-inner">
          <div className="space-y-5 px-5 pb-6 pt-1">
            {/* User impact */}
            <div className="flex gap-3 rounded-lg border border-[#92400e]/50 bg-[#451a03]/60 px-4 py-3">
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-[#fbbf24]"
                aria-hidden="true"
              />
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#fbbf24]">
                  Impacto no usuário
                </p>
                <p className="text-sm leading-relaxed text-[#fde68a]">
                  {item.userImpact}
                </p>
              </div>
            </div>

            {/* WCAG official link */}
            <a
              href={item.wcagUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              aria-label={`Ver especificação WCAG 2.2 — Critério ${item.criterion} (${lvl.label}) no site do W3C (abre em nova aba)`}
            >
              <ExternalLink size={13} aria-hidden="true" />
              WCAG 2.2 — Critério {item.criterion} ({lvl.label})
            </a>

            {/* Code grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* ❌ Wrong */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7f1d1d]"
                    aria-hidden="true"
                  >
                    <X size={11} className="text-[#fca5a5]" />
                  </span>
                  <span className="text-xs font-semibold text-[#fca5a5]">
                    Como não fazer
                  </span>
                </div>
                <pre
                  className="code-block code-block-error"
                  aria-label="Exemplo de código incorreto"
                >
                  <code>{item.codeWrong}</code>
                </pre>
              </div>

              {/* ✅ Right */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-[#047857]"
                      aria-hidden="true"
                    >
                      <Check size={11} className="text-[#6ee7b7]" />
                    </span>
                    <span className="text-xs font-semibold text-[#6ee7b7]">
                      Como fazer
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={
                      copied
                        ? "Código copiado!"
                        : "Copiar código correto para a área de transferência"
                    }
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
                  >
                    {copied ? (
                      <>
                        <Check size={12} aria-hidden="true" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={12} aria-hidden="true" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
                <pre
                  className="code-block code-block-success"
                  aria-label="Exemplo de código correto"
                >
                  <code>{item.codeRight}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
