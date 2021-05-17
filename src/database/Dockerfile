FROM ubuntu:18.04

WORKDIR /tmp/server

ENV INSTANCE_ID 1
ENV PROXYBACKEND proxydown:8008 

RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs
#node -v 8.1 
RUN apt-get install -y npm
#npm -v 3.5.2
RUN apt-get install -y libzmq3-dev

RUN npm init -y
RUN npm install --silent zmq
#Especifico para nodo de base datos 
RUN mv /tmp/server/node_modules/zmq /tmp/server/node_modules/.zmq.DELETE
RUN npm install level
RUN mv /tmp/server/node_modules/.zmq.DELETE /tmp/server/node_modules/zmq

#Copiar codigo fuente
COPY *.js ./

CMD node createdb.js db${INSTANCE_ID}/ && node object.js r${INSTANCE_ID} ${PROXYBACKEND} db${INSTANCE_ID}/