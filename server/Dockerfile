FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3001

RUN ["yarn", "build"]

CMD ["yarn", "start"]
