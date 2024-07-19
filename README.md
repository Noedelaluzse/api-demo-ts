# REST API de Validación de OTP

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

## Estructura del directorio:

Src/
├── Config/
│ └── Adapters/
│ └── cloudinary.ts # Adaptador para el servicio Cloudinary.
│ └── twilio.ts # Adaptador para el servicio Twilio.
├── Data/
│ └── Models/
│ └── userModel.ts # Modelo de usuario para MongoDB.
│ └── placeModel.ts #
│ └── categoryModel.ts # Modelo de categoria para MongoDB.
│ └── logModel.ts # Modelo de log para MongoDB.
├── Domain/
│ └── Datasources/
│ └── authDatasources.ts # Lógica de negocio para la autenticación.
│ └── userDatasources.ts # Lógica de negocio para la validación de usuarios.
│ └── otpDatasources.ts # Lógica de negocio para la validación de OTP.
├── Infrastructure/
│ └── Repositories/
│ └── userRepository.ts # Implementación de la lógica de acceso a datos de usuario.
│ └── otpRepository.ts # Implementación de la lógica de acceso a datos de OTP.
├── Presentation/
│ └── Controllers/
│ └── authController.ts # Controlador para la autenticación.
│ └── otpController.ts # Controlador para la validación de OTP.
│ └── Routes/
│ └── authRoutes.ts # Rutas de la API para la autenticación.
│ └── otpRoutes.ts # Rutas de la API para la validación de OTP.
├── Uploads/
│ └── Local/ # Ruta para la visualización de archivos guardados de manera local.
├── App/
│ └── app.ts # Inicio de la aplicación.
│ └── server.ts # Configuración del servidor.




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