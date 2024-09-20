# BIBLIOTECA Backend

## Descripción General
El backend de **BIBLIOTECA** es un sistema de gestión diseñado para una biblioteca personal. Ofrece funcionalidades clave para la autenticación de usuarios y la administración de libros, incluyendo el inicio de sesión seguro, la gestión de la colección y la carga de imágenes de portada. Desarrollado con Node.js, Express, MySQL y TypeScript, este sistema facilita la organización y el control de los libros en una biblioteca privada.

## Características

El backend ofrece las siguientes funcionalidades clave:

### 1. **Autenticación de Usuarios**
   - **Inicio de Sesión:** Maneja el inicio de sesión de usuarios, verificando credenciales y creando sesiones de usuario.
   - **Recuperar Datos del Usuario:** Proporciona acceso a los detalles del usuario conectado.

### 2. **Gestión de Libros**
   - **Agregar Nuevos Libros:** Permite la adición de nuevos libros a la colección de la biblioteca.
   - **Actualizar Información del Libro:** Habilita la actualización de detalles de libros existentes.
   - **Eliminar Libros:** Soporta la eliminación de libros de la colección de la biblioteca.
   - **Obtener Todos los Libros:** Recupera una lista de todos los libros en la biblioteca, opcionalmente ordenada por un campo específico (por ejemplo, título, autor, editorial).
   - **Obtener Conteo Total de Libros:** Proporciona el número total de libros en la colección.
   - **Obtener Libros Aleatorios:** Recupera una selección aleatoria de libros basada en un conteo especificado.
   - **Obtener Libros por Ubicación:** Recupera libros organizados por su ubicación dentro de la biblioteca.
   - **Buscar Libros:** Busca libros usando palabras clave en títulos, autores, editoriales, año de publicación y ISBN.
   - **Obtener Libro por ISBN:** Recupera información detallada para un libro específico usando su ISBN.

### 3. **Carga de Portadas de Libros**
   - **Carga de Archivos:** La aplicación soporta la carga de archivos para portadas de libros usando Multer. Esto permite a los usuarios subir imágenes con las siguientes restricciones:
     - **Tipo de Archivo:** Solo imágenes `.jpg` son permitidas.
     - **Límite de Tamaño de Archivo:** Los archivos deben ser de 5MB o menores.
   - **Cómo Funciona:**
     - **Configuración:** Multer está configurado para usar almacenamiento en memoria para el manejo temporal de archivos.
     - **Validación de Archivos:** Solo archivos `.jpg` con el tipo MIME `image/jpeg` son aceptados.
     - **Manejo de Errores:** Si un archivo cargado excede el límite de tamaño o tiene un tipo inválido, la aplicación responde con un mensaje de error específico.
     - **Nombre del Campo:** El nombre del campo para la imagen de portada cargada en el formulario debe ser `cover`.

## Tecnologías

El backend de **BIBLIOTECA** está construido utilizando las siguientes tecnologías modernas:

- **Node.js**: Entorno de ejecución de JavaScript para construir lógica del lado del servidor.
- **Express**: Framework web para Node.js, que simplifica la creación y gestión de APIs.
- **TypeScript**: Superset de JavaScript que proporciona tipado estático y una experiencia de desarrollo mejorada.
- **MySQL**: Base de datos relacional para almacenar y gestionar datos de libros y usuarios.
- **Sequelize**: ORM para MySQL y Node.js, proporcionando una solución basada en esquemas para modelar los datos de la aplicación.
- **bcrypt**: Biblioteca para encriptar contraseñas, asegurando autenticación segura de usuarios.
- **jsonwebtoken**: Para generar y verificar Tokens Web JSON (JWT) para autenticación de usuarios.
- **cors**: Middleware para habilitar el Compartición de Recursos de Origen Cruzado (CORS) para el backend.
- **dotenv**: Carga variables de entorno desde un archivo `.env` en `process.env` para gestionar configuraciones.
- **swagger-jsdoc** & **swagger-ui-express**: Herramientas para generar y mostrar documentación de API.

### Herramientas de Desarrollo

- **nodemon**: Utilidad para reiniciar automáticamente el servidor durante el desarrollo.
- **ts-node**: Motor de ejecución de TypeScript para Node.js, permitiendo que el código TypeScript se ejecute directamente.
- **typescript**: Compilador de TypeScript para convertir código TypeScript en JavaScript.

Estas tecnologías aseguran un backend robusto, escalable y mantenible para el Sistema de Gestión de Bibliotecas.

## Requisitos Previos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos:

- [Node.js](https://nodejs.org/) (Recomendado: Última versión LTS para una estabilidad óptima)
- [MySQL](https://dev.mysql.com/downloads/installer/) (Instalado y funcionando localmente o usa una instancia en la nube)
- [NPM](https://www.npmjs.com/) (Administrador de Paquetes de Node)

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/william-medina/biblioteca-backend-express.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd library-backend-express
    ```

3. **Instala las dependencias:**

    ```bash
    npm install
    ```

4. **Crea un archivo `.env`:**

    Crea un archivo `.env` en la raíz del directorio del proyecto y rellénalo con las variables de entorno necesarias. Aquí tienes una plantilla que puedes usar:

    ```dotenv
    # Cadena de conexión a la base de datos (MySQL)
    DATABASE_URL=mysql://root@localhost:3306/your_database_name

    # Clave secreta para autenticación JWT
    JWT_SECRET=your_jwt_secret_key

    # URL del Backend
    BACKEND_URL=http://localhost:4000

    # URL del Frontend
    FRONTEND_URL=http://localhost:5173
    ```

    Reemplaza los valores de ejemplo con los detalles de tu configuración real.

5. **Inicia el servidor:**

    - **Modo Producción:**

        Para iniciar el servidor en modo producción, usa:

        ```bash
        npm start
        ```

    - **Modo Desarrollo con CORS habilitado:**

        Para iniciar el servidor en modo desarrollo con CORS habilitado, usa:

        ```bash
        npm run dev
        ```

    - **Modo Desarrollo con CORS deshabilitado:**

        Para iniciar el servidor en modo desarrollo con CORS deshabilitado (útil para pruebas locales sin problemas de CORS), usa:

        ```bash
        npm run dev:no-cors
        ```

## TypeScript

Este proyecto está desarrollado usando TypeScript, proporcionando tipado estático y una mejor calidad del código. TypeScript ayuda a detectar errores tempranamente durante el desarrollo y mejora la mantenibilidad. El código está escrito en TypeScript y compilado a JavaScript para su ejecución.

## Arquitectura

El backend para **BIBLIOTECA** sigue la arquitectura **Model-View-Controller (MVC)**:

### 1. **Modelo**

- **Ubicación:** `src/models`
- **Responsabilidades:** Define esquemas de datos (por ejemplo, Libros, Usuarios), gestiona operaciones de base de datos e implementa la lógica de negocio.

### 2. **Vista**

- **Ubicación:** No aplicable directamente; las respuestas de API actúan como la vista.
- **Responsabilidades:** Formatea y envía respuestas JSON para solicitudes de API.

### 3. **Controlador**

- **Ubicación:** `src/controllers`
- **Responsabilidades:** Maneja solicitudes de API, procesa datos a través de modelos y envía respuestas.

## Configuración

La configuración del backend se gestiona a través de variables de entorno. El archivo `.env` debe incluir las siguientes variables:

- `DATABASE_URL`: La cadena de conexión para tu base de datos MySQL.
- `JWT_SECRET`: Clave secreta para autenticación de Tokens Web JSON (JWT).
- `BACKEND_URL`: La URL donde está alojado el servidor backend.
- `FRONTEND_URL`: La URL donde está alojada la aplicación frontend.

## Documentación de la API

La documentación de la API Swagger está disponible en [Swagger UI](http://localhost:4000/api/docs).

**Importante:** Para ver la documentación Swagger, debes ejecutar el servidor con CORS deshabilitado (`npm run dev:no-cors`). Esta configuración es necesaria para acceder a la documentación durante el desarrollo.

**Dominio/Puerto Personalizado:** Si tu servidor está ejecutándose en un dominio o puerto diferente a `localhost:4000`, necesitarás modificar la URL de Swagger UI en consecuencia. Por ejemplo:

- Si tu servidor está en `http://192.168.1.100:3000`, deberías acceder a la documentación en `http://192.168.1.100:3000/api/docs`.
- Si tu servidor está en `http://mydomain.com:5000`, deberías acceder a la documentación en `http://mydomain.com:5000/api/docs`.

**Cómo Acceder:**

1. Determina el dominio y puerto donde se está ejecutando tu servidor.
2. Reemplaza `localhost:4000` en la URL de Swagger UI con el dominio y puerto de tu servidor.
3. Abre tu navegador y navega a la URL actualizada para ver la documentación de la API.

## Rutas de la API

### Rutas de Libros

- **Obtener Conteo Total de Libros**
    - **URL:** `/books/count`
    - **Método:** `GET`
    - **Descripción:** Obtiene el número total de libros en la biblioteca.

- **Obtener Todos los Libros**
    - **URL:** `/books`
    - **Método:** `GET`
    - **Descripción:** Obtiene una lista de todos los libros en la biblioteca. Puedes ordenar por campos específicos usando parámetros de consulta.

- **Obtener Libros Aleatorios**
    - **URL:** `/books/random`
    - **Método:** `GET`
    - **Descripción:** Obtiene una selección aleatoria de libros basada en el número especificado.

- **Obtener Libros por Ubicación**
    - **URL:** `/books/location/:location`
    - **Método:** `GET`
    - **Descripción:** Obtiene libros organizados por su ubicación dentro de la biblioteca.

- **Buscar Libros**
    - **URL:** `/books/search`
    - **Método:** `GET`
    - **Descripción:** Busca libros usando palabras clave en varios campos.

- **Obtener Libro por ISBN**
    - **URL:** `/books/:isbn`
    - **Método:** `GET`
    - **Descripción:** Obtiene información detallada para un libro específico usando su ISBN.

- **Agregar Nuevo Libro**
    - **URL:** `/books`
    - **Método:** `POST`
    - **Descripción:** Agrega un nuevo libro a la colección.

- **Actualizar Información del Libro**
    - **URL:** `/books/:id`
    - **Método:** `PUT`
    - **Descripción:** Actualiza los detalles de un libro existente.

- **Eliminar Libro**
    - **URL:** `/books/:id`
    - **Método:** `DELETE`
    - **Descripción:** Elimina un libro de la colección.

### Rutas de Autenticación

- **Iniciar Sesión**
    - **URL:** `/auth/login`
    - **Método:** `POST`
    - **Descripción:** Maneja el inicio de sesión de usuarios y devuelve un JWT para la autenticación de sesiones.

- **Recuperar Datos del Usuario**
    - **URL:** `/auth/me`
    - **Método:** `GET`
    - **Descripción:** Recupera los detalles del usuario autenticado.

### Middleware

- **Middleware: authenticate**
    - **Descripción:** Protege las rutas exigiendo un token JWT válido para el acceso.

- **Middleware: handleInputErrors**
    - **Descripción:** Maneja y devuelve errores de validación provenientes de las entradas de la solicitud.

- **Middleware: upload**
    - **Descripción:** Gestiona las cargas de archivos con Multer, configurado para manejar archivos de imagen.

- **Middleware: handleMulterErrors**
    - **Descripción:** Procesa y responde a errores relacionados con Multer, incluyendo límites de tamaño de archivo y tipos de archivo inválidos.

## Autor

Esta aplicación backend para **BIBLIOTECA** es desarrollada y mantenida por:

**William Medina**

¡Gracias por revisar **BIBLIOTECA**!