import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // ref: 'User',
    required: true,
  },
  serverId: {
    type: Schema.Types.ObjectId,
    ref: 'Server',
    required: true,
  },
}, { timestamps: true });

export default model('Task', taskSchema);
