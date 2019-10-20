const express = require('express');
const pool = require('../db/postgre');
const jwt = require('jsonwebtoken');

const router  = express.Router();

router.post('/signinwithbarcode', async (req, res) => {
    const {barcode} = req.body;
    try{
        console.log(barcode);
        if (!barcode) {
            throw ({error: 'Must provide barcode'});
        }
        const result = await pool.query('SELECT * FROM devices WHERE barcode = $1 LIMIT 1', [barcode]);
        const device = result.rows[0];
        if (!device) {
            throw({error: 'Invalid barcode'});
        }
        // const isMatch = await bcrypt.compare(password, device.password,);
        // if(!isMatch) {
        //     throw ({error: 'Invalid password or email'});
        // }
        else {
            const token = await jwt.sign({id: device.id}, 'MY_SECRET_KEY');
            return res.send({
                token,
                userName: device.username,
                deviceId: device.deviceId});
        } 
    } catch (error) {
    return res.status(402).send(error);
    }
});


router.post('/checkToken', async (req, res) => {
    try {
        const {id} = await jwt.verify(req.body.token, 'MY_SECRET_KEY');
        const result = await pool.query('SELECT * FROM devices WHERE id = $1 LIMIT 1', [id]);
        const device = result.rows[0];
        if (!device) {
            throw({error: 'Invalid token'});
        } 
        else {
            return res.send({
                userName: device.username, 
                deviceId: device.deviceid
            });
        }
    } catch(error) {
        return res.status(402).send(error);
    }
});

router.post('/getLastValue', async (req, res) => {
    try {
        const {id} = await jwt.verify(req.body.token, 'MY_SECRET_KEY');
        let result = await pool.query('SELECT * FROM devices WHERE id = $1 LIMIT 1', [id]);
        const deviceid = result.rows[0].deviceid;
        result = await pool.query('SELECT * FROM datas WHERE deviceid = $1 AND type = $2 ORDER BY timestamp DESC LIMIT 1;', [deviceid, req.body.valueType]);
        const value = result.rows[0];
        if (!value) {
            throw ({error: 'No value found'});
        }
        else {
            return res.send(value);
        }
    } catch (error) {
        console.log(error);
        return res.status(402).send(error);
    }
})
module.exports = router;