# NYU Portal – Login Centralizado (Frontend)

Frontend Angular standalone del login/registro centralizado del ecosistema NYU.
**Este repositorio es SOLO el frontend.** No incluye backend ni base de datos.

## Estado actual
Corre en **modo mock** por defecto (`environment.mockAuth = true`): permite loguearse
con cualquier correo/contraseña sin necesidad de backend, generando un JWT falso pero
con formato válido, para poder probar toda la UI y el flujo de redirección.

## Instalación y ejecución
\`\`\`bash
npm install
npm start
\`\`\`
Disponible en http://localhost:4200

## Conectar con el backend real (cuando esté disponible)
En \`src/environments/environment.ts\`:
1. Cambia \`mockAuth\` a \`false\`.
2. Ajusta \`authApiUrl\` a la URL real del backend de autenticación.

El backend debe exponer:
- \`POST {authApiUrl}/auth/login\` → body \`{ email, password }\` → responde \`{ accessToken, expiresIn }\`
- \`POST {authApiUrl}/auth/register\` → body \`{ firstName, lastName, rut, email, password }\` → responde \`{ id, email, firstName, lastName }\`

El \`accessToken\` debe ser un JWT con payload:
\`\`\`json
{ "sub": "...", "email": "...", "fullName": "...", "role": "STUDENT|STAFF|ADMIN", "exp": ..., "iat": ... }
\`\`\`

## Cómo los demás sistemas (Matrícula, Alojamiento, Biblioteca, Cafetería) usan este login

1. Cuando su app detecte que no hay sesión, deben redirigir a:
\`\`\`
https://<url-de-este-login>/login?redirect=<su-propia-URL-de-callback-codificada>
\`\`\`
2. Tras un login exitoso, este proyecto redirige de vuelta a esa URL con el token pegado
   en el fragmento: \`https://su-app.com/callback#token=eyJhbGci...\`
3. Cada sistema debe tener su propia ruta \`/callback\` que lea ese token del fragmento
   y lo guarde en su \`localStorage\`.
4. **Importante**: la URL de callback de cada sistema debe agregarse a
   \`allowedRedirectHosts\` en \`environment.ts\` de este proyecto, o el login la va a
   rechazar por seguridad (evita que cualquiera use este login para robar tokens
   redirigiendo a un sitio no autorizado).

## Estructura del proyecto
\`\`\`
src/app/
├── core/
│   ├── models/         # DTOs, interfaces, enums
│   ├── services/        # AuthService (login, logout, mock, estado de sesión)
│   ├── interceptors/     # JWT automático + manejo de errores HTTP
│   └── guards/          # authGuard, roleGuard
├── features/
│   ├── login/           # Login con flujo NetID -> contraseña
│   ├── register/        # Registro con validación de RUT y correo institucional
│   └── dashboard/       # Placeholder post-login
├── app.routes.ts
└── app.config.ts
\`\`\`

## Pendiente cuando llegue el backend real
- [ ] Confirmar URL y puerto del backend de auth.
- [ ] Confirmar nombres exactos de campos si difieren de lo documentado arriba.
- [ ] Agregar las URLs de callback reales de cada sistema a \`allowedRedirectHosts\`.
- [ ] Cambiar \`mockAuth\` a \`false\`.
