# Decky - Sistema de Flashcards (Microservicios)

Plataforma de estudio basada en repeticion espaciada, construida con una arquitectura de microservicios para aislar responsabilidades y optimizar el rendimiento.

## Arquitectura

El sistema se divide en tres servicios principales independientes:

* **Auth Service (PostgreSQL)**: Gestion de usuarios y emision de tokens JWT.
* **Deck Service (MongoDB - Puerto 8080)**: Almacenamiento persistente de mazos y tarjetas con estructura dinamica. Valida el JWT y usa el claim sub para vincular las cartas a los usuarios de la base relacional sin usar llaves foraneas.
* **Study Session Service (Redis - Puerto 8081)**: Cache temporal de alta velocidad (TTL 24h). Almacena copias completas de las tarjetas (Materialized View) para la sesion de estudio del dia, reduciendo la latencia a microsegundos. Serializa los objetos a JSON puro mediante Jackson para evitar conflictos de mapeo en la memoria RAM.

## Stack Tecnologico

* **Backend**: Java, Spring Boot
* **Bases de Datos**: PostgreSQL, MongoDB, Redis (Docker)
* **Seguridad**: Spring Security, JWT (Autenticacion Stateless)
* **Comunicacion Interna**: Spring Cloud OpenFeign (Pendiente)

<div align="center">
  <sub>Built with <3 by David</sub>
</div>