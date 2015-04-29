var server = require('./app_nodebeginner_server');
var router = require('./app_nodebeginner_router');
var requestHandlers = require('./app_nodebeginner_requesthandlers.js');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload; 
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);