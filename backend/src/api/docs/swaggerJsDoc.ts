import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    servers: [{ url: '/api/v1' }],
    info: {
      title: 'Issues CRUD REST',
      version: '1.0.0',
    },
  },
  apis: ['./src/api/**/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
