FROM ubuntu:14.04.3

MAINTAINER Gustav Karlsson

# Start off as root
ENV HOME /root
WORKDIR /root

# Install software using apt-get
#   software-properties-common is used for add-apt-repository command
#   python-software-properties is used for nodejs
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Install node applications
RUN npm install -g gulp http-server

# Work from source folder
WORKDIR /home/user/source

# Add source files
ADD . /home/user/source

# Install npm dependencies
RUN npm install

# Build project
RUN gulp --production

# Move project files to application folder
RUN mkdir -p /home/user/application && cp -r build/* /home/user/application

# Remove source code
RUN rm -rf /home/user/source

# Work from application folder
WORKDIR /home/user/application

# Add and switch to user
RUN useradd -c 'Application user' -m -d /home/user -s /bin/bash user
USER user
ENV HOME /home/user

# Application will listen on this port number
EXPOSE 8080

CMD http-server -p 8080 -d False .
