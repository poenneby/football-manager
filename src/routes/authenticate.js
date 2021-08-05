/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username.
 *         password:
 *           type: string
 *           description: The password.
 *       example:
 *         username: joe
 *         password: letmein
 *
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authenticate to get access to resources.
 */
import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();

const accessTokenSecret = "youraccesstokensecret";

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate to retrieve an access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 */
router.post("/", function (req, res) {
  const { username, password } = req.body;

  // Only Joe can access this application
  const user = username === "joe" &&
    password === "letmein" && { username: "joe", role: "manager" };

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

export default router;
