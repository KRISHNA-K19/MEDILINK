import { Request, Response, NextFunction } from 'express';
import { isSupabaseConfigured } from '../config/supabase.js';

export const getHealthStatus = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const environment = process.env.NODE_ENV || 'development';
    const timestamp = new Date().toISOString();

    return res.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        service: 'medilink-api',
        environment,
        databaseConfigured: isSupabaseConfigured(),
        timestamp,
      },
    });
  } catch (error) {
    next(error);
  }
};
