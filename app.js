/* jshint esversion: 6 */

import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// Set up the express app
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Set up Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});