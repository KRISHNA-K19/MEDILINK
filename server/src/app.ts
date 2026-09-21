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

// CORS configuration
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
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
