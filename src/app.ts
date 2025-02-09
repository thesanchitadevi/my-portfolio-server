// Code for the app
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parse application/json
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Routes
app.use('/api', router);

const getController = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Tech Blog Server',
  });
};

app.get('/', getController);

// Error handling
app.use(globalErrorHandler);

// Not found
app.use(notFound);

export default app;
