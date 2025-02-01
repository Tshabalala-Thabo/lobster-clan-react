import express from 'express';
import { createReservation, checkAvailability } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/reserve', createReservation);
router.post('/check-availability', checkAvailability);


export default router; 