const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Prueba Técnica Susana Santos Moreno',
            version: '1.0.0',
            description: 'API de gestión de tareas'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }, schemas: {
                User: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: { type: 'string', example: 'admin' },
                        password: { type: 'string', example: 'sndfknfdl234' }
                    }
                },
                Task: {
                    type: 'object',
                    required: [ 'title', 'description', 'responsible' ],
                    properties: {
                        id: { type: 'string', example: '664f7b2a6e2a0e4791234567' },
                        title: { type: 'string', example: 'task title' },
                        description: { type: 'string', example: 'task example description' },
                        responsible: { type: 'string', example: 'admin' },
                        completed: { type: 'boolean', example: false }
                    }
                },
                TaskInput: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: { type: 'string', example: 'title example' },
                        description: { type: 'string', example: 'title example description' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;