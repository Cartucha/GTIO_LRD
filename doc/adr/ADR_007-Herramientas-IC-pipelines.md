# Herramientas IC pipelines


* Estado: Aceptada
* Responsables: Pablo Lizarraga Cía, Jon Mikel Merino Ruiz, David Marzo Pérez e Izaskun Rodríguez Villar
* Fecha: 2021-03-24

## Contexto y Planteamiento del Problema

Queremos agregar todo el código que generan los desarrolladores de un proyecto lo más rápido y de manera periódica posible.

## Factores en la Decisión 

* Sencilla
* Fácil de usar
* Fácil de mantener
* Experiencia previa del equipo
* Costes bajos de la locencia o gratuitos

## Opciones Consideradas

* Jenkins
* AWS CodePipeline

## Decisión

Opción elegida: "Jenkins”, porque satisface todos los factores de decisión evaluados además es multiplataforma.  


## Ventajas y Desventajas de las opciones

### Jenkins

Servidor automatizado de integración continua de código abierto capaz de organizar una cadena de acciones que ayudan a lograr el proceso de integración continua (y mucho más) de manera automatizada. Está completamente escrito en Java y es una aplicación conocida y reconocida por DevOps de todo el mundo.

*	Positivo, porque tiene un software independiente.
*	Positivo, porque se puede usar en varios sistemas (que no sean AWS).
*	Positivo, porque tiene muchas opciones de configuración.
*	Positivo, porque se puede usar para configurar repositorios de código localmente.
*	Positivo, porque es gratuito.
*	Positivo, porque su instalación y mantenimiento es fácil.
*	Negativo, porque la integración continua se rompe regularmente debido a algunos pequeños cambios de configuración. Se requiere atención del desarrollador.
*	Negativo, porque su interfaz está desactualizada.


### AWS CodePipeline

Servicio de entrega continua completamente administrado que permite automatizar canalizaciones de lanzamiento para lograr actualizaciones de infraestructura y aplicaciones rápidas y fiables.

*	Positivo, porque está basado en la red.
*	Positivo, porque está integrado con AWS.
*	Positivo, porque es fácil de configurar.
*	Negativo, porque no se puede usar para configurar repositorios de código localmente.
*	Negativo, porque no es gratuito.
*	Negativo, porque falta integración con proveedores de control de origen que no sean GitHub.


