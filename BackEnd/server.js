console.log("Hello  World");

var http = require("http");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser")

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.send('Hello World');
})

// This responds with "Hello From Products" on the products page
app.get('/products', function (req, res) {
    res.send('Hello from products');
})

// This responds with "Hello INSERT -> /example" on the hello/example page
app.get('/hello/:name', function (req, res) {
    res.send('Hello ' + req.params.name);
})

// This responds with Json files on the api/post page
app.get('/api/posts', function (req, res) {
    const posts = [
        {
            "id": "fadf12421l",
            "title": "First server-side post",
            "content": "This is coming from the server"
        },
        {
            "id": "ksajflaj132",
            "title": "Second server-side post",
            "content": "This is coming from the server!"
        }
    ]
    res.status(200).json({ post: posts }); //Name + Type
})

// This repsonds with Json information
app.post('/api/posts', function (req, res) {
    console.log("Title is " + req.body.title);
    console.log("Content is " + req.body.content);
})

// This responds with a html-> "/index.html" file on the test page
app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
})

// This responds with a information from the test page file on the name page
app.get('/name', function (req, res) {
    console.log("get method");
    console.log(req.query.lastname);
    res.send('Hello ' + " " + req.query.lastname + " " + req.query.firstname);
})

// This responds with a information from the test page file on the name page
app.post('/name', function (req, res) {
    console.log("post method");
    console.log(req.body.firstname);
    res.send('Hello ' + req.body.firstname + " " + req.body.lastname);
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://127.0.0.1:8081/", host, port)
})