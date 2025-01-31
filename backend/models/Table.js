import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableId: {
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
});

const Table = mongoose.model('Table', tableSchema);

export default Table;