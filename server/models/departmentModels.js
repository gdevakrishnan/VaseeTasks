const { Schema, default: mongoose } = require("mongoose");

const departmentSchema = new Schema({
  name: { type: String, required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
}, {timestamps: true});

module.exports = mongoose.model("Department", departmentSchema);
