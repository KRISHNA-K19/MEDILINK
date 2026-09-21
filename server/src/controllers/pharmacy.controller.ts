import { Request, Response, NextFunction } from 'express';

export const getPharmacyInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sampleInventory = [
      {
        id: 'm1111111-1111-1111-1111-111111111111',
        name: 'Paracetamol 500mg',
        generic_name: 'Paracetamol / Acetaminophen',
        category: 'Analgesic',
        requires_prescription: false,
        availability: 'AVAILABLE',
        internal_stock_qty: 120,
      },
      {
        id: 'm2222222-2222-2222-2222-222222222222',
        name: 'Amoxicillin 500mg Capsules',
        generic_name: 'Amoxicillin Trihydrate',
        category: 'Antibiotics',
        requires_prescription: true,
        availability: 'LIMITED',
        internal_stock_qty: 15,
      },
    ];

    return res.status(200).json({
      success: true,
      data: sampleInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const approveReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: 'Reservation approved.',
      data: { id, status: 'APPROVED' },
    });
  } catch (error) {
    next(error);
  }
};

export const rejectReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    return res.status(200).json({
      success: true,
      message: 'Reservation rejected.',
      data: { id, status: 'REJECTED', reason },
    });
  } catch (error) {
    next(error);
  }
};
