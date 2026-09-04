FROM node:24-alpine AS builder

ARG API_URL

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN echo "API_URL=${API_URL}" > .env.production
RUN npm run build

FROM scratch AS export
COPY --from=builder /app/dist /dist
