import { Router } from 'express';
import {
  verifyPharmacy,
  rejectPharmacy,
  revokePharmacy,
  suspendUser,
  reinstateUser,
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/admin/pharmacies/:id/verify', verifyPharmacy);
router.post('/admin/pharmacies/:id/reject', rejectPharmacy);
router.post('/admin/pharmacies/:id/revoke', revokePharmacy);
router.post('/admin/users/:id/suspend', suspendUser);
router.post('/admin/users/:id/reinstate', reinstateUser);

export default router;
