import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

export default User;
