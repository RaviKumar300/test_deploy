const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

// @desc    Get all employees (supports ?sortBy=&order=)
// @route   GET /api/employees
const getEmployees = asyncHandler(async (req, res) => {
  const { sortBy = 'createdAt', order = 'asc' } = req.query;
  const allowedFields = ['name', 'email', 'department', 'salary', 'createdAt'];
  const field = allowedFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order === 'desc' ? -1 : 1;

  const employees = await Employee.find().sort({ [field]: sortOrder });
  res.status(200).json(employees);
});

// @desc    Create employee
// @route   POST /api/employees
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, department, salary } = req.body;

  if (!name || !email || !department || salary === undefined) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const employee = await Employee.create({ name, email, department, salary });
  res.status(201).json(employee);
});

// @desc    Update employee
// @route   PUT /api/employees/:id
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updated);
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  await employee.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };