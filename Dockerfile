# Build: pagine statiche (dist/client) + server Node per le API (dist/server)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Le variabili PUBLIC_* finiscono nel bundle: vanno passate in fase di build
ARG PUBLIC_LEAD_ENDPOINT
ENV PUBLIC_LEAD_ENDPOINT=$PUBLIC_LEAD_ENDPOINT
ARG PUBLIC_GOOGLE_CLIENT_ID
ENV PUBLIC_GOOGLE_CLIENT_ID=$PUBLIC_GOOGLE_CLIENT_ID
ARG PUBLIC_STADIA_KEY
ENV PUBLIC_STADIA_KEY=$PUBLIC_STADIA_KEY
RUN npm run build

# Esecuzione: Caddy serve il sito e passa /api/ al server Node sulla stessa macchina
FROM node:22-alpine
RUN apk add --no-cache caddy
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY Caddyfile /etc/caddy/Caddyfile
COPY start.sh ./start.sh
RUN chmod +x start.sh
ENV NODE_ENV=production
CMD ["./start.sh"]
