# syntax=docker/dockerfile:1
FROM node:16 AS builder

ENV NODE_ENV=development
ENV PORT=3022
ENV HOST=0.0.0.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16 AS runner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma
COPY start.sh ./

RUN npm install

COPY --from=builder /app/dist ./dist

RUN chmod +x ./start.sh

CMD ["./start.sh"]