# Sistema de Pagos y Tesorería Central NYU

## Descripción

El **Sistema de Pagos y Tesorería Central NYU** es una plataforma web desarrollada para centralizar la gestión de pagos provenientes de distintos sistemas universitarios, como Matrícula, Biblioteca, Residencia y Cafetería.

El proyecto está compuesto por una aplicación **Frontend** desarrollada en Angular y un **Backend** desarrollado con NestJS, los cuales se comunican mediante una API REST para gestionar órdenes de pago, autenticación, confirmaciones y generación de comprobantes.

---

## Objetivos del Proyecto

* Centralizar las órdenes de pago de los distintos servicios universitarios.
* Evitar la duplicidad de cobros mediante mecanismos de control e idempotencia.
* Procesar pagos simulados utilizando distintos medios de pago.
* Generar comprobantes y mantener un registro de auditoría.
* Proporcionar una API segura mediante autenticación basada en JWT.

---

## Arquitectura General

```
  ┌──────────────────┐
  │ Sistemas externos│
  │ Matrícula        │
  │ Biblioteca       │
  │ Residencia       │
  │ Cafetería        │
  └────────┬─────────┘
           │
           ▼
┌──────────────────────┐
│ Sistema de Pagos NYU │
├──────────────────────┤
│  Frontend (Angular)  │
│         │            │
│     REST API         │
│         │            │
│   Backend (NestJS)   │
│         │            │
│    Base de Datos     │
└──────────────────────┘
```

---

## Tecnologías Utilizadas

### Frontend

* Angular 17
* TypeScript
* Bootstrap
* RxJS
* Angular Router
* Reactive Forms
* JWT Authentication

### Backend

* NestJS
* TypeORM
* Oracle SQL
* Swagger (OpenAPI)
* JWT
* Guards de autenticación

---

## Funcionalidades Implementadas

### Gestión de Pagos

* Creación y consulta de órdenes de pago.
* Confirmación de pagos.
* Generación de comprobantes.
* Simulación de distintos medios de pago.

### Métodos de Pago

* Tarjeta bancaria
* Transferencia bancaria
* Billetera digital

### Seguridad

* Registro y autenticación de usuarios.
* Autorización mediante JWT.
* Protección de rutas mediante Guards.

### Auditoría

* Registro de operaciones.
* Reportes consolidados por período y servicio.

---

## Estructura del Repositorio

```
Sistema_pagos_uni/
│
├── frontend/
│   ├── README.md
│   └── ...
│
├── backend/
│   ├── README.md
│   └── ...
│
└── .gitignore
│
└── README.md
```

Cada módulo posee su propia documentación técnica:

* **frontend/README.md**: instalación, estructura y ejecución de la aplicación Angular.
* **backend/README.md**: configuración, API REST, base de datos y ejecución del servidor NestJS.

---

## Instalación

Clonar el repositorio:

```
git clone https://github.com/LukasTorr/Sistema_pagos_uni.git
```

Luego seguir las instrucciones específicas disponibles en los README del frontend y del backend.

---

## Equipo de Desarrollo

* Lucas Torres
* Alex Muñoz
* Alonso Kalise
* André Guerra
* Kary Tudela
* Denis Condori
* Enzo Galdames

---

## Estado del Proyecto

Proyecto desarrollado con fines académicos para la implementación de una plataforma centralizada de pagos universitarios utilizando una arquitectura cliente-servidor basada en Angular y NestJS.
