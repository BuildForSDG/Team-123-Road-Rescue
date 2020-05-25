import { Router } from 'express';
import userRoute from './user.route';

const routes = Router();


routes.use('/', userRoute);

export default routes;
