/*
A simple web server that parse shc raw data and return the extracted data
POST 
{
    raw: "shc:/0242130...."
}
*/

const express = require('express');
const { parseShc } = require('./parsers');
const port = process.env.PORT || 1234

// Initialize express
const server = express();
server.use(express.urlencoded({extended: true}));
server.use(express.json())

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