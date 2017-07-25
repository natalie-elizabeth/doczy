FROM node:boron

MAINTAINER Natalie Elizabeth <natalie.elizabeth@andela.com>

# use nodemon for development
RUN npm install --global nodemon
# RUN npm install --global yarn

# use cached layer for node modules
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install > /dev/null 2>&1
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

# add project files
WORKDIR /usr/src
ADD . /usr/src

EXPOSE 8080

CMD ["yarn","start:dev"]
