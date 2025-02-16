import mongoose from 'mongoose';

const tableLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure location names are unique
  },
});

const TableLocation = mongoose.model('TableLocation', tableLocationSchema);

export default TableLocation;