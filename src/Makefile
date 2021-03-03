proxyup: proxy/proxy.js
	node proxy/proxy.js 127.0.0.1:8000 127.0.0.1:8001
proxydown: proxy/proxy.js
	node proxy/proxy.js 127.0.0.1:8003 127.0.0.1:8004

app1: app/app.js app/client.js
	node app/app.js c1 127.0.0.1:8000
app2: app/app.js app/client.js
	node app/app.js c2 127.0.0.1:8000
app3: app/app.js app/client.js
	node app/app.js c3 127.0.0.1:8000

handler1: handler/handler.js handler/tobe.js
	node handler/handler.js h1 127.0.0.1:8001 127.0.0.1:8003 127.0.0.1:8002
handler2: handler/handler.js handler/tobe.js
	node handler/handler.js h2 127.0.0.1:8001 127.0.0.1:8003 127.0.0.1:8002
handler3: handler/handler.js handler/tobe.js
	node handler/handler.js h3 127.0.0.1:8001 127.0.0.1:8003 127.0.0.1:8002

sequencer: sequencer/sequencer.js
	node sequencer/sequencer.js 127.0.0.1:8002

database1: database/object.js db1/
	node database/object.js r1 127.0.0.1:8004 db1/
database2: database/object.js db2/
	node database/object.js r2 127.0.0.1:8004 db2/
database3: database/object.js db3/
	node database/object.js r3 127.0.0.1:8004 db3/


createdb1: database/createdb.js
	node database/createdb.js db1/
createdb2: createdb.js
	node database/createdb.js db2/
createdb3: database/createdb.js
	node database/createdb.js db3/
createdb: createdb1 createdb2 createdb3

all: proxy.js app.js client.js handler.js tobe.js sequencer.js database/object.js
	gnome-terminal -- bash -c "make proxydown; read line"
	gnome-terminal -- bash -c "make database1; read line"
	gnome-terminal -- bash -c "make database2; read line"
	gnome-terminal -- bash -c "make database3; read line"
	gnome-terminal -- bash -c "make proxyup; read line"
	gnome-terminal -- bash -c "make sequencer; read line"
	gnome-terminal -- bash -c "make handler1; read line"
	gnome-terminal -- bash -c "make handler2; read line"
	gnome-terminal -- bash -c "make handler3; read line"
	gnome-terminal -- bash -c "make app1; read line"
	gnome-terminal -- bash -c "make app2; read line"
	gnome-terminal -- bash -c "make app3; read line"
