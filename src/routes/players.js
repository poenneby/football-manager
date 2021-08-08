/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - name
 *         - nationality
 *         - preferredFoot
 *         - dateOfBirth
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the player.
 *         name:
 *           type: string
 *           description: The full name of the player.
 *         nationality:
 *           type: string
 *           description: The player country of origin
 *         preferredFoot:
 *           type: string
 *           description: The player preferred foot
 *         dateOfBirth:
 *           type: string
 *           description: The player date of birth
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *       example:
 *         name: Adam Lundqvist
 *         nationality: Sweden
 *         preferredFoot: Left
 *         dateOfBirth: 1994-03-20
 *
 * tags:
 *   name: Players
 *   description: API to manage football players.
 */

import { Router } from "express";
const router = Router();

import authenticateJWT from "../middlewares/authentication";

import playerService from "../services/playerService.js";

/**
 * @swagger
 * /players:
 *    get:
 *      summary: Lists all the players
 *      tags: [Players]
 *      security:
 *	      - jwt: []
 *      responses:
 *        "200":
 *          description: The list of players.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Player'
 *        "401":
 *          description: Unauthorized request.
 */
router.get("/", authenticateJWT, async function (req, res) {
  const players = await playerService.getAllPlayers();
  res.status(200).json(players);
});

/**
 * @swagger
 * /players/{id}:
 *    get:
 *      summary: Gets a player by id
 *      tags: [Players]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The player id
 *      security:
 *	      - jwt: []
 *      responses:
 *        "200":
 *          description: The player.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Player'
 *        "404":
 *          description: Player not found.
 *        "401":
 *          description: Unauthorized request.
 */
router.get("/:id", authenticateJWT, async function (req, res) {
  const player = await playerService.getPlayerById(req.params.id);
  player ? res.status(200).json(player) : res.sendStatus(404);
});

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Creates a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     security:
 *	     - jwt: []
 *     responses:
 *       "200":
 *         description: The created player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       "401":
 *         description: Unauthorized request.
 *
 */
router.post("/", authenticateJWT, async function (req, res) {
  const { name, nationality, dateOfBirth, preferredFoot } = req.body;

  let player = {
    name,
    nationality,
    dateOfBirth,
    preferredFoot,
  };

  const result = await playerService.createPlayer(player);

  res.status(200).json(result);
});

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Updates a player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The player id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     security:
 *	     - jwt: []
 *     responses:
 *       "200":
 *         description: Update was successful.
 *       "404":
 *         description: Player not found.
 *       "401":
 *         description: Unauthorized request.
 */
router.put("/:id", authenticateJWT, async function (req, res) {
  const player = await playerService.updatePlayer(req.params.id, req.body);

  if (player) {
    res.status(200).json(player);
  } else {
    res.sendStatus(404);
  }
});

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Deletes a player by id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The player id
 *     security:
 *	     - jwt: []
 *     responses:
 *       "204":
 *         description: Delete was successful.
 *       "404":
 *         description: Player not found.
 *       "401":
 *         description: Unauthorized request.
 */
router.delete("/:id", authenticateJWT, async function (req, res) {
  await playerService.deletePlayer(req.params.id);
  res.sendStatus(204);
});

export default router;
