/*
============================================
; Title: delreal-node-shopper-routes.js
; Author: Professor Krasso
; Date: July 5, 2023
; Modified By: Hannah Del Real
; Description: Customer API routes 
; Sources Used: 
; WEB 420 buwebdev GitHub Repository
; Web 420 Assign_7 guidelines
;===========================================
*/

const express = require("express");
const router = express.Router();
const Customer = require('../models/delreal-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding new customer objects
 *     summary: Creates a new customer object
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
        };
        
        await Customer.create(newCustomer, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for adding a new customer invoice by userName
 *     summary: Creates a new customer invoice
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: The userName inputted by the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name: 
 *                        type: string
 *                      price: 
 *                        type: number
 *                      quantity: 
 *                        type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers/:userName/invoices', async(req, res) => {
    try {
        Customer.findOne({userName: req.params.userName}, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                const newInvoice = {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped,
                lineItems: req.body.lineItems
                }
                customer.invoices.push(newInvoice);
                customer.save();
                console.log(customer);
                res.json(customer);
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
 * findByInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API to find customer invoices by userName
 *     summary: Returns invoice documents
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: The userName requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer invoice documents returned
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/customers/:userName/invoices', async(req, res) => {
    try {
        Customer.findOne({'userName': req.params.userName}, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
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
