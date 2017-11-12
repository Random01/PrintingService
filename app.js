'use strict';

const express = require('express');
const app = express();
const port = 3000;
const pdfExporter = require('./exporters/pdfExporter');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pdf', pdfExporter);

app.listen(port, function() {
    console.log('Example app listening on port ' + port + '!');
});