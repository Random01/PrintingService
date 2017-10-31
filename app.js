'use strict';

const express = require('express');
const app = express();
const port = 3000;
const pdfExporter = require('./exporters/pdfExporter');

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/pdf', pdfExporter);

app.listen(port, function() {
    console.log('Example app listening on port ' + port + '!');
});