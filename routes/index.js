const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const data = { items: [
        'item numero uno',
        'item numero dos',
        'look its a third item',
        ':O a fourth'
    ] };

    res.status(200).render('index', { data: data });
});

module.exports = router;