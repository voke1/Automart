
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import carRoutes from './routes/car_route';
import userRoutes from './routes/user_route';
import orderRoutes from './routes/order_route';
import flagRoutes from './routes/flag_route';
import swaggerDoc from '../swaggerDoc';
import cors from './usingDB/middleware/cors';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors);

app.use('/', userRoutes);
app.use('/', carRoutes);
app.use('/', orderRoutes);
app.use('/', flagRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;
