FROM ubuntu:18.04

WORKDIR /tmp/server

ENV PORT 8080
ENV INSTANCE_ID 1
ENV PROXY1 127.0.0.1:8001
ENV PROXY2 127.0.0.1:8002 
ENV PROXY3 127.0.0.1:8003  

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

# TODO crear un volumen para la base de datos en lugar de crearla siempre 
EXPOSE ${PORT} 

CMD node handler.js h${INSTANCE_ID}/ && node tobe.js ${PROXY1} ${PROXY3} ${PROXY2}  