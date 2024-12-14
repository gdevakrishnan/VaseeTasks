const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Manager", "Worker"], required: true },
  unique_id: { type: String, unique: true, sparse: true }, // Only for managers
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  department: { type: String }, // Only for workers
  points: { type: Number, default: 0 } // Only for workers
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
