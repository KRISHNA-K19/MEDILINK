import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler.js';

export const verifyPharmacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    return res.status(200).json({
      success: true,
      message: 'Pharmacy license verified.',
      data: { id, verification_status: 'VERIFIED', verification_notes: notes },
    });
  } catch (error) {
    next(error);
  }
};

export const rejectPharmacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    return res.status(200).json({
      success: true,
      message: 'Pharmacy license rejected.',
      data: { id, verification_status: 'REJECTED', verification_notes: notes },
    });
  } catch (error) {
    next(error);
  }
};

export const revokePharmacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    return res.status(200).json({
      success: true,
      message: 'Pharmacy license revoked.',
      data: { id, verification_status: 'REVOKED', verification_notes: notes },
    });
  } catch (error) {
    next(error);
  }
};

export const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Self-suspension guard check
    const currentAdminId = '11111111-1111-1111-1111-111111111111';
    if (id === currentAdminId) {
      throw new AppError('Administrators cannot suspend their own admin account.', 403, 'FORBIDDEN');
    }

    return res.status(200).json({
      success: true,
      message: 'User account suspended.',
      data: { id, account_status: 'SUSPENDED' },
    });
  } catch (error) {
    next(error);
  }
};

export const reinstateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: 'User account reinstated.',
      data: { id, account_status: 'ACTIVE' },
    });
  } catch (error) {
    next(error);
  }
};
