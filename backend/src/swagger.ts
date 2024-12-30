import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Online Shop API',
        version: '1.0.0',
        description: 'API documentation for the Online Shop application',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
};

const options: Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Adjust this path to match your project structure
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
