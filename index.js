import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cyan  from 'colors';
import { info, error, warn } from './logger.js';
import rateLimit from 'express-rate-limit';


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




//Set Timeout function to fetch cat fact
const timeOut = 5000;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello, World!');
});


app.get('/me', async  (req, res) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeOut);
  
  try {
    res.setHeader('Content-Type', 'application/json');
    info('Fetching cat fact from external API...');

    // Fetch cat fact from external API
    const factResponse = await fetch('https://catfact.ninja/fact',
       { signal: controller.signal });

    clearTimeout(timeoutId);
    
    // Handle fetch error
    if (!factResponse.ok) {
      warn(`API responded with status: ${factResponse.status}`);
      return res.status(factResponse.status).json({
        error: `API responded with status: ${factResponse.status}`,
      });
    }


    const factData = await factResponse.json();
    info('Successfully fetched cat fact.');

    // Respond with user info and cat fact
    res.json({
      "status": "success",
      "user": {
        "email": process.env.EMAIL,
        "name": process.env.NAME,
        "stack": process.env.STACK,
      },
      "timestamp": new Date().toISOString(),
      "fact": factData.fact
    })
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      error('Fetch request timed out');
      return res.status(408).json({ error: 'Request timed out' });
    }
    error(`Error fetching cat fact: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.cyan);
});