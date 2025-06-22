const Task = require('../models/task.model');

exports.getTasks = async () => {
  return await Task.find().select('title description responsible completed').sort({ createdAt: -1 });
};

exports.createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

exports.completeTask = async (id) => {
  return await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};