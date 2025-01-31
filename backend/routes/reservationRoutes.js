import express from 'express';
import { createReservation } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/reserve', createReservation);

export default router; 