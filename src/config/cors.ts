import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  
  origin: function (origin, callback) {
    
    const whitelist = [process.env.FRONTEND_URL];

    if (process.env.NODE_ENV !== 'production') {
      whitelist.push(undefined);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed. Whitelist: ${whitelist}`);
      callback(new Error('Error de CORS: Origen no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Si usas tokens en headers
};