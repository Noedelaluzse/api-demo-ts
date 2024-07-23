# REST API con Clean Architecture y TypeScript

## Tecnologías:
- **Node.js**
- **Express**
- **Twilio**
- **Cloudinary**
- **Nodemailer**
- **MongoDB**

## Arquitectura:
- **Clean Architecture**

## Lenguaje de programación:
- **TypeScript**
- **HTML**
## Estructura del directorio:

Src:
- Config:  
Contiene los adaptadores de las librerías de servicios como Cloudinary y Twilio.
- Data:  
Contiene los modelos de MongoDB.
- Domain:  
Lógica de negocio.  
- Infrastructure:  
Implementación de la lógica de negocio.  
- Presentation:  
Rutas y controladores de la API.  
- Uploads:  
Ruta para la visualización de archivos guardados de manera local.  
- App:  
Inicio de la aplicación.  

## Descripción del proyecto:
Esta REST API es una demostración de mis habilidades avanzadas como Backend Developer y mi dominio de diversas tecnologías clave. La API incluye:

- **Validación de OTP** mediante mensajería con Twilio.
- **Protección de rutas** utilizando JWT.
- **Gestión de archivos** con Cloudinary.

He diseñado y desarrollado esta API siguiendo estrictamente los principios de Clean Architecture, garantizando una separación clara de preocupaciones y facilitando la escalabilidad y mantenibilidad del código.

Implementé un enfoque modular adaptando las librerías externas con el patrón de diseño Adaptador. Este patrón permite que las librerías puedan ser reemplazadas de manera sencilla y eficiente sin afectar el núcleo de la lógica de negocio, asegurando la flexibilidad y robustez del sistema.

El uso de TypeScript como lenguaje de programación asegura la detección temprana de errores y una mejor experiencia de desarrollo gracias a su tipado estático. La estructura del proyecto está organizada de manera que facilita la colaboración y el mantenimiento, con una clara división entre configuración, datos, lógica de negocio, infraestructura y presentación.

## Cómo empezar
Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git

   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo `.env.template` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
4. Configura las variables de entorno en el archivo `.env`:
   ```bash
   PORT=3000
   PUBLIC_PATH=PUBLIC_PATH
   NODE_ENV=development
   JWT_SEED=
   MONGO_URL=
   MONGO_DB_NAME=
   ACCOUNTSID=
   AUTHTOKEN=
   VERIFYSID=
   CLOUDINARY_URL=
   OUTGOING_EMAIL=
   EMAIL_PASSWORD=
   SMTP_SERVER=
   OUTGOING_PORT=
   MAILER_SERVICE=
   MAILER_SECRET_KEY=
   MAILER_EMAIL=
   ```
5. Inicia el servidor:
   ```bash
   npm start
   ```
6. La API estará disponible en `http://localhost:3000`.

