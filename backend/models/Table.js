import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  canCombine: {
    type: Boolean,
    default: true,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TableLocation',
    required: false, 
  },
});

const Table = mongoose.model('Table', tableSchema);

export default Table;