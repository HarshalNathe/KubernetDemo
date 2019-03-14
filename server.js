// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swaggerTools = require('swagger-tools');
var YAML = require('yaml-js');
var env = process.env.NODE_ENV || 'development';
var config = require('config');
var cors = require('cors');
var resolve = require('json-refs').resolveRefs;
var fs = require('fs');
var path = require('path');
var _mongoURL = config.get('mongoDB.url')
var _swaggerHost = config.get('development.swaggerHost')
// configuration ===========================================

var port = process.env.PORT || 7000; // set our port

mongoose.connect(_mongoURL, function (err, connected) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Connected successfully!');
  }
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var root = YAML.load(fs.readFileSync(path.join(__dirname, 'app/swagger') + '/swagger.yaml').toString());
root.host = _swaggerHost;
var options = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: function (res, callback) {
      callback(null, YAML.load(res.text))
    }
  }
};

// global error handler
function errorHandler(err, req, res, next) {
  console.log("Error: ", err);
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(res.statusCode || 500).json(err);
  }
}

// handles timed out requests
function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next();
  } else {
    next(new Error("the request timed out"), null, null, null, 504);
    //next(new Error("the request timed out")); // other args passed by closure
  }
}

resolve(root, options).then(function (results) {
  swaggerTools.initializeMiddleware(results.resolved, function (middleware) {
    // Serves the Swagger UI on /docs
    var routerConfig = {
      controllers: './app/controllers',
      useStubs: false
    }
    app.use(cors())
    // app.use(morgan('tiny'))
    // app.use(morgan('combined', {
    //   stream: accessLogStream
    // }))
    app.use(middleware.swaggerMetadata())

    // Validate Swagger requests
    app.use(middleware.swaggerValidator())
    app.use(middleware.swaggerRouter(routerConfig))
    app.use(middleware.swaggerUi())
    app.use(errorHandler);
    app.use(haltOnTimedout);
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

    app.listen(port, function () {
      console.log('Started server on port 7000');
    });
  });
});




// // routes ==================================================
// require('./app/routes')(app); // pass our application into our routes
// require('./app/api')(app);

// start app ===============================================
// app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app