"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    info: {
        title: 'Break&Focus API',
        version: '1.0.0',
        description: 'API Documentation for Break&Focus Backend',
    },
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    baseDir: __dirname,
    filesPattern: ['../entity.users/routes.ts'],
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};
