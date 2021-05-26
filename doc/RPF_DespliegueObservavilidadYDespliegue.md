# [Observavilidad ELK y despliegue en aws]

* Estado: propuesta
* Fecha: 20210525

# ¿Cómo se despliega el sistema en AWS?

Se usa terraform para aplicar los cambios sobre la infraestructura, más rápido y versatil que aws-cli.
En el pipeline de jenkins se incluira un parametro que permite ademas de desplegar en el servidor propio desplegar en aws en entorno de stage.
Primera aproximación:
Desplegar en una instancia unica con docker compose, con ingress del puerto 80 al puerto publico del kong.
Mejora:
Desplegar el cada componente en un nodo gestionado por ecs.

# ¿Cuáles son las métricas/logs para evaluar el funcionamiento del sistema?

Los logs empleados para evaluar el funcionamiento son los correspondientes a las peticiones GET y POST a la app del replicador. En concreto, los logs evaluados son los del contenedor Docker de Kong que actúa con API Gateway y cómo balanceador de carga. 

En cuanto a las métricas, se utilizan basicas de sistemas cpu/memoria y de negocio clientes/conexiones/operaciones separando las operaciones por tipo lectura/escritura.

# ¿Cuál es la arquitectura del sistema de métricas/logs?
Stack ELK: combinación de tres proyectos open source ElasticSearch como motor de busquedas, Logstash como recolector de logs/metricas, Kibana como herramienta
de visualización.

# ¿Cómo se visualizan esas métricas/logs?
Las métricas y logs se visualizan a través de Kibana. En los apartados Discover y Dev Tools podemos hacer consultas en los logs, en el primero mediante formularios y en el segundo mediante línea de comandos. Las métricas las visualizamos a través de gráficas en el apartado Metrics.  


# Trabajo futuro o Desarrollos pendientes
    Despliegue de cada microservicio en una máquina diferente de AWS y su gestión a traves del servicio de cluster de amazon (ecs)


