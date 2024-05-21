# TFG Project

## Desarrollo
El proceso de creación de la aplicación web se ha desarrollado desde un equipo con **Windows 10** con la versión de **Node.js v20.9.0**.

## Requisitos

Para poder desplegar la aplicación, se debe tener instalado:
- **Gestor de paquetes Node**: [Node.js](https://nodejs.org/)
- **Sistema de control de versiones**: [Git](https://git-scm.com/)
- **Herramienta para el arranque de un servidor MySQL**, por ejemplo [XAMPP](https://www.apachefriends.org/index.html)
 
  
## Configuración Inicial

Para configurar la aplicación, sigue estos pasos:

1. **Clonación del repositorio:**
   ```sh
   git clone https://github.com/EvaBarba/TFG_Project.git
 
2. **Acceso al repositorio:**
   ```sh
   cd TFG_Project

3. **Instalación de las dependencias:**
   ```sh
   npm install

4. **Arranque un servidor MySQL**

5. **Creación de la base de datos:**
   ```sh
   sequelize db:create

6. **Configuración de la base de datos:**
   ```sh
   node configureDB.js

7. **Arranque de la aplicación:**
   ```sh
   npm start

## Acceso
**Desde el navegador mediante el puerto 3000:**
```sh
http://localhost:3000

