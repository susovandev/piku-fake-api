import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Piku Fake Api',
      version: '1.0.0',
      description: 'API Documentation for Piku Fake Api',
    },
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
