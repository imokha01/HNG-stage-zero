import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cyan  from 'colors';
import { info } from './utils/logger.js';
import rateLimit from 'express-rate-limit';
import userRoutes from './routers/router.js';


dotenv.config();

const app = express();
const PORT = 3000;

//Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(limiter);

//CORS Middleware 
app.use(cors())

app.use((req, res, next) => {
  // Log incoming requests
  info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/', userRoutes); 




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.cyan);
});