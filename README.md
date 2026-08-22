# Francy Araujo

Site estático desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Requisitos

- Node.js 24 ou superior
- npm 11 ou superior

## Desenvolvimento local

```powershell
npm install
npm run dev
```

Abra <http://127.0.0.1:3000>.

## Validação completa

```powershell
npm run check
```

Esse comando executa o typecheck com TypeScript, a análise com Biome, o
orçamento de desempenho das imagens e o build de produção do Next.js.

## Build estático

```powershell
npm run build
npm start
```

Os arquivos exportados são gerados no diretório `dist`.
