# ---- Etapa 1: Build da Aplicação ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json tsconfig.json ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copia o código fonte
COPY src/ ./src/

# Executa o build do TypeScript (gera a pasta dist)
RUN npm run build

# ---- Etapa 2: Execução em Produção ----
FROM node:18-alpine AS runner

WORKDIR /app

# Define ambiente de produção
ENV NODE_ENV=production

# Copia apenas os arquivos necessários para produção
COPY package*.json ./
RUN npm ci --only=production

# Copia os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta padrão da aplicação (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação compilada
CMD ["node", "dist/server.js"]