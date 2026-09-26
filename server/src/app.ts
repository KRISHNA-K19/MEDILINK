import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import medicineRoutes from './routes/medicine.routes.js';
import patientRoutes from './routes/patient.routes.js';
import pharmacyRoutes from './routes/pharmacy.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Express = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration - Allow local dev, Vercel deployments, and configured CLIENT_ORIGIN
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const clientOrigin = process.env.CLIENT_ORIGIN;
      if (
        origin === 'http://localhost:5173' ||
        origin === 'http://localhost:3000' ||
        (clientOrigin && origin === clientOrigin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Welcome Endpoint
app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'MediLink REST API',
    version: '1.0.0',
    status: 'active',
    tagline: 'Find. Reserve. Collect.',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      medicines: '/api/medicines/*',
      patient: '/api/patient/*',
      pharmacy: '/api/pharmacy/*',
      admin: '/api/admin/*',
    },
    repository: 'https://github.com/KRISHNA-K19/MEDILINK.git',
  });
});

// API Route Registration
app.use('/api', healthRoutes);
app.use('/api', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api', patientRoutes);
app.use('/api', pharmacyRoutes);
app.use('/api', adminRoutes);

// Centralized error handling
app.use(errorHandler);

export default app;
