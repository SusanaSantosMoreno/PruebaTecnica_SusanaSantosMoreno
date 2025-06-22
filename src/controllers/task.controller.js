const { validationResult } = require('express-validator');

const taskService = require('../services/task.service');
const utilsHelper = require('../utils/utils')

exports.list = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      responsible: req.user.username 
    };

    const task = await taskService.createTask(data);
    res.status(201).json(utilsHelper.cleanTask(task));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.complete = async (req, res) => {
  try {
    const updated = await taskService.completeTask(req.params.id);
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(utilsHelper.cleanTask(updated));
  } catch (err) { res.status(400).json({ error: err.message }) }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) { res.status(400).json({ error: err.message }) }
};