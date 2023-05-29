import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

export default User;
