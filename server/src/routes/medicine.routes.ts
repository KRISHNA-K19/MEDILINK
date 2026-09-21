import { Router } from 'express';
import { searchMedicines, getMedicineById } from '../controllers/medicine.controller.js';

const router = Router();

router.get('/medicines/search', searchMedicines);
router.get('/medicines/:id', getMedicineById);

export default router;
