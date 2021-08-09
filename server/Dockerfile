FROM node:12-alpine

MAINTAINER hyeonseok <gus0674@ajou.ac.kr>

WORKDIR /home/myfavoritemusic-master
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
