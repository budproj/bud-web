# Estágio de construção
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Instala dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências com layer caching
RUN npm ci

# Copia o código fonte
COPY . .

# Constrói a aplicação
RUN npm run build

# Estágio de produção
FROM node:20-alpine AS runner

WORKDIR /app

# Define para ambiente de produção
ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

# Adiciona usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos necessários para produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Define permissões
RUN chown -R nextjs:nodejs /app

# Muda para o usuário não-root
USER nextjs

# Expõe a porta
EXPOSE 3000

# Variável de ambiente para o host (importante para Docker)
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando para iniciar a aplicação
CMD ["node", "server.js"]