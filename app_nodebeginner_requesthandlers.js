//var exec = responsequire("child_process").exec; module for non-blocking website
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response){
	console.log("Request handler for 'start' was called!");
    var body='<html>'+
    		 '<head>'+
    		 '<meta http-equiv="Content-Type" content="text/html; '+
    		 'charset=UTF-8" />'+
    		 '</head>'+
    		 '<body>'+
    		 '<form action="/upload" method="post" enctype="multipart/form-data">'+
             '<input type="file" name="upload" multiple="multiple" />'+
    		 '<input type="submit" value="Upload File" />'+
    		 '</form>'+
    		 '</body>'+
    		 '</html>';

	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();

}

function upload(response,request){
	console.log("Request handler for 'upload' was called!");

    var form = formidable.IncomingForm();
    form.uploadDir = "/tmp";
    
    console.log("about to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done and path is " + files.upload.path);

        // Windows error on renaming:)
        fs.rename(files.upload.path, "/tmp/test.png", function(err){
            if (err){
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
    });


	response.writeHead(200,{"Content-Type":"text/html"});
	response.write("received image:<br/>");
    response.write("<img src='/show' />");
	response.end();
}

function show(response){
    console.log("Request handler for 'show' was called!");
    fs.readFile("/tmp/test.png","binary",function(err,file){
        if (err){
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(err+"\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;