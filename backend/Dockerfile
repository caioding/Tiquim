FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE ${BACKEND_PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]