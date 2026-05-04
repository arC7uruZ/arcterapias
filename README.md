# ARCTERAPIAS

Site institucional de psicologia clínica para a Dra. Ana Rodrigues. Uma landing page de página única com design editorial sofisticado, animações scroll-driven e formulário de contato — construída para transmitir acolhimento, profissionalismo e confiança.

---

## Visão Geral

O site apresenta a psicóloga, seus serviços e facilita o agendamento de consultas. Todo o conteúdo é organizado em seções verticais com navegação por âncora, sem rotas adicionais.

**Seções da página:**

| Seção | ID | Descrição |
|---|---|---|
| Hero | `#inicio` | Apresentação principal com título animado, foto da psicóloga e estatísticas |
| Sobre | `#sobre` | Biografia, formação, abordagem e números com contagem animada |
| Filosofia | `#filosofia` | Os três pilares da prática: Escuta Ativa, Sem Julgamentos, Ciência + Humanidade |
| Serviços | `#servicos` | Grade com 6 especialidades (Terapia Individual, Ansiedade, Casal, Burnout, Trauma, Desenvolvimento Pessoal) |
| Depoimentos | `#depoimentos` | Slider responsivo com 4 depoimentos de pacientes |
| Contato | `#contato` | Informações de contato + formulário de agendamento |

---

## Stack de Tecnologias

### SvelteKit 2 + Svelte 5

Framework principal. Utiliza a nova API de reatividade do Svelte 5 (`$state`, `$derived`) ao invés das stores antigas. O projeto é uma SPA de rota única (`+page.svelte`) sem SSR relevante — toda a interatividade é client-side.

- `+layout.svelte` — carrega as fontes Google e aplica o CSS global
- `+page.svelte` — monta todas as seções em sequência
- Componentes isolados por seção em `src/lib/components/sections/`
- Componentes de UI reutilizáveis em `src/lib/components/ui/` (Nav, Footer, Button)

### Tailwind CSS 4

Utiliza a nova versão do Tailwind com integração via plugin Vite (`@tailwindcss/vite`), sem arquivo `tailwind.config.js`. O design system é definido inteiramente com a diretiva `@theme` no `app.css`.

**Paleta de cores customizada:**

| Token | Hex | Uso |
|---|---|---|
| `cream` | `#f5efe6` | Fundo principal |
| `cream-dark` | `#ede3d5` | Fundo alternado (depoimentos) |
| `warm-white` | `#fdf8f2` | Fundo cards claros |
| `dark` | `#241e18` | Texto principal, fundo escuro |
| `dark-soft` | `#3a322a` | Cards no fundo escuro |
| `terra` | `#c45c2a` | Cor de destaque (terra-cota) |
| `terra-light` | `#d97444` | Hover states |
| `terra-dark` | `#a34820` | Hover buttons |
| `sage` | `#5a7052` | Blob decorativo |
| `rose` | `#c08b85` | Blob decorativo |
| `muted` | `#9a8c7e` | Textos secundários |

**Tipografia (Google Fonts):**

| Token | Fonte | Uso |
|---|---|---|
| `font-display` | Cormorant Garamond | Títulos e headings (serif elegante) |
| `font-body` | Lora | Textos corridos e parágrafos |
| `font-accent` | Raleway | Labels, botões, tags (sans-serif) |

### GSAP 3 (GreenSock Animation Platform)

Responsável por todas as animações. Importado de forma assíncrona dentro do `onMount` para evitar SSR issues com `window`.

**Padrões de animação usados:**

- **ScrollTrigger** — anima elementos ao entrar na viewport (`start: "top 75%"`, `once: true`)
- **Timeline** — sequência de animações encadeadas no Hero (label → título linha a linha → subtítulo → CTAs)
- **Stagger** — entradas escalonadas nos cards de serviços e itens de contato
- **Infinite loops** — blobs flutuantes no Hero com `repeat: -1, yoyo: true, ease: "sine.inOut"`
- **Counter animation** — números na seção Sobre contam de 0 até o valor alvo ao entrar na tela (`snap: { innerText: 1 }`)
- **Cleanup** — cada `onMount` retorna uma função que mata os ScrollTriggers para evitar memory leaks

### Vite 6

Build tool e dev server. Configurado com `@sveltejs/vite-plugin-svelte` e `@tailwindcss/vite`.

---

## Estrutura de Arquivos

```
src/
├── app.css                          # Design system: @theme, @layer base, @layer utilities
├── app.html                         # HTML shell com link das fontes Google
├── lib/
│   └── components/
│       ├── icons/                   # Ícones SVG como componentes Svelte
│       │   ├── BrainIcon.svelte
│       │   ├── HeartIcon.svelte
│       │   ├── LeafIcon.svelte
│       │   ├── ShieldIcon.svelte
│       │   └── UsersIcon.svelte
│       ├── sections/                # Seções da landing page
│       │   ├── Hero.svelte
│       │   ├── About.svelte
│       │   ├── Philosophy.svelte
│       │   ├── Services.svelte
│       │   ├── Testimonials.svelte
│       │   └── Contact.svelte
│       └── ui/                      # Componentes reutilizáveis
│           ├── Button.svelte
│           ├── Nav.svelte
│           └── Footer.svelte
└── routes/
    ├── +layout.svelte               # Layout raiz
    └── +page.svelte                 # Página principal (monta todas as seções)

static/                              # Imagens estáticas (hero.jpg, hero_2.jpg)
```

---

## Destaques de Implementação

### Slider de Depoimentos Responsivo

O slider usa `transform: translateX` com uma CSS custom property `--slide-size` que muda via media query, sem JavaScript para detectar breakpoints:

```css
.testimonials-flex { --slide-size: calc(100% + 24px); }         /* mobile: 1 card */
@media (min-width: 640px) { --slide-size: calc(50% + 12px); }   /* sm: 2 cards */
@media (min-width: 1024px) { --slide-size: calc(100% / 3 + 8px); } /* lg: 3 cards */
```

O estado `activeIndex` é reativo e os botões prev/next navegam ciclicamente.

### Efeito Grain no Hero

Textura de ruído gerada via SVG inline com filtro `feTurbulence`, aplicada como `background-image` em CSS puro — sem imagem externa, sem biblioteca.

### Scroll Suave

Configurado globalmente com `scroll-behavior: smooth` no `html`, permitindo que os links de âncora da navegação funcionem sem JavaScript adicional.

---

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Verificação de tipos
npm run check

# Lint e formatação
npm run lint
npm run format
```

---

## Qualidade de Código

- **ESLint 9** com `eslint-plugin-svelte` para regras específicas de Svelte
- **Prettier** com `prettier-plugin-svelte` e `prettier-plugin-tailwindcss` (ordena classes Tailwind automaticamente)
- **svelte-check** para verificação de tipos com JSDoc (projeto usa JavaScript, não TypeScript)
