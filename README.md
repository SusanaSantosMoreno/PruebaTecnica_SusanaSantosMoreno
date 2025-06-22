# PRUEBA TÉCNICA: API REST con Express, JWT y Mongoose

Una API REST modularizada para autenticación y gestión de tareas usando:

- [Express.js](https://expressjs.com/)
- [Mongoose (MongoDB)](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [express-validator](https://express-validator.github.io/)
- [Nodemon](https://nodemon.io/)
- Documentación con Swagger (`swagger-jsdoc` + `swagger-ui-express`)

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/SusanaSantosMoreno/PruebaTecnica_SusanaSantosMoreno
cd PruebaTecnica_SusanaSantosMoreno
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env con tus variables de entorno:

```bash
PORT=8080
JWT_SECRET=seCRET_Example
JWT_REFRESH_SECRET=seCRET_Example2!
MONGO_URI=mongodb://localhost:27017/PruebaTecnicaDB
```

## Uso 

Inicia el servidor (usa nodemon para pruebas):

```bash
npm run dev
```

## Documentación

La api está documentada en swagger, consulta la documentación en: 

```bash
http://localhost:8080/api-docs/
```
Incluye:

- Autenticación Bearer JWT
- Esquemas reutilizables (`Task`, `User`, etc.)
- Ejemplos de request y response

## Seguridad

- Contraseñas hasheadas con `bcrypt`
- Tokens JWT firmados con `JWT_SECRET`
- Validación de datos con `express-validator`
- Verificación de ID de Mongo y autenticación en middlewares

