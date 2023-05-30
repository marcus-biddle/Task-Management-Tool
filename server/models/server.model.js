import { model, Schema } from 'mongoose';

const serverSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Server = model('Server', serverSchema);

export default Server;