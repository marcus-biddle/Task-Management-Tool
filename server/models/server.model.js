import { model, Schema } from 'mongoose';

const serverSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        tasks: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        }
    },
    { timestamps: true }
)

export default model("Server", serverSchema);