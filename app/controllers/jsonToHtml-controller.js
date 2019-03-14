'use strict'
var himalaya = require('himalaya');
var toHTML = require('himalaya/translate').toHTML;
var fs = require('fs');


// Get location list
exports.getForm = function (req, res, next) {
  console.log('remote:' + req.connection.remoteAddress);
  var html = fs.readFileSync('./app/test/index.html', {
    encoding: 'utf8'
  })
  var json = himalaya.parse(html)
  fs.writeFile('mynewfile3.txt', JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log('Saved!');
    var json1 = JSON.parse(fs.readFileSync('mynewfile3.txt'));
    fs.writeFileSync('./app/test/webpage.html', toHTML(json1));
    var html1 = fs.readFileSync('./app/test/webpage.html', {
      encoding: 'utf8'
    })
    //res.write(html1);
    res.send(html1);
  });
}