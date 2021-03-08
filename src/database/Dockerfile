FROM ubuntu:18.04

ENV PORT 8080
ENV WORKDIR /tmp/server
ENV INSTANCE_ID 1
ENV PROXYBACKEND 127.0.0.1:8004 

RUN mkdir ${WORKDIR}
COPY *.js ${WORKDIR}/ 

RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs
#node -v 8.1 
RUN apt-get install -y npm
#npm -v 3.5.2

RUN apt-get install -y libzmq3-dev

RUN npm install --silent zmq

#Especifico para nodo de base datos
RUN npm init --force
RUN npm install level-js

# TODO crear un volumen para la base de datos en lugar de crearla siempre 
EXPOSE ${PORT} 

CMD cd ${WORKDIR} && node createdb.js db${INSTANCE_ID}/ && node object.js r${INSTANCE_ID} ${PROXYBACKEND} db${INSTANCE_ID}/