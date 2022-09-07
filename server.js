const express = require('express');
const path = require('path');
const compression = require('compression');

const indexRouter = require('./routes/index');
const templateRouter = require('./routes/template');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');

app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);
app.use('/template', templateRouter);

// 404 page: Keep this last
app.get('/*', (req, res) => {
    res.status(404).send('Error 404');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});