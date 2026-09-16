export type WcagLevel = 'A' | 'AA' | 'AAA';

export type Category =
  | 'Formulários'
  | 'Teclado'
  | 'Imagens & Mídia'
  | 'Cores & Contraste';

export interface FaqItem {
  id: string;
  criterion: string; // e.g. "3.3.2"
  title: string;
  category: Category;
  level: WcagLevel;
  wcagUrl: string;
  userImpact: string;
  codeWrong: string;
  codeRight: string;
}
