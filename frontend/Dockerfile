# ---- Build stage ----
# react-scripts@4 (Create React App) não é compatível com o resolvedor de
# módulos "exports" de versões recentes do Node (20+) — ver README. O build
# foi validado com Node 16, por isso fixamos essa versão aqui.
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
