var express = require("express");
const router = express.Router();
var {class1} = require('./controller');

require('dotenv').config();

router.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})

router.get('/signup', class1.a);
router.post('/signup', class1.b);
router.get('/otp/:_id1', class1.c);
router.post('/otp/:_id1', class1.d);
router.get('/login', class1.e);
router.post('/login', class1.f);
router.get('/first', class1.g);

module.exports = router;