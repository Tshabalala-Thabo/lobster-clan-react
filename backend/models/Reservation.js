import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  guests: { type: Number, required: true },
  tableIds: { type: [String], required: true },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation; 