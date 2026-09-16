export type WcagLevel = 'A' | 'AA' | 'AAA';

export type Category =
  | 'Formulários'
  | 'Interação e teclado'
  | 'Componentes e ARIA'
  | 'Imagens & Mídia'
  | 'Cores & Contraste'
  | 'Conteúdo e linguagem'
  | 'Tempo e movimento';

export interface FaqItem {
  id: string;
  /** Critério principal, preservado para compatibilidade e exibição resumida. */
  criterion: string; // e.g. "3.3.2"
  /** Critérios relacionados ao mesmo problema, incluindo o principal. */
  criteria?: string[];
  title: string;
  /** Correção recomendada em uma frase. */
  summary?: string;
  category: Category;
  level: WcagLevel;
  wcagUrl: string;
  /** Termos de implementação e sinônimos que serão usados pela busca. */
  keywords?: string[];
  userImpact: string;
  /** Passos curtos para verificar manualmente se a correção funciona. */
  howToTest?: string[];
  /** Contexto e ressalvas que evitam uma aplicação inadequada do snippet. */
  notes?: string[];
  codeWrong: string;
  codeRight: string;
}
