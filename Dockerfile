FROM node:alpine
WORKDIR /home/node/app

# using wildcard (*) to copy both package.json and package-lock.json
COPY package*.json /home/node/app/
RUN npm install -g nodemon && \
  npm install

# create and set app directory as current dir
COPY ./ /home/node/app/
# EXPOSE 3000
# CMD ["nodemon", "server.js"]