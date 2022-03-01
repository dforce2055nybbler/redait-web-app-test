# Red Argentina IT

&#x200B;

## Dependencias agregadas

- bootstrap
- debounce
- deepmerge
- gatsby-plugin-s3
- gatsby-plugin-sass
- gatsby-plugin-web-font-loader
- gatsby-source-strapi
- react-bootstrap
- react-icons
- react-select
- sass

Se pueden instalar todas juntas, en caso de ser necesario, con:

```yarn add gatsby-plugin-s3 gatsby-source-strapi react-bootstrap sass bootstrap gatsby-plugin-sass gatsby-plugin-web-font-loader react-icons debounce react-select deepmerge```

&#x200B;

## Guía de uso

1. Al descargar el código, instalar dependencias:

    ```yarn install```

2. Luego, se puede levantar un entorno local para probar nuestros cambios:

    ```yarn run develop```

&#x200B;

## Actualización de la web

Mientras no exista un pipeline de CI/CD, para que los cambios realizados en este código impacten en la web, es necesario:

1. Compilar el código:

    ```yarn build```

2. Eliminar todo archivo del bucket de S3:

    ```aws s3 rm --recursive s3://redait-test-frontend```

3. Subir el nuevo código compilado a S3:

    ```aws s3 cp --recursive public/ s3://redait-test-frontend/```

4. Controlar cómo se ven los cambios realizados ingresando a [https://redait.cloudspaceclient.com/](https://redait.cloudspaceclient.com/) _(ingresar en modo incógnito y deshabilitar el uso de caché para la sesión, evitando así toda posibilidad de estar viendo contenido cacheado localmente)_.
