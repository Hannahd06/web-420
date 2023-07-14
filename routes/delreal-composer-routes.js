/*
============================================
; Title:  delreal-composer-routes.js
; Author: Hannah Del Real
; Date:   14 June 2023
; Description: Composer Schema routes
;===========================================
*/

const express = require("express");
const router = express.Router();
const Composer = require('../models/delreal-composer');
/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning a list of composers from MongoDB Atlas.
 *     summary: Returns a list of composer documents.
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/composers", async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a single composer object from MongoDB
 *     summary: Returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The composerID requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/composers/:id", async(req, res) => {
    try {
        Composer.findOne({ '_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding new composer objects
 *     summary: Creates a new composer object
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/composers", async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        
        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
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
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API for updating an existing composer document in MongoDB.
 *     summary: Updates a composer document in MongoDB. 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the collection by. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/composers/:id', async(req, res) => {
    try {
        const composerDocId = req.params.id;
        Composer.findOne({"_id": composerDocId}, function(err, composer) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                if (composer) {
                    composer.set({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    });
                    composer.save(function(err, updatedComposer) {
                        if (err) {
                            console.log(err);
                            res.json(updatedComposer);
                        } else {
                            console.log(updatedComposer);
                            res.json(updatedComposer);
                        }
                     
                    })
                } else if (!composer) {
                        res.status(401).send({
                            'message': `Invalid composerId: ${err}`
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

})

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposerById
 *     description: API for deleting a composer document from MongoDB.
 *     summary: Removes a composer document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the composer document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: composer document removed
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/composers/:id', async(req, res) => {
    try {
        const composerDocId = req.params.id;
        Composer.findByIdAndDelete({"_id": composerDocId}, function(err, composer) {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                }) 
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


module.exports = router;


