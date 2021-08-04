// Prefer separating the document for formatting reasons?
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
 */

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API to manage football players.
 */


import { Router } from "express";
const router = Router();

import players from "../data/players";

/**
 * @swagger
 * /players:
 *    get:
 *      summary: Lists all the players
 *      tags: [Players]
 *      responses:
 *        "200":
 *          description: The list of players.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Player'
 */
router.get("/", function (req, res) {
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
 *      responses:
 *        "200":
 *          description: The list of players.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Player'
 *        "404":
 *          description: Player not found.
 */
router.get("/:id", function (req, res) {
  let player = players.find(function (item) {
    return item.id == req.params.id;
  });

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
 *     responses:
 *       "200":
 *         description: The created player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *
 */
router.post("/", function (req, res) {
  const { name, nationality, dateOfBirth, preferredFoot } = req.body;

  let player = {
    id: players.length + 1,
    name,
    nationality,
    dateOfBirth,
    preferredFoot,
    createdAt: new Date(),
  };

  players.push(player);

  res.status(201).json(player);
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
 *     responses:
 *       "204":
 *         description: Update was successful.
 *       "404":
 *         description: Player not found.
 */
router.put("/:id", function (req, res) {
  let player = find(function (item) {
    return item.id == req.params.id;
  });

  if (player) {
    const { name, nationality, dateOfBirth, preferredFoot } = req.body;

    let updated = {
      id: player.id,
      name: name !== undefined ? name : player.name,
      nationality: nationality !== undefined ? nationality : player.nationality,
      dateOfBirth: dateOfBirth !== undefined ? dateOfBirth : player.dateOfBirth,
      preferredFoot: preferredFoot !== undefined ? preferredFoot : player.preferredFoot,
      createdAt: player.createdAt,
    };

    players.splice(players.indexOf(player), 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

/**
 * @swagger
 * /players:
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
 *     responses:
 *       "204":
 *         description: Delete was successful.
 *       "404":
 *         description: Player not found.
 */
router.delete("/:id", function (req, res) {
  let player = players.find(function (item) {
    return item.id == req.params.id;
  });

  if (player) {
    players.splice(players.indexOf(player), 1);
  } else {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
