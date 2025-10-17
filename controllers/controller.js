import { info, error, warn } from '../utils/logger.js'; 
import dotenv from 'dotenv';

dotenv.config();

// Timeout constant
const timeOut = 5000;



export const test = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello, World!');
};


export const getUserInfo = async (req, res) => {
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
};
