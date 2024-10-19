FROM node:20.9.0-alpine

WORKDIR /usr/dist

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dist/app.js"]
