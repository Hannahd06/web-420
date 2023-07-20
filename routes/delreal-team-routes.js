/*
============================================
; Title:  delreal-team-routes.js
; Author: Hannah Del Real
; Date:   17 July 2023
; Description: Team Schema routes
;===========================================
*/

const express = require("express");
const router = express.Router();
const Team = require('../models/delreal-team');

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeam
 *     description: API for adding new team objects
 *     summary: Creates a new team object
 *     requestBody:
 *       description: team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *               - players
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *               players:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      firstName: 
 *                        type: string
 *                      lastName: 
 *                        type: string
  *                      salary: 
 *                        type: number
 *     responses:
 *       '200':
 *         description: Team added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/teams", async(req, res) => {
    try {
        const newTeam = {
            name: req.body.name,
            mascot: req.body.mascot,
            players: req.body.players
        };
        
        await Team.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning a list of Teams from MongoDB Atlas.
 *     summary: Returns a list of team documents.
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/teams", async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for adding a new player to a team document by id
 *     summary: Creates a new player
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id inputted by the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: new player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - Salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                  type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({"_id": req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                if (team) {
                    const newPlayer = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        salary: req.body.salary,
                        }
                        team.players.push(newPlayer);
                        team.save();
                        console.log(team);
                        res.json(team);
                } else if (!team) {
                    res.status(401).send({
                        'message': `Invalid teamId: ${err}`
                    })
                } else {
                    console.log(err);
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API to find Team players by teamId
 *     summary: Returns player documents for a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The team id requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents returned
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                if (team) {
                    console.log(team.players);
                    res.json(team.players);
                } else if (!team) {
                    res.status(401).send({
                        'message': `Invalid teamId: ${err}`
                    })
                } else {
                    console.log(err);
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

module.exports = router;


/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a team document from MongoDB.
 *     summary: Removes a team document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the team document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: team document removed
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/teams/:id', async(req, res) => {
    try {
        const teamDocId = req.params.id;
        Team.findByIdAndDelete({"_id": teamDocId}, function(err, team) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                }) 
            } else {
                if(team) {
                    console.log(team);
                    res.json(team);
                } else if (!team) {
                    res.status(401).send({
                        'message': `Invalid teamId: ${err}`
                    })
                 } else {
                        console.log(err);
                } 
            }
            
        })
    } catch (e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


module.exports = router;


