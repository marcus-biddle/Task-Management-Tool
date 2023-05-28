import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
    {
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
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
        serverId: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)

export default model("Task", taskSchema);