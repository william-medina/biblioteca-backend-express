import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import path from 'path';

const app = express();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'BIBLIOTECA API',
        version: '1.0.0',
        description: 'API documentation for the Biblioteca APP',
    },
    servers: [
        {
            url: process.env.BACKEND_URL + '/api',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Please provide your JWT in the following format: Bearer <token>.'
            }
        }
    },
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.ts')],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar {
            background-color: black;
        }
        
        .topbar-wrapper .link {
            content: url('${process.env.BACKEND_URL}/api/icons/logo.png');
            height: 50px;
            width: 50px;
            max-width: 50px !important;
            background-color: black;
        }
        .title {
            color: black !important;
        }
    `,
    customfavIcon: `${process.env.BACKEND_URL}/api/icons/logo.png`,
    customSiteTitle: 'Biblioteca Api Docs'
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default app;