# Build del sito statico
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
RUN npm run build

# Server statico
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
