FROM node:current-slim

LABEL version="1.0"
LABEL description="Docker image for the Note Service node app."
LABEL maintainer = ["chameera.lakshitha212@gmail.com"]

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

EXPOSE 3003

COPY . ./

CMD [ "npm", "start" ]

