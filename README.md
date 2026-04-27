Sistema de Pagos y Tesorería Central NYU
Este proyecto constituye el núcleo transaccional del ecosistema universitario de la NYU. Su objetivo principal es centralizar las órdenes de pago, confirmaciones y comprobantes de todos los módulos (Matrícula, Residencia, Biblioteca y Cafetería) para garantizar la trazabilidad financiera y evitar la duplicidad de cobros.

Requisitos Funcionales Implementados
Gestión de Órdenes: Creación de órdenes de pago vinculadas a referencias de servicios externos.
Pasarela de Simulación: Soporte para diversos medios de pago como tarjetas, transferencias y billeteras digitales.
Notificaciones Automáticas: Comunicación de resultados (confirmación o rechazo) al sistema solicitante mediante webhooks para habilitar procesos de negocio.
Idempotencia: Garantía de seguridad en cada orden para evitar procesar dos veces un mismo cobro.
Auditoría y Reportes: Generación de comprobantes y reportes consolidados de recaudación por período y servicio.

Stack Tecnológico (Backend)
Framework: NestJS.
ORM: TypeORM aplicando el Repository Pattern.
Base de Datos: Oracle SQL.
Documentación: Swagger (OpenAPI).
Seguridad: Autenticación mediante JWT y protección de rutas con Guards.

---

Configuración e Instalación Local
Para levantar el entorno de desarrollo en tu máquina local, sigue estos pasos:

Clonar el repositorio

```bash
git clone [https://github.com/LukasTorr/Sistema_pagos_uni.git](https://github.com/LukasTorr/Sistema_pagos_uni.git)
cd Sistemas_pagos_uni/sistema_pagos_uni 
