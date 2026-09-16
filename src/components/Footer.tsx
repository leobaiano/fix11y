import { GitFork } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* ── CTA Banner ── */}
      <div className="bg-[#f1f5f9]">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-base font-bold text-slate-900">
              Projeto 100% open-source.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Viu um erro ou quer contribuir com uma nova issue?
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contribuir com o Fix11y no GitHub (abre em nova aba)"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#10b981] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#059669] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
          >
            <GitFork size={16} aria-hidden="true" />
            Contribuir no GitHub
          </a>
        </div>
      </div>

      {/* ── License bar ── */}
      <div className="border-t border-white/5 bg-[#0b0f17]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-xs text-slate-500">
            MIT License · WCAG é uma marca do W3C.
          </p>
        </div>
      </div>
    </footer>
  );
}
