const mongoose = require("mongoose");

const DirManager = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "Takes the directory name"
  },
  type: {
    type: String,
    enum: ["file", "folder"],
    required: true,
    description: 'Captures the directory type'
  },
  path: {
    type: String,
    description: 'Attaching the local file path'
  },
  level: {
    type: String,
    default: 'root',
    description: 'Directory level eigther root or directory parent ID'
  },
//   subdirectories: [
//     { type: String, description: "Storing all the subdirectories IDs"}
//   ],
});

module.exports = mongoose.model('Dirmanager', DirManager);