const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rank: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model("Worker", workerSchema);
