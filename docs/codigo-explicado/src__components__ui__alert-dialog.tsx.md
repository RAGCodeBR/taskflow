# src/components/ui/alert-dialog.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import * as React from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `import { cn } from "@/lib/utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { buttonVariants } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `const AlertDialog = AlertDialogPrimitive.Root;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `const AlertDialogTrigger = AlertDialogPrimitive.Trigger;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `const AlertDialogPortal = AlertDialogPrimitive.Portal;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `const AlertDialogOverlay = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 14 | `  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 17 | `  <AlertDialogPrimitive.Overlay` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 18 | `    className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 19 | `      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `      className,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `    {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `    ref={ref}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `const AlertDialogContent = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `  React.ElementRef<typeof AlertDialogPrimitive.Content>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 32 | `  <AlertDialogPortal>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 33 | `    <AlertDialogOverlay />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 34 | `    <AlertDialogPrimitive.Content` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 35 | `      ref={ref}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `      className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 37 | `        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-3xl",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `        className,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `      {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  </AlertDialogPortal>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 43 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 48 | `);` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 49 | `AlertDialogHeader.displayName = "AlertDialogHeader";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `  <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 53 | `    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 54 | `    {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `);` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `AlertDialogFooter.displayName = "AlertDialogFooter";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `const AlertDialogTitle = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  React.ElementRef<typeof AlertDialogPrimitive.Title>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 63 | `  <AlertDialogPrimitive.Title` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 64 | `    ref={ref}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `    className={cn("text-lg font-semibold", className)}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 66 | `    {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 71 | `const AlertDialogDescription = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  React.ElementRef<typeof AlertDialogPrimitive.Description>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 75 | `  <AlertDialogPrimitive.Description` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 76 | `    ref={ref}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    className={cn("text-sm text-muted-foreground", className)}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 78 | `    {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `const AlertDialogAction = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `  React.ElementRef<typeof AlertDialogPrimitive.Action>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 88 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `const AlertDialogCancel = React.forwardRef<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `>(({ className, ...props }, ref) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 95 | `  <AlertDialogPrimitive.Cancel` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 96 | `    ref={ref}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 98 | `    {...props}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 103 | `export {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 104 | `  AlertDialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `  AlertDialogPortal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `  AlertDialogOverlay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `  AlertDialogTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `  AlertDialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `  AlertDialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  AlertDialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  AlertDialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  AlertDialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  AlertDialogAction,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `  AlertDialogCancel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
