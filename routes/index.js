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

router.get('/motifs', async (req, res) => {
    const query = `
    {
        motifs (orderBy: {name: asc}) {
            id
            name
            represents
            mainAppearance: appearances(where: {main: {equals: true}}) {
                name
                appears
                url
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
    console.log(status, data);

    res.status(200).render('motifs', { motifs: data.motifs });
})

router.get('/motifs/:motifID', async (req, res) => {
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
                mainAppearance: appearances(where: {main: {equals: true}}) {
                    name
                    spotifyUrl
                    url
                }
                appearances (orderBy: {appears: asc}) {
                    id
                    name
                    appears
                    main
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
    const motif = (await response.json()).data.motif;

    res.status(200).render('motif', { motif: motif });
});

router.get('/tracks', async (req, res) => {
    const query = `
    {
        tracks (orderBy: {name: asc}) {
            id
            name
            appears
            motifs {
                name
            }
            url
            spotifyUrl
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
    const tracks = (await response.json()).data.tracks;
    res.status(200).render('tracks', { tracks: tracks });
})

router.get('/tracks/:trackID', async (req, res) => {

    const { trackID } = req.params;
    const query = `
    {
        track(where: {id: "${trackID}"}) {
            id
            name
            url
            spotifyUrl
            appears
            notes
            motifs {
                id
                name
                represents
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

router.get('/tags/:tagName', async (req, res) => {
    console.log('here')
    const { tagName } = req.params;
    const query = `
    {
        tags(where: {name: {equals:"${tagName}"}}) {
            id
            name
            motifs(orderBy: {id: desc}) {
                id
                name
                represents
                mainAppearance: appearances(where: {main: {equals: true}}) {
                    appears
                }
                tags {
                    name
                }
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
    const tag = (await response.json()).data.tags[0];

    if (!tag) {
        res.redirect('/404');
        return;
    }

    res.status(200).render('tag', { tag });
    return;
})

module.exports = router;