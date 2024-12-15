const mongoose = require("mongoose");
const { Schema } = mongoose;

const workerSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        role: { type: String, default: "worker", enum: ["worker"], required: true },
        job_role: { type: String, required: true, trim: true },
        ph_no: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        department: { type: String, required: true, trim: true },
        points: { type: Number, default: 0 },
        profile: { type: String, trim: true },
        company_id: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Worker", workerSchema);
