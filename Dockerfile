FROM node:10-alpine

LABEL Name=nazrin_server Version=0.1.0
ENV NODE_ENV production

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.3.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production --silent
COPY . /usr/src/app
CMD /wait && npm start