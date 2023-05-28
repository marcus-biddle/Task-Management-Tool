import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  editing: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  serverId: {
    type: Schema.Types.ObjectId,
    ref: 'Server',
    required: true,
  },
}, { timestamps: true });

export default model('Task', taskSchema);
