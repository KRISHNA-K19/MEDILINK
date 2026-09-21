import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400, 'VALIDATION_ERROR');
    }

    // Role detection based on demo accounts or DB query
    let role = 'PATIENT';
    let fullName = 'Sarah Jenkins';

    if (email.includes('admin')) {
      role = 'ADMIN';
      fullName = 'MediLink System Admin';
    } else if (email.includes('apollo') || email.includes('medplus') || email.includes('pharmacy')) {
      role = 'PHARMACY';
      fullName = 'Apollo Community Pharmacy Lead';
    }

    if (email.includes('suspended')) {
      throw new AppError('Account is currently suspended. Please contact platform administration.', 403, 'ACCOUNT_SUSPENDED');
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: '55555555-5555-5555-5555-555555555555',
          email,
          full_name: fullName,
          role,
          account_status: 'ACTIVE',
        },
        session: {
          access_token: 'mock-jwt-access-token-medilink-2026',
          expires_in: 3600,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, fullName, email, password } = req.body;

    if (role === 'ADMIN') {
      throw new AppError('Admin account creation via public registration is prohibited.', 403, 'FORBIDDEN');
    }

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: `u-${Date.now()}`,
          email,
          full_name: fullName,
          role: role || 'PATIENT',
          account_status: 'ACTIVE',
        },
        session: {
          access_token: 'mock-jwt-access-token-medilink-2026',
          expires_in: 3600,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        id: '55555555-5555-5555-5555-555555555555',
        email: 'patient@demo.medilink.local',
        full_name: 'Sarah Jenkins',
        role: 'PATIENT',
        account_status: 'ACTIVE',
      },
    });
  } catch (error) {
    next(error);
  }
};
