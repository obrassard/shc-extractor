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
server.use(express.static(path.join(__dirname, './public')));

// Setup hbs for views
server.set('views', path.join(__dirname, './views'));
server.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
server.set('view engine', 'hbs');

/* Return the QR code reader page */
/* GET / */
server.get('/', async (_, res) => {
    res.render('reader');
});

/* Get the decoded data in the web UI  */
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

const returnJson = async (shcRawData, req, res) => {
    if (shcRawData) {
        const parsedData = await parseShc(shcRawData);
        res.json(parsedData);
    } else {
        res.status(400).send('400 Bad Request');
    }
}

/* Get the decoding result in JSON format */
/*  GET /json?shc=0242130.... */
server.get('/json', async (req, res) => {
    await returnJson(req.query.shc, req, res);
});

/* POST { raw: "shc:/0242130...."} */
server.post('/', async (req, res) => {
    await returnJson(req.body.raw, req, res);
});

server.listen(port);
console.log(`Listening on localhost:${port}`)

