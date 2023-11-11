FROM node:18

WORKDIR /app

RUN npm install i npm@latest -g 

COPY server/package.json server/package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server/api.js"]
