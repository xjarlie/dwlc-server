const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const data = { message: 'Hello world' };

    res.status(200).render('index', { data: data });
});

module.exports = router;