const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const Task = db.Task;

  router.get('/', async (req, res) => {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tasks);
  });

  router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  });

  router.patch('/:id/toggle', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.status = task.status === 'pending' ? 'done' : 'pending';
    await task.save();
    res.json(task);
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.destroy();
    res.status(204).end();
  });

  return router;
};
