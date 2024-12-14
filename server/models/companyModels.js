const { Schema, default: mongoose } = require("mongoose");

const companySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ph_no: { type: Number, required: true },
  ph_code: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model("Company", companySchema);
