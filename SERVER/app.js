
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import carRoutes from './routes/car_route';
import userRoutes from './routes/user_route';
import orderRoutes from './routes/order_route';
import cloudinaryRoutes from "./routes/cloudinary_route";
import flagRoutes from "./routes/flag_route";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', cloudinaryRoutes);
app.use('/', userRoutes);
app.use('/', carRoutes);
app.use('/', orderRoutes);
app.use('/', flagRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;
