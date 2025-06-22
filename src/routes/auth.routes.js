const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

/**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Endpoints for user authentication
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User Created
 *       400:
 *         description: Validation Error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token of user to authenticate
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token to avoid login again
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh JWT access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token
 *       401:
 *         description: Missing refresh token
 *       403:
 *         description: Invalid refresh token
 */
router.post('/refresh', authController.refresh);

router.get('/profile', authenticateToken, authController.profile);

module.exports = router;