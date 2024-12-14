const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  sent_by: { type: String, enum: ["Manager", "Worker"], required: true },
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);
