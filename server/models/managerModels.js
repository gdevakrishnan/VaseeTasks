const mongoose = require("mongoose");
const { Schema } = mongoose;

const managerSchema = new Schema(
    {
        username: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        company_name: { type: String, required: true, trim: true },
        company_address: { type: String, required: true, trim: true },
        company_id: { type: String, required: true, unique: true },
        phNo: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        role: { type: String, enum: ["admin", "manager", "worker"], default: "manager" }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Manager", managerSchema);
