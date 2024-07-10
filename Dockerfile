FROM node:lts AS dist
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:lts AS node_modules
COPY package.json ./
RUN npm install

FROM node:lts

ARG PORT=3000

ENV NODE_ENV=development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "npm", "run", "start:dev" ]
