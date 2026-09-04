# src/styles.css

Tipo: Folha de estilos CSS.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `@import "tailwindcss" source(none);` | Importa estilos externos ou camadas usadas pela aplicacao. |
| 2 | `@source "../src";` | Participa da definicao visual da interface. |
| 3 | `@import "tw-animate-css";` | Importa estilos externos ou camadas usadas pela aplicacao. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `@custom-variant dark (&:is(.dark *));` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `@theme inline {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 8 | `  --radius-sm: calc(var(--radius) - 4px);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 9 | `  --radius-md: calc(var(--radius) - 2px);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 10 | `  --radius-lg: var(--radius);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 11 | `  --radius-xl: calc(var(--radius) + 4px);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 12 | `  --radius-2xl: calc(var(--radius) + 8px);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 13 | `  --color-background: var(--background);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 14 | `  --color-foreground: var(--foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 15 | `  --color-card: var(--card);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 16 | `  --color-card-foreground: var(--card-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 17 | `  --color-popover: var(--popover);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 18 | `  --color-popover-foreground: var(--popover-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 19 | `  --color-primary: var(--primary);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 20 | `  --color-primary-foreground: var(--primary-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 21 | `  --color-primary-glow: var(--primary-glow);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 22 | `  --color-secondary: var(--secondary);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 23 | `  --color-secondary-foreground: var(--secondary-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 24 | `  --color-muted: var(--muted);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 25 | `  --color-muted-foreground: var(--muted-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 26 | `  --color-accent: var(--accent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 27 | `  --color-accent-foreground: var(--accent-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 28 | `  --color-destructive: var(--destructive);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 29 | `  --color-destructive-foreground: var(--destructive-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 30 | `  --color-success: var(--success);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 31 | `  --color-warning: var(--warning);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 32 | `  --color-info: var(--info);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 33 | `  --color-border: var(--border);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 34 | `  --color-input: var(--input);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 35 | `  --color-ring: var(--ring);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 36 | `  --color-sidebar: var(--sidebar);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 37 | `  --color-sidebar-foreground: var(--sidebar-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 38 | `  --color-sidebar-primary: var(--sidebar-primary);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 39 | `  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 40 | `  --color-sidebar-accent: var(--sidebar-accent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 41 | `  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 42 | `  --color-sidebar-border: var(--sidebar-border);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 43 | `  --color-sidebar-ring: var(--sidebar-ring);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 44 | `  --color-chart-1: var(--chart-1);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 45 | `  --color-chart-2: var(--chart-2);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 46 | `  --color-chart-3: var(--chart-3);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 47 | `  --color-chart-4: var(--chart-4);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 48 | `  --color-chart-5: var(--chart-5);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 49 | `  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 50 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `:root {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 53 | `  --radius: 0.875rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 54 | `  /* Azul-marinho escuro como tema base */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 55 | `  --background: oklch(0.98 0.005 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 56 | `  --foreground: oklch(0.18 0.04 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 57 | `  --card: oklch(1 0 0);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 58 | `  --card-foreground: oklch(0.18 0.04 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 59 | `  --popover: oklch(1 0 0);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 60 | `  --popover-foreground: oklch(0.18 0.04 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `  --primary: oklch(0.28 0.09 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 63 | `  --primary-foreground: oklch(0.98 0.005 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 64 | `  --primary-glow: oklch(0.45 0.16 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `  --secondary: oklch(0.95 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 67 | `  --secondary-foreground: oklch(0.28 0.09 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 68 | `  --muted: oklch(0.95 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 69 | `  --muted-foreground: oklch(0.5 0.03 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 70 | `  --accent: oklch(0.93 0.03 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 71 | `  --accent-foreground: oklch(0.28 0.09 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `  --destructive: oklch(0.58 0.22 27);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 74 | `  --destructive-foreground: oklch(0.98 0 0);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 75 | `  --success: oklch(0.62 0.16 155);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 76 | `  --warning: oklch(0.78 0.16 75);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 77 | `  --info: oklch(0.62 0.18 240);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `  --border: oklch(0.9 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 80 | `  --input: oklch(0.92 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 81 | `  --ring: oklch(0.45 0.16 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `  --chart-1: oklch(0.45 0.16 264);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 84 | `  --chart-2: oklch(0.62 0.16 155);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 85 | `  --chart-3: oklch(0.78 0.16 75);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 86 | `  --chart-4: oklch(0.58 0.22 27);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 87 | `  --chart-5: oklch(0.55 0.2 310);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `  --sidebar: oklch(0.7 0.008 95);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 90 | `  --sidebar-foreground: oklch(0.29 0.07 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 91 | `  --sidebar-primary: oklch(0.33 0.1 260);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 92 | `  --sidebar-primary-foreground: oklch(0.98 0 0);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 93 | `  --sidebar-accent: oklch(0.34 0.09 258);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 94 | `  --sidebar-accent-foreground: oklch(0.98 0.004 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 95 | `  --sidebar-border: oklch(0.59 0.018 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 96 | `  --sidebar-ring: oklch(0.34 0.09 258);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-glow));` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 99 | `  --gradient-sidebar: linear-gradient(180deg, oklch(0.72 0.008 95), oklch(0.66 0.009 95));` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 100 | `  --shadow-elegant: 0 10px 30px -10px color-mix(in oklab, var(--primary) 30%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 101 | `  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 102 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `.dark {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 105 | `  color-scheme: dark;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 106 | `  --background: oklch(0.175 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 107 | `  --foreground: oklch(0.94 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 108 | `  --card: oklch(0.22 0.014 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 109 | `  --card-foreground: oklch(0.94 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 110 | `  --popover: oklch(0.235 0.016 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 111 | `  --popover-foreground: oklch(0.94 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 112 | `  --primary: oklch(0.68 0.11 232);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 113 | `  --primary-foreground: oklch(0.16 0.015 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 114 | `  --primary-glow: oklch(0.75 0.12 232);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 115 | `  --secondary: oklch(0.275 0.016 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 116 | `  --secondary-foreground: oklch(0.94 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 117 | `  --muted: oklch(0.265 0.014 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 118 | `  --muted-foreground: oklch(0.72 0.014 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 119 | `  --accent: oklch(0.31 0.024 235);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 120 | `  --accent-foreground: oklch(0.95 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 121 | `  --border: oklch(0.34 0.016 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 122 | `  --input: oklch(0.285 0.014 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 123 | `  --ring: oklch(0.68 0.11 232);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 124 | `  --sidebar: oklch(0.2 0.012 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 125 | `  --sidebar-foreground: oklch(0.93 0.018 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 126 | `  --sidebar-primary: oklch(0.71 0.13 232);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 127 | `  --sidebar-primary-foreground: oklch(0.16 0.015 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 128 | `  --sidebar-accent: oklch(0.32 0.065 255);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 129 | `  --sidebar-accent-foreground: oklch(0.98 0.008 250);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 130 | `  --sidebar-border: oklch(0.36 0.03 252);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 131 | `  --sidebar-ring: oklch(0.71 0.13 232);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 132 | `  --gradient-sidebar: linear-gradient(180deg, oklch(0.215 0.022 250), oklch(0.175 0.018 250));` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 133 | `  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.28), 0 10px 24px -14px rgb(0 0 0 / 0.5);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 134 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 135 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 136 | `/* Os seletores de data são nativos do navegador; force ícones claros no tema escuro. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 137 | `.dark input[type="date"]::-webkit-calendar-picker-indicator,` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 138 | `.dark input[type="datetime-local"]::-webkit-calendar-picker-indicator {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 139 | `  filter: invert(1) brightness(2) !important;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 140 | `  opacity: 1 !important;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 141 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 142 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 143 | `.dark ::selection {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 144 | `  background: color-mix(in oklab, var(--primary) 48%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 145 | `  color: var(--foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 146 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 147 | `.dark input,` | Participa da definicao visual da interface. |
| 148 | `.dark textarea,` | Participa da definicao visual da interface. |
| 149 | `.dark select {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 150 | `  color-scheme: dark;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 151 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 152 | `.dark .mural-la {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 153 | `  background: var(--background);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 154 | `  color: var(--foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 155 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 156 | `.dark .mural-la .mural-subtle {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 157 | `  color: oklch(0.72 0.014 95);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 158 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 159 | `.dark .mural-la .mural-filter {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 160 | `  background: oklch(0.25 0.015 95 / 0.9);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 161 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 162 | `.dark .mural-la .mural-empty {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 163 | `  background: oklch(0.235 0.014 95 / 0.8);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 164 | `  border-color: oklch(0.38 0.014 95);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 165 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 166 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 167 | `@layer base {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 168 | `  * {` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 169 | `    border-color: var(--color-border);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 170 | `  }` | Fecha o bloco de regras CSS aberto anteriormente. |
| 171 | `  body {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 172 | `    background-color: var(--color-background);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 173 | `    color: var(--color-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 174 | `    font-feature-settings: "ss01", "cv11";` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 175 | `  }` | Fecha o bloco de regras CSS aberto anteriormente. |
| 176 | `  h1,` | Participa da definicao visual da interface. |
| 177 | `  h2,` | Participa da definicao visual da interface. |
| 178 | `  h3,` | Participa da definicao visual da interface. |
| 179 | `  h4 {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 180 | `    font-family: var(--font-display);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 181 | `    letter-spacing: -0.02em;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 182 | `  }` | Fecha o bloco de regras CSS aberto anteriormente. |
| 183 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 184 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 185 | `.scrollbar-thin::-webkit-scrollbar {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 186 | `  width: 6px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 187 | `  height: 6px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 188 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 189 | `.scrollbar-thin::-webkit-scrollbar-thumb {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 190 | `  background: color-mix(in oklab, var(--muted-foreground) 30%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 191 | `  border-radius: 999px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 192 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 193 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 194 | `/* O menu lateral pode ter mais itens que a altura da tela. Mantemos a rolagem` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 195 | `   para teclado/trackpad, mas sem expor uma barra visual dentro da navegação. */` | Participa da definicao visual da interface. |
| 196 | `.sidebar-nav {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 197 | `  -ms-overflow-style: none;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 198 | `  overscroll-behavior: contain;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 199 | `  scrollbar-width: none;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 200 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 201 | `.sidebar-nav::-webkit-scrollbar {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 202 | `  display: none;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 203 | `  height: 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 204 | `  width: 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 205 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 206 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 207 | `.kanban-scroll {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 208 | `  scrollbar-width: thin;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 209 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 210 | `.kanban-top-scroll {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 211 | `  height: 18px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 212 | `  scrollbar-width: thin;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 213 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 214 | `.kanban-top-scroll::-webkit-scrollbar {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 215 | `  height: 8px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 216 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 217 | `.kanban-top-scroll::-webkit-scrollbar-thumb {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 218 | `  background: color-mix(in oklab, var(--muted-foreground) 45%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 219 | `  border-radius: 999px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 220 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 221 | `.task-overdue {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 222 | `  box-shadow: inset 3px 0 0 var(--destructive);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 223 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 224 | `.task-due-soon {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 225 | `  box-shadow: inset 3px 0 0 var(--warning);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 226 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 227 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 228 | `[contenteditable][data-placeholder]:empty::before {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 229 | `  content: attr(data-placeholder);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 230 | `  color: color-mix(in oklab, var(--muted-foreground) 70%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 231 | `  pointer-events: none;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 232 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 233 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 234 | `/* Tiptap rich-text editor styles */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 235 | `.tiptap {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 236 | `  cursor: text;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 237 | `  outline: none;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 238 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 239 | `.tiptap p {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 240 | `  margin: 0.25rem 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 241 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 242 | `.tiptap ul {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 243 | `  list-style: disc;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 244 | `  padding-left: 1.25rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 245 | `  margin: 0.25rem 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 246 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 247 | `.tiptap ol {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 248 | `  list-style: decimal;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 249 | `  padding-left: 1.5rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 250 | `  margin: 0.25rem 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 251 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 252 | `.tiptap ul ul {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 253 | `  list-style: circle;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 254 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 255 | `.tiptap ul ul ul {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 256 | `  list-style: square;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 257 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 258 | `.tiptap li {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 259 | `  margin: 0.1rem 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 260 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 261 | `.tiptap li > p {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 262 | `  margin: 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 263 | `  display: inline;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 264 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 265 | `.tiptap h2 {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 266 | `  font-size: 0.95rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 267 | `  font-weight: 600;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 268 | `  margin: 0.4rem 0 0.2rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 269 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 270 | `.tiptap h3 {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 271 | `  font-size: 0.85rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 272 | `  font-weight: 600;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 273 | `  margin: 0.35rem 0 0.15rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 274 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 275 | `.tiptap blockquote {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 276 | `  border-left: 3px solid var(--border);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 277 | `  padding-left: 0.6rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 278 | `  color: var(--muted-foreground);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 279 | `  margin: 0.3rem 0;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 280 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 281 | `.tiptap code {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 282 | `  background: color-mix(in oklab, var(--muted) 80%, transparent);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 283 | `  padding: 0 0.25rem;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 284 | `  border-radius: 3px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 285 | `  font-size: 0.85em;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 286 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 287 | `.tiptap a {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 288 | `  color: var(--primary);` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 289 | `  text-decoration: underline;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 290 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 291 | `.tiptap mark,` | Participa da definicao visual da interface. |
| 292 | `.prose mark {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 293 | `  color: inherit;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 294 | `  padding: 0 0.1em;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 295 | `  border-radius: 2px;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 296 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 297 | `.dark .tiptap mark,` | Participa da definicao visual da interface. |
| 298 | `.dark .prose mark {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 299 | `  /* Os marca-textos têm fundos claros; não herdar o texto claro do tema escuro. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 300 | `  color: oklch(0.2 0.04 264) !important;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 301 | `  font-weight: 500;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 302 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 303 | `.dark .tiptap mark::selection,` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 304 | `.dark .prose mark::selection {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 305 | `  color: oklch(0.2 0.04 264) !important;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 306 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 307 | `.tiptap-wrapper,` | Participa da definicao visual da interface. |
| 308 | `.tiptap-wrapper * {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 309 | `  cursor: text;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 310 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 311 | `.tiptap-wrapper button {` | Inicia um bloco de regras CSS para o seletor indicado. |
| 312 | `  cursor: pointer;` | Define uma propriedade visual, como cor, tamanho, espacamento ou comportamento de layout. |
| 313 | `}` | Fecha o bloco de regras CSS aberto anteriormente. |
| 314 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
