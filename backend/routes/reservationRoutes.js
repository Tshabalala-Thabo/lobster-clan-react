import express from 'express';
import { submitReservation, checkAvailability } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/check-availability', checkAvailability);
router.post('/submit-reservation', submitReservation);



export default router; 