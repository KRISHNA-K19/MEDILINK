import { Request, Response, NextFunction } from 'express';

const sampleMedicines = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    name: 'Paracetamol 500mg',
    generic_name: 'Paracetamol / Acetaminophen',
    category: 'Analgesic',
    requires_prescription: false,
    availability: 'AVAILABLE',
    pharmacy_name: 'Apollo Community Pharmacy',
    city: 'Chennai',
    address: '104 Healthcare Boulevard',
    verification_status: 'VERIFIED',
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    name: 'Amoxicillin 500mg Capsules',
    generic_name: 'Amoxicillin Trihydrate',
    category: 'Antibiotics',
    requires_prescription: true,
    availability: 'LIMITED',
    pharmacy_name: 'Apollo Community Pharmacy',
    city: 'Chennai',
    address: '104 Healthcare Boulevard',
    verification_status: 'VERIFIED',
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Metformin 850mg Tablets',
    generic_name: 'Metformin Hydrochloride',
    category: 'Diabetes Care',
    requires_prescription: true,
    availability: 'AVAILABLE',
    pharmacy_name: 'MedPlus Wellness Pharmacy',
    city: 'Bengaluru',
    address: '55 Park Street, Sector 4',
    verification_status: 'VERIFIED',
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    name: 'Atorvastatin 20mg Tablets',
    generic_name: 'Atorvastatin Calcium',
    category: 'Cardiology',
    requires_prescription: true,
    availability: 'UNAVAILABLE',
    pharmacy_name: 'MedPlus Wellness Pharmacy',
    city: 'Bengaluru',
    address: '55 Park Street, Sector 4',
    verification_status: 'VERIFIED',
  },
  {
    id: 'c5555555-5555-5555-5555-555555555555',
    name: 'Cetirizine 10mg Allergy Relief',
    generic_name: 'Cetirizine Hydrochloride',
    category: 'Allergy',
    requires_prescription: false,
    availability: 'AVAILABLE',
    pharmacy_name: 'Apollo Community Pharmacy',
    city: 'Chennai',
    address: '104 Healthcare Boulevard',
    verification_status: 'VERIFIED',
  },
];

export const searchMedicines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = ((req.query.q as string) || '').toLowerCase();
    const availability = (req.query.availability as string) || 'ALL';
    const prescription = req.query.prescription === 'true';
    const category = (req.query.category as string) || 'All';

    let results = sampleMedicines.filter((m) => m.verification_status === 'VERIFIED');

    if (q) {
      results = results.filter(
        (m) => m.name.toLowerCase().includes(q) || m.generic_name.toLowerCase().includes(q)
      );
    }

    if (availability !== 'ALL') {
      results = results.filter((m) => m.availability === availability);
    }

    if (prescription) {
      results = results.filter((m) => m.requires_prescription === true);
    }

    if (category !== 'All') {
      results = results.filter((m) => m.category === category);
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicineById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const medicine = sampleMedicines.find((m) => m.id === id) || sampleMedicines[0];

    return res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    next(error);
  }
};
