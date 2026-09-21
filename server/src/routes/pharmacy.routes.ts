import { Router } from 'express';
import { getPharmacyInventory, approveReservation, rejectReservation } from '../controllers/pharmacy.controller.js';

const router = Router();

router.get('/pharmacy/medicines', getPharmacyInventory);
router.post('/pharmacy/reservations/:id/approve', approveReservation);
router.post('/pharmacy/reservations/:id/reject', rejectReservation);

export default router;
