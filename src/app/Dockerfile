<<<<<<< HEAD
FROM ubuntu:18.04

WORKDIR /tmp/server

#No cambiar PORT
ENV PORT 80  
ENV INSTANCE_ID 1
ENV PROXYFRONTEND 127.0.0.1:8004 

RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs
#node -v 8.1 
RUN apt-get install -y npm
#npm -v 3.5.2
RUN apt-get install -y libzmq3-dev

RUN npm init -y
RUN npm install --silent zmq
#Especifico para express
RUN mv /tmp/server/node_modules/zmq /tmp/server/node_modules/.zmq.DELETE
RUN npm install express --save
RUN mv /tmp/server/node_modules/.zmq.DELETE /tmp/server/node_modules/zmq

#Copiar codigo fuente
COPY *.js ./

EXPOSE ${PORT} 

CMD node app.js ${INSTANCE_ID} ${PROXYFRONTEND}
=======
FROM ubuntu:18.04

WORKDIR /tmp/server

ENV PORT 8080
ENV INSTANCE_ID 1
ENV PROXY 127.0.0.1:8000 

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

CMD node app.js c${INSTANCE_ID}/ && node client.js ${PROXY}
>>>>>>> 318307eff4606925a499167b1b8ec2bbdb34e7d8
