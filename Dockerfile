FROM node:20-slim

WORKDIR /traderBot

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./src ./src

RUN npm install -D typescript @types/node ts-node

CMD ["npx", "ts-node", "src/bot.ts"]

