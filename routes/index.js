const express = require('express');
const apiUrl = require('../apiUrl');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {

    const data = { items: [
        'item numero uno',
        'item numero dos',
        'look its a third item',
        ':O a fourth'
    ] };

    res.status(200).render('index', { data: data });
});

router.get('/motif/:motifID', async (req, res) => {
    const { motifID } = req.params;
    const query = `
        {
            motif(where: { id: "${motifID}"}) {
                id
                name
                represents
                notes
                tags {
                    name
                }
                appearances {
                    id
                    name
                    url
                    appears
                    notes
                    main
                }
            }
        }
    `

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const status = response.status;
    const motif = (await response.json()).data.motif;

    res.status(200).render('motif.ejs', { motif: motif });
});

router.get('/track/:trackID', (req, res) => {
    let track = {};

    res.status(200).render('track', { track: track });
});

module.exports = router;