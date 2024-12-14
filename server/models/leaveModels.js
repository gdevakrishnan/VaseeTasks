const { Schema, default: mongoose } = require("mongoose");

const leaveRequestSchema = new Schema({
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leave_type: { type: String, enum: ["Casual", "Sick", "Other"], required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  reason: { type: String },
}, {timestamps: true});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
