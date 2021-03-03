FROM ubuntu

ENV PORT 8080
ENV WORKDIR /tmp/server
ENV INSTANCE_ID 1
ENV PROXYBACKEND 127.0.0.1:8004 

RUN mkdir ${WORKDIR}
COPY *.js ${WORKDIR} 

RUN apt-get update -y
RUN apt-get install -y nodejs=8.10.0
RUN apt-get install -y npm=3.5.2
RUN apt-get install -y libzmq3-dev
RUN apt-get install -y zmq

# TODO crear un volumen para la base de datos en lugar de crearla siempre 

EXPOSE ${PORT} 

CMD cd ${WORKDIR} && node createdb.js db${INSTANCE_ID}/ && node object.js r${INSTANCE_ID} ${PROXYBACKEND} db${INSTANCE_ID}/