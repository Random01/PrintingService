'use strict';

const phantom = require('node-phantom');
const os = require('os');
const uuid = require('node-uuid');
const fs = require('fs');

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

                var html = '<html><body><div>Test div</div></body></html>';
                page.evaluate(function (html) {
                    document.write(html);
                }, function (err) {
                    page.set('paperSize', { format: 'A4', orientation: 'landscape', margin: '1cm' }, function (err) {
                        var filename = [os.tmpdir(), '\\GridReportPrinting\\', uuid.v4(), '.pdf'].join('');

                        page.render(filename, function (err) {
                            if (err) {
                                logger.log('Error occurred while rendering page');
                                res.send(500, { 'in': 'page.render', 'error': err });
                                return;
                            } else {
                                fs.readFile(filename, function (err, data) {
                                    if (err) {
                                        logger.log('Error occurred while reading page');
                                        res.send(500, { 'in': 'fs.readFile', 'error': err });
                                        return;
                                    } else {
                                        res.writeHead(200, {
                                            'content-length': data.length.toString(),
                                            'Content-Type': 'application/pdf',
                                            'Content-Disposition': 'attachment; filename="' + encodeURIComponent('test.pdf') + '"'
                                        });
                                        res.send(data);

                                        fs.unlinkSync(filename);
                                    }
                                });
                            }
                        });

                    });
                }, html);
            });
        }, { phantomPath: require('phantomjs').path });
    } catch(ex) {
        res.status(500).send({ 'in': 'pdfExporter', 'error': ex });
    }
};