const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    department: { type: String, required: [true, 'Department is required'], trim: true },
    salary: { type: Number, required: [true, 'Salary is required'], min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);