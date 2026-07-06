## Sistema de Pagos y Tesorería Central NYU
Este proyecto constituye el núcleo transaccional del ecosistema universitario de la NYU. Su objetivo principal es centralizar las órdenes de pago, confirmaciones y comprobantes de todos los módulos (Matrícula, Residencia, Biblioteca y Cafetería) para garantizar la trazabilidad financiera y evitar la duplicidad de cobros.
## Requisitos Funcionales Implementados
- Gestión de Órdenes: Creación de órdenes de pago vinculadas a referencias de servicios externos.
- Pasarela de Simulación: Soporte para diversos medios de pago como tarjetas, transferencias y billeteras digitales.
- Notificaciones Automáticas: Comunicación de resultados (confirmación o rechazo) al sistema solicitante mediante webhooks para habilitar procesos de negocio.
- Idempotencia: Garantía de seguridad en cada orden para evitar procesar dos veces un mismo cobro.
- Auditoría y Reportes: Generación de comprobantes y reportes consolidados de recaudación por período y servicio.
## Stack Tecnológico (Backend)
- Framework: NestJS.
- ORM: TypeORM aplicando el Repository Pattern.
- Base de Datos: Oracle SQL.
- Documentación: Swagger (OpenAPI).
- Seguridad: Autenticación mediante JWT y protección de rutas con Guards.

---

## Configuración e Instalación Local
Para levantar el entorno de desarrollo en tu máquina local, sigue estos pasos:

## Clonar el repositorio

```bash
git clone [https://github.com/LukasTorr/Sistema_pagos_uni.git](https://github.com/LukasTorr/Sistema_pagos_uni.git)
cd Sistemas_pagos_uni/sistema_pagos_uni 
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compilar y ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Desarrollo

Una vez que la aplicación NestJS este lista para producción, existen pasos a seguir para asegurrarse que se ejecute de la manera mas ediciente posible. Revisar la [documentación](https://docs.nestjs.com/deployment) para más información.

Si buscas que NestJS desarrolle una plataforma en la nube, revisa [Mau](https://mau.nestjs.com), plataforma oficioal para desarrollar NestJS en AWS. Mau hace que el desarrollo sea rapido y directo, requeriendo solo unos pasos:

```bash
$ npm install -g mau
$ mau deploy
```

Con Mau, puedes desarrollar tus aplicaciones con solo unos clicks, permitiendote concentrarte en construir caracteristicas en lugar de preocuparte por manejar la infraestructura.

## Recursos

Revisa unos cuantos recursos que podrian ayudarte cuando trabajas con NestJS:

- Visita [NestJS Documentation](https://docs.nestjs.com) para aprender más acerca del framework.
- Para preguntas y soportes, visita el [canal de Discord](https://discord.gg/G7Qnnhy).
- Para profundizarte y obtener más experiencia practica, revisa el video odicial: [courses](https://courses.nestjs.com/).
- Desarrolla tu aplicación en AWS con la ayuda de [NestJS Mau](https://mau.nestjs.com) en solo unos clicks.
- Visualiza el grafo de tu aplicación e interactua con NestJS en tiempo real usando: [NestJS Devtools](https://devtools.nestjs.com).
- Necesitas ayuda con tu proyecto? Revisa la página: [enterprise support](https://enterprise.nestjs.com).
- Para mantenerte actualizado, sigue la página [X](https://x.com/nestframework) y [LinkedIn](https://linkedin.com/company/nestjs).
- ¿Buscas trabajo o tienes trabajo para ofrecer? Revisa [Jobs board](https://jobs.nestjs.com).

## Soporte

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Contactos

- Autor - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Sitio Web - [https://nestjs.com](https://nestjs.com/)
- X - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

