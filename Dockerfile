FROM node:16.16.0

WORKDIR /usr/luni/api

COPY . ./

RUN npm install

RUN chown -R node.node /usr/luni/api/node_modules

CMD ["npm", "run", 'deploy']