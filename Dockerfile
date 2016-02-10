FROM ubuntu:14.04.3

MAINTAINER Gustav Karlsson

# Install software using apt-get
#   software-properties-common is used for add-apt-repository
#   python-software-properties is used for nodejs
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Install node applications
RUN npm install -g gulp http-server

# Work in app directory
WORKDIR /app

# Add package.json for installing project dependencies
ADD package.json /app/package.json

# Install project dependencies
RUN npm install

# Add remaining source files
ADD . /app

# Build project
RUN gulp --production

# Application will listen on this port number
EXPOSE 8080

# Run server
CMD http-server -p 8080 -d False build
