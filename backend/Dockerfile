FROM node:20-alpine

WORKDIR /Whiskey

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]