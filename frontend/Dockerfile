# Use an official node runtime as a parent image
FROM node:latest

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

# Install dependencies
COPY package*.json /app/

# RUN npm install --legacy-peer-deps
RUN npm install --unsafe-perm

USER node

# Add rest of the client code
COPY --chown=node:node . /app/

RUN chmod a+x /app/node_modules/.bin/react-scripts

RUN mkdir -p /app/node_modules/.cache

EXPOSE 3000

CMD npm start
