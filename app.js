/* jshint esversion: 6 */

import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// Set up the express app
const app = express();
// Set up Swagger docs

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});