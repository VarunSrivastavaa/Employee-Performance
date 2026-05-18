const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    if (!name || !email || !department || performanceScore === undefined || experience === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists.' });
    }

    const newEmployee = new Employee({
      name, email, department, skills, performanceScore, experience
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee stored successfully', employee: newEmployee });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchEmployee = async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) {
      query.department = { $regex: new RegExp(department, "i") };
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
