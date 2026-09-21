import { Router } from 'express';
import { createReservation, getPatientReservations, cancelReservation } from '../controllers/patient.controller.js';

const router = Router();

router.post('/patient/reservations', createReservation);
router.get('/patient/reservations', getPatientReservations);
router.post('/patient/reservations/:id/cancel', cancelReservation);

export default router;
