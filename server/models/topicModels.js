const { Schema, default: mongoose } = require("mongoose");

const topicSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Topic", topicSchema);
