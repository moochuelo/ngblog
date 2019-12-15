# NgBlog

NgBlog es un pequeño pero robusto blogs construido con Angular 8, Firebase, Angular Material, Cree, modere y administre publicaciones de blog y más con esta aplicación web.

## Especificaciones

* Lenguaje/s usado/s: Html, Css, Sass, Javascript, Typescript
* Framework/s usado/s: Angular 8, Angular Material
* Base de datos no relacional: Firebase Cloud Firestore
* Plataforma de desarrollo: Firebase
* Módulos principales: Material, FlexLayout, AngularFire, AngularFirestore, AngularFireStorage, AngularFireAuth


## Demo

* Eche un vistazo a la aplicación de front-end: https://ngblog-59778.web.app/home
* Detalles de inicio de sesión como Admin: admin@admin.com / andreake007
* Usted puede registrarse libremente, se le asignara un role de editor.
* Como editor solo puede Publicar, Editar y Eliminar tus Post, Tus post se publicaran solo cuando el admin los autorize.


## Instalacion

Install [Angular CLI](https://cli.angular.io/)
```
npm install -g @angular/cli
```

Install NPM packages

```
Run `npm install` or `yarn install`
cd functions/
Run `npm install`
```

## Firebase setup

Puede correr este proyecto con una cuenta predeterminada que se a creado.
```
Run `firebase login` 
Inicie sesion angular.test.octopus.firebase@gmail.com / andreake007*

```
o Puede cofigurar su propia cuenta 

Cree una [Cuenta de Firebase](https://firebase.google.com/), cree un nuevo proyecto y copie el código de configuración para su proyecto.

Habilite Google, Correo electrónico / Contraseña y Anónimo en la pestaña 'Método de inicio de sesión' de la sección Autenticación en la consola de su proyecto Firebase.

Dentro de la carpeta del proyecto, ejecute:

```
cd src
mkdir environments
cd environments
touch environment.ts
touch environment.prod.ts
```

Abra 'environment.ts' y agregue su configuración de Firebase de la siguiente manera:

```javascript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "xxxx",
    authDomain: "xxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx"
  }
};
```

Abra 'environment.prod.ts' y agregue su configuración de Firebase de la siguiente manera:

```javascript
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "xxxx",
    authDomain: "xxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx"
  }
};
```

## Servidor de desarrollo

Ejecute `ng serve` para un servidor de desarrollo. La aplicación se volverá a cargar automáticamente si cambia alguno de los archivos de origen.

Navegue a `http://localhost: 4200/` para acceder al front end.

Navegue a `http://localhost:4200/login` para acceder a la página de inicio de sesión.

Navegue a `http://localhost:4200/registro` para acceder a la página de registro de usuarios.


## Create Admin Account

Deberá agregar manualmente su primera cuenta de administrador.

1) Abrar src/app/shared/services/auth.service.ts linea 47 y cambien el role editor por admin:

```javascript
   roles: {
      admin: true
   }
```

2) Crear un usuario de modo abitual, dirijase a la ruta `http://localhost:4200/registro`

```
input.email="Correo Electronico" input.password="Contraseña"
```

3) Vuelva abrir src/app/shared/services/auth.service.ts y cambie el role admin por editor para futuros registros de usuarios

```javascript
   roles: {
      editor: true
   }
```

## Code scaffolding

Ejecute `ng g c component-name` para generar un nuevo componente. También puede usar `ng generate directive | pipe | service | class | module`.

## Build

Ejecute `ng build` para compilar el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist /`. Use el indicador `-prod` para una compilación de producción.

## Deploy

Ejecute `npm run deploy` para implementar su proyecto. Este comando primero compilará la aplicación para producción y luego la implementará en el alojamiento de Firebase.

## Admin Roles

Hay 2 Roles de usuarios:
* admin
* editor

| Permisos                               | admin       | editor      |
| ---------------------------------------|:-----------:|:-----------:|
| Crear nuevos post                      | ✓           | ✓           |
| Editar post                            | ✓           | ✓           |
| Eliminar post                          | ✓           | ✓           |
| Enviar post para aprobacion            | ×           | ✓           |
| Editar post de otro usuarios           | ✓           | ×           |
| Eliminar post de otros usuarios        | ✓           | ×           |
| Estados de post de otros usuarios      | ✓           | ×           |
| Enviar Comentarios                     | ✓           | ✓           |
| Puntuar post                           | ✓           | ✓           |


