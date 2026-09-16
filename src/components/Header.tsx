import Link from "next/link";
import { Languages, Sun, GitFork } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="Fix11y — página inicial"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#10b981] text-white font-black text-lg leading-none select-none"
            aria-hidden="true"
          >
            F
          </span>
          <span className="text-white font-bold text-[1.1rem] tracking-tight">
            Fix11y
          </span>
        </Link>

        {/* Actions */}
        <nav className="flex items-center gap-1" aria-label="Ações do cabeçalho">
          {/* Language selector */}
          <button
            type="button"
            aria-label="Selecionar idioma: PT-BR"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <Languages size={16} aria-hidden="true" />
            <span className="hidden sm:inline font-medium">PT-BR</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Alternar tema claro/escuro"
            className="rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <Sun size={16} aria-hidden="true" />
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/leobaiano/fix11y"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositório do Fix11y no GitHub (abre em nova aba)"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <GitFork size={16} aria-hidden="true" />
            <span className="hidden sm:inline font-medium">Open source</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
