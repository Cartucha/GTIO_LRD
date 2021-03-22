# GTIO_LRD
 * Asignatura https://github.com/aitormendivil/GTIO2021/tree/main/ADR
 * Templates https://adr.github.io/madr/
 * Drive https://drive.google.com/drive/folders/1xp7AgkVEKFTVEDlb7SVZxdca_R8idcyn?usp=sharing
 * Redmine
      * Entorno de Producción http://172.18.69.89/redmine   
      * Entorno de Desarrollo (Docker) http://172.18.69.89:8080/
  * Kong http://172.18.69.89:8001 
  * Konga http://172.18.69.89:1337

# ADRs 
* [ADR_001-Metodologia a usar.md](./doc/adr/ADR_001-Metodologia%20a%20usar.md)
* [ADR_002-Organización-equipo.md](./doc/adr/ADR_002-Organización-equipo.md)
* [ADR-003-herramientas-gestion-del-proyecto.md](./doc/adr/ADR-003-herramientas-gestion-del-proyecto.md)
* [ADR-004-herramientas-gestion-configuracion-del-proyecto.md](./doc/adr/ADR-004-herramientas-gestion-configuracion-del-proyecto.md)
* [ADR-005-modelo-soporte.md](./doc/adr/ADR-005-modelo-soporte.md)
* [ADR-006-Arquitectura-de-la-aplicación.md] (./doc/adr/ADR_006-Arquitectura-de-la-aplicación.md)

# Microservicios
* App
     * index http://172.18.69.89:8000\

 # Otros
 * Ejecutar el conjunto de dockers
    sudo docker-compose up
 * Ejecutar nodo app (api-rest): 
    * sudo docker run -p 80:8080 -d appImageTag
    * curl -d "value=ejemplo" -X POST http://localhost:80/item/10
    * curl http://localhost:80/item/10

 * Acceder al contenedor de Docker: sudo docker exec -ti {Contenedor} sh


