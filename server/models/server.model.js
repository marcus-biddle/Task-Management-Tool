import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Server = mongoose.model('Server', serverSchema);

export default Server;