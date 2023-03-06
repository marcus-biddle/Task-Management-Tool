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
        status: {
            type: Boolean,
            required: true,
        },
        limit: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model("Todo", todoSchema);