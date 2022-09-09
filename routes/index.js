const express = require('express');
const apiUrl = require('../apiUrl');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {

    const query = `
        {
            motifs(orderBy: {id: desc}) {
                id
                name
                represents
                mainAppearance: appearances(where: {main: {equals: true}}) {
                    name
                    appears
                }
                tags {
                    name
                }
            }
        }
    `;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const status = response.status;
    const data = (await response.json()).data;


    res.status(200).render('index', { data });
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

    res.status(200).render('motif', { motif: motif });
});

router.get('/track/:trackID', async (req, res) => {

    const { trackID } = req.params;
    const query = `
    {
        track(where: {id: "${trackID}"}) {
            id
            name
            url
            appears
            notes
            motifs {
                id
                name
                represents
                notes
                tags {
                  name
                }
            }
        }
    }`

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const status = response.status;
    const track = (await response.json()).data.track;

    res.status(200).render('track', { track: track });
});

module.exports = router;