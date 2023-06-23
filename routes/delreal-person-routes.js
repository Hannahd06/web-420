/*
============================================
; Title:  delreal-person-routes.js
; Author: Hannah Del Real
; Date:   21 June 2023
; Description: Person Schema routes
;===========================================
*/

const express = require("express");
const router = express.Router();
const Person = require('../models/delreal-person');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning a list of people from MongoDB Atlas.
 *     summary: Returns a list of person documents.
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/persons", async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
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
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding new person objects
 *     summary: Creates a new person object
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      text: 
 *                        type: string
 *               dependents:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      firstName: 
 *                        type: string
 *                      lastName: 
 *                        type: string
 *               birthDate:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/persons", async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        };
        
        await Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

// Export the router
module.exports = router;

