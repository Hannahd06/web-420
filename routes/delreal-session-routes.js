/*
============================================
; Title: delreal-session-routes.js
; Author: Professor Krasso
; Date: June 28, 2023
; Modified By: Hannah Del Real
; Description: User API routes 
; Sources Used: 
; WEB 420 buwebdev GitHub Repository
; Web 420 Assign_6 guidelines
;===========================================
*/

const express = require("express");
const router = express.Router();
const User = require('../models/delreal-user');
const bycrpt = require("bcryptjs");
let saltRounds = 10;


/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     name: signup
 *     summary: User signup
 *     requestBody:
 *       description: User signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/signup', async(req, res) => {
    try {
        const hashedPassword = bycrpt.hashSync(req.body.Password, saltRounds);
        const newRegisteredUser = {
            'userName': req.body.userName,
            'Password': hashedPassword,
            'emailAddress': req.body.emailAddress
        };
        // Verify that username doesn't already exist
        const user = await User.findOne({"userName": req.body.userName});
        if (!user) {
            // Create new user 
           await User.create(newRegisteredUser, function(err, user) {
                if (err) {
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                } else {
                    res.status(200).send({
                        'message': "Registered User"
                    });
                    res.json(user);
                    console.log(user);
                    
                }
            })
        } else { 
            if (user) {
                console.log("username is already in use");
                res.status(401).send({
                    message: "Username is already in use"
                })
            }
        }
    } catch(e) {
                console.log(e);
                res.status(500).send({
                    message: `Server Exception: ${e}`
                })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     name: signup
 *     summary: User login
 *     requestBody:
 *       description: User login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                })
            } else {
                if (user) {
                    let passwordIsValid = bycrpt.compareSync(req.body.Password, user.Password);
                    if (passwordIsValid) {
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        console.log('Invalid username and/or password');
                        res.status(401).send({
                            'message': 'Invalid username and/or password'
                        })
                    }
                } else {
                    if (!user) {
                        console.log('Invalid username and/or password');
                        res.status(401).send({
                            'message': 'Invalid username and/or password'
                        })
                    }
                }
            }
        });
    } catch(e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })       
    }
})

module.exports = router;

