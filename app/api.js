var himalaya = require('himalaya')
var toHTML = require('himalaya/translate').toHTML
var fs = require('fs')
// var express = require('express'),
//     app = express(),
//     port = process.env.PORT || 3000;

module.exports = function (app) {

    app.route('/getFileFromJson')
        .get(function (req, res) {
            // if (err)
            //     res.send(err);
            console.log("remote:" + req.connection.remoteAddress);
            var html = fs.readFileSync('./app/test/index.html', { encoding: 'utf8' })
            var json = himalaya.parse(html)
            fs.writeFile('mynewfile3.txt', JSON.stringify(json), function (err) {
                if (err) throw err;
                console.log('Saved!');
                var json1 = JSON.parse(fs.readFileSync('mynewfile3.txt'))
                fs.writeFileSync('./app/test/webpage.html', toHTML(json1))
                var html1 = fs.readFileSync('./app/test/webpage.html', { encoding: 'utf8' })
                //res.write(html1);
                res.send(html1);
            });

        })

    //app.listen(port);

    //console.log('todo list RESTful API server started on: ' + port);
}

