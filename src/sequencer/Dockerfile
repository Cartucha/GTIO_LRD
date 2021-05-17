FROM ubuntu:18.04

WORKDIR /tmp/server

ENV PORT 8003
ENV PROXY 0.0.0.0

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

EXPOSE ${PORT}

CMD node sequencer.js ${PROXY}:${PORT}
