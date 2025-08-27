import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routers';
import {errorHandler}  from './middleware/errorHandler';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api', routes);
  app.use(errorHandler);
  return app;
};
