const { Schema, default: mongoose } = require("mongoose");

const taskSchema = new Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  points_awarded: { type: Number, default: 0 },
  due_date: { type: Date, required: true }
}, {timestamps: true});

module.exports = mongoose.model("Task", taskSchema);
