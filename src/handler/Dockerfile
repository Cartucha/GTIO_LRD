FROM ubuntu:18.04

ENV INSTANCE_ID 1
ENV PROXYCLIENTES proxyup:8002
ENV PROXYREPLICAS proxydown:8007 
ENV HOSTTOBE sequencer:8003

RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs
#node -v 8.1 
RUN apt-get install -y npm
#npm -v 3.5.2
RUN apt-get install -y libzmq3-dev

RUN npm init -y
RUN npm install --silent zmq

#Copiar codigo fuente
COPY *.js ./

CMD node handler.js h${INSTANCE_ID} ${PROXYCLIENTES} ${PROXYREPLICAS} ${HOSTTOBE}  