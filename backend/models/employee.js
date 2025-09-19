const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    access_level: {
      type: Number,
      required: true,
    },
    request_time: {
      type: String,
      required: true,
    }, 
    room:
     {
         type: String, 
         required: true
         },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
