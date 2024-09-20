
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'william@example.com'
 *               password:
 *                 type: string
 *                 example: 'Password123'
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'jwtTokenHere'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Usuario no registrado'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.post('/login',
    body('email')
        .isEmail().withMessage('Email no válido')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.login
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current user's details
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *       401:
 *         description: Unauthorized, invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'unauthorized'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/me',
    authenticate,
    AuthController.getCurrentUser
);


router.post('/update-password',
    authenticate,
    body('email')
        .isEmail().withMessage('Email no válido')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.updatePassword
);

export default router;