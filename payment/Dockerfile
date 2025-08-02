#for base
FROM node:20-alpine3.16 AS base

WORKDIR /app/payment

#for development
FROM base AS dev

COPY package.json ./


RUN npm install
COPY . .

EXPOSE 9003

CMD ["npm","run","dev" ]


FROM base AS builder

COPY package.json ./
COPY  .env ./
# Cài openssl1.1 cho Prisma

RUN npm install
COPY . .
RUN npm run build


FROM base AS prod

COPY --from=builder /app/payment/dist ./dist
COPY --from=builder /app/payment/package.json .
COPY --from=builder /app/payment/package-lock.json .
COPY --from=builder /app/payment/.env .


RUN npm ci --omit=dev

# RUN npm install && npm cache clean --force

EXPOSE 9003

# CMD ["npm","run","dev" ]
CMD ["npm","start" ]

