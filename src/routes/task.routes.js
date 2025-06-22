const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { authenticateToken } = require('../middlewares/auth.middleware');

const taskController = require('../controllers/task.controller');

/**
   * @swagger
   * tags:
   *   name: Tasks
   *   description: Endpoints for task CRUD
*/

const validateTask = [ body('title').notEmpty().withMessage('Title is required') ];

/**
 * @swagger
 * /api/task/:
 *   get:
 *     tags: [Tasks]
 *     summary: Task list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', authenticateToken, taskController.list);

/**
 * @swagger
 * /api/task/:
 *   post:
 *     tags: [Tasks]
 *     summary: Create new Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/', authenticateToken, validateTask, taskController.create);

/**
 * @swagger
 * /api/task/{id}/complete:
 *   patch:
 *     tags: [Tasks]
 *     summary: Mark a task as completed
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.patch('/:id/complete',  authenticateToken, taskController.complete);


/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', authenticateToken, taskController.remove);

module.exports = router;