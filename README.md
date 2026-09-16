# ♿ Fix11y

> Soluções práticas e rápidas para problemas de acessibilidade web associadas às diretrizes da WCAG 2.2.

O **Fix11y** é um guia interativo e *open-source* projetado para ajudar desenvolvedores e designers a identificar e corrigir rapidamente falhas comuns de acessibilidade (a11y) em interfaces web. 

O projeto funciona como um FAQ interativo e acessível, mapeando cada problema ao seu respectivo Critério de Sucesso da **WCAG 2.2**, com comparações visuais lado a lado de **"Como NÃO fazer"** vs. **"Como fazer"**.

---

## 🚀 Tecnologias

- **Next.js** (App Router & Static Export)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Ícones)

---

## 📄 Estrutura de Dados (`faq.json`)

Toda a base de conhecimento do projeto é mantida em um único arquivo JSON localizado em `src/data/faq.json`. Cada item do FAQ segue a estrutura abaixo:

```json
{
  "id": "1",
  "criterion": "3.3.2",
  "criteria": ["3.3.2", "1.3.1", "4.1.2"],
  "title": "Um campo de formulário não possui rótulo",
  "summary": "Use um label visível e associe-o ao campo com for e id.",
  "category": "Formulários",
  "level": "A",
  "wcagUrl": "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
  "keywords": ["label", "placeholder", "input"],
  "userImpact": "Descrição do impacto para o usuário com tecnologia assistiva.",
  "howToTest": ["Navegue até o campo com um leitor de tela."],
  "notes": ["Placeholder não substitui um rótulo."],
  "codeWrong": "<input placeholder=\"Nome\">",
  "codeRight": "<label for=\"name\">Nome</label>\n<input id=\"name\" type=\"text\">"
}
```

### Explicação das Propriedades

- **`id`**: Identificador único do item (string/número).
- **`criterion`**: Critério de sucesso WCAG 2.2 principal, usado na exibição resumida (ex.: `"3.3.2"`).
- **`criteria`** *(opcional)*: Todos os critérios relacionados à falha, incluindo o principal. Use quando uma mesma correção atende ou viola mais de um critério.
- **`title`**: Título resumo da falha de acessibilidade.
- **`summary`** *(opcional)*: A solução recomendada em uma frase clara e acionável.
- **`category`**: Categoria do problema. Aceita: `"Formulários"`, `"Teclado"`, `"Imagens & Mídia"` ou `"Cores & Contraste"`.
- **`level`**: Nível de conformidade da WCAG. Aceita: `"A"`, `"AA"` ou `"AAA"`.
- **`wcagUrl`**: Link direto para a documentação oficial da especificação no W3C.
- **`keywords`** *(opcional)*: Termos de busca, sinônimos e termos de implementação (por exemplo: `"aria-label"`, `"modal"` e `"outline"`).
- **`userImpact`**: Explicação clara do impacto real desse problema na navegação de pessoas com deficiência ou usando tecnologias assistivas.
- **`howToTest`** *(opcional)*: Passos breves para validar manualmente a correção.
- **`notes`** *(opcional)*: Ressalvas e contexto que ajudam a evitar aplicar o snippet de forma inadequada.
- **`codeWrong`**: Trecho de código HTML/CSS incorreto (exemplo de como **não** fazer).
- **`codeRight`**: Trecho de código HTML/CSS corrigido e acessível (exemplo de como **fazer**).

---

## 🛠️ Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/leobaiano/fix11y.git](https://github.com/leobaiano/fix11y.git)
   cd fix11y
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador.

4. **Testar o build estático:**
   ```bash
   npm run build
   ```

---

## 🤝 Como Contribuir

Contribuições são super bem-vindas! Você pode contribuir adicionando **novos critérios de acessibilidade ao `faq.json`**, corrigindo textos ou melhorando os componentes do projeto.

Siga o passo a passo abaixo para enviar sua contribuição:

### 1. Faça um Fork do projeto
Clique no botão **Fork** no canto superior direito da página deste repositório para criar uma cópia no seu GitHub.

### 2. Clone o seu Fork
```bash
git clone [https://github.com/SEU_USUARIO/fix11y.git](https://github.com/SEU_USUARIO/fix11y.git)
cd fix11y
```

### 3. Crie uma Branch para a sua alteração
```bash
git checkout -b feature/adiciona-criterio-x
```

### 4. Faça as alterações
- Se for adicionar ou corrigir um conteúdo de acessibilidade, edite o arquivo `src/data/faq.json`.
- Certifique-se de preencher todos os campos do JSON e manter a formatação válida.

### 5. Teste e confirme as mudanças
Verifique se a aplicação está rodando sem erros e se o build é gerado corretamente:
```bash
npm run build
```

### 6. Faça o Commit e Push
```bash
git add .
git commit -m "feat: adiciona criterio WCAG X.X.X no faq.json"
git push origin feature/adiciona-criterio-x
```

### 7. Abra uma Pull Request (PR)
1. Vá até o repositório original do **Fix11y** no GitHub.
2. Clique na aba **Pull Requests** e no botão **New Pull Request**.
3. Selecione a sua branch com as alterações e descreva brevemente o que foi feito.
4. Envie a PR para análise!

---

## 📜 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.
