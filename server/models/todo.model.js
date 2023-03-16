import { model, Schema } from 'mongoose';

const todoSchema = new Schema(
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
        }
    },
    { timestamps: true }
)

export default model("Todo", todoSchema);