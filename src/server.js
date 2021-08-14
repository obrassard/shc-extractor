// A simple web server that parse shc raw data and return the extracted data

const express = require('express');
const { parseShc } = require('./parsers');
const exphbs = require('express-handlebars');
const path = require('path');
const { findPatientResource, findImmunizationResources } = require('./helpers');

const port = process.env.PORT || 1234

// Initialize express
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// Setup hbs for views
server.set('views', path.join(__dirname, './views'));
server.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: false }));
server.set('view engine', 'hbs');

/* GET /card?shc=0242130.... */
server.get('/card', async (req, res) => {
    const shcRawData = req.query.shc;
    try {
        const data = await parseShc(shcRawData);
        const now = new Date();
        res.render('result', {
            iss: data.payload.iss,
            patient: findPatientResource(data.payload),
            immunizations: findImmunizationResources(data.payload),
            verifications: data.verifications,
            now: now.toLocaleDateString() + ' ' + now.toTimeString()
        });
    } catch (e) {
        res.status(400).send('400 Bad Request');
    }
});

/* POST { raw: "shc:/0242130...."} */
server.post('/', async (req, res) => {
    const shcRawData = req.body.raw;
    if (shcRawData) {
        const parsedData = await parseShc(shcRawData);
        res.json(parsedData);
    } else {
        res.status(400).send('400 Bad Request');
    }
});

server.listen(port);
console.log(`Listening on port :${port}`)

