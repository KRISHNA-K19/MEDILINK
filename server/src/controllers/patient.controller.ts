import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler.js';

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { medicine_id, pharmacy_id } = req.body;

    const reservationNumber = `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    return res.status(201).json({
      success: true,
      data: {
        id: `res-${Date.now()}`,
        reservation_number: reservationNumber,
        medicine_id,
        pharmacy_id,
        status: 'PENDING',
        expires_at: expiresAt,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = (req.query.status as string) || 'ALL';

    const sampleReservations = [
      {
        id: 'r1111111-1111-1111-1111-111111111111',
        reservation_number: 'RES-2026-8801',
        medicine_name: 'Paracetamol 500mg',
        pharmacy_name: 'Apollo Community Pharmacy',
        status: 'APPROVED',
        requires_prescription: false,
        expires_at: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      },
      {
        id: 'r2222222-2222-2222-2222-222222222222',
        reservation_number: 'RES-2026-8802',
        medicine_name: 'Amoxicillin 500mg Capsules',
        pharmacy_name: 'Apollo Community Pharmacy',
        status: 'PENDING',
        requires_prescription: true,
        expires_at: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ];

    let filtered = sampleReservations;
    if (status !== 'ALL') {
      filtered = sampleReservations.filter((r) => r.status === status);
    }

    return res.status(200).json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully.',
      data: {
        id,
        status: 'CANCELLED',
      },
    });
  } catch (error) {
    next(error);
  }
};
