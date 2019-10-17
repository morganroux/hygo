const express = require('express');
const pool = require('../db/postgre');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router  = express.Router();

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(422).send({error: 'Must provide email and password'});
    }
    try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hash]);
    const userId = result.rows[0].id;
    const token = await jwt.sign({userId}, 'MY_SECRET_KEY')
    res.send({token});
    }
    catch (error) {
        res.status(402).send({error})
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    try{
        if (!email || !password) {
            throw ({error: 'Must provide email and password'});
        }
        const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
        user = result.rows[0];
        if (!user) {
            throw({error: 'Invalid password or email'});
        }

        const isMatch = await bcrypt.compare(password, user.password,);
        if(!isMatch) {
            throw ({error: 'Invalid password or email'});
        }
        else {
            const token = await jwt.sign({userId: user.id}, 'MY_SECRET_KEY');
            res.send({token});
        } 
    } catch (error) {
    return res.status(402).send(error);
    }
});

router.post('/signinwithbarcode', async (req, res) => {
    const {barcode} = req.body;
    try{
        console.log(barcode);
        if (!barcode) {
            throw ({error: 'Must provide barcode'});
        }
        const result = await pool.query('SELECT * FROM devices WHERE barcode = $1 LIMIT 1', [barcode]);
        user = result.rows[0];
        if (!user) {
            throw({error: 'Invalid barcode'});
        }
        // const isMatch = await bcrypt.compare(password, user.password,);
        // if(!isMatch) {
        //     throw ({error: 'Invalid password or email'});
        // }
        else {
            const token = await jwt.sign({userId: user.id}, 'MY_SECRET_KEY');
            res.send({
                token,
                userName: user.username});
        } 
    } catch (error) {
    return res.status(402).send(error);
    }
});

module.exports = router;