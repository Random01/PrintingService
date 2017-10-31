'use strict';

const phantom = require('node-phantom');

module.exports = function(req, res) {
    console.log('phantomjs path: ' + require('phantomjs').path);

    try {
        phantom.create(function(err, ph) {
            if(err) {
                res.status(500).send({ 'in': 'phantom.create', 'error': err, 'phantom': ph });
                return;
            }

            console.log('Phantom created');

            return ph.createPage(function(err, page) {
                if(err) {
                    res.send(500, { 'in': 'ph.createPage', 'error': err, 'phantom': ph });
                    return;
                }

                console.log('Page created');

                return page.open("https://ya.ru/", function(err, status) {
                    ph.exit();

                    res.send(200, 'Ok!');
                });
            });
        }, { phantomPath: require('phantomjs').path });
    } catch(ex) {
        res.status(500).send({ 'in': 'pdfExporter', 'error': ex });
    }
};