import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  active: { type: Boolean, default: true },
});

const Server = mongoose.model('Server', serverSchema);

export default Server;