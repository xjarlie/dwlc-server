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

router.get('/motif/:motifID', (req, res) => {
    let motif = {};

    res.status(200).render('motif', { motif: motif });
});

router.get('/track/:trackID', (req, res) => {
    let track = {};

    res.status(200).render('track', { track: track });
});

module.exports = router;