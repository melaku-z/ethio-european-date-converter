FROM node:12.16.1-alpine3.10

RUN yarn config set yarn-offline-mirror-pruning false
RUN yarn config set yarn-offline-mirror '/usr/yarn-offline'

VOLUME ["/usr/yarn-offline", "/dist"]

RUN yarn global add es-dev-server

ENV NODE_ENV=development

COPY ["package.json", ".yarnrc", "yarn.lock", ".nvmrc", "./"]

RUN yarn install && yarn cache clean

EXPOSE 3000 62222
CMD yarn start-server-dev:watch

COPY ["./", "./"]
