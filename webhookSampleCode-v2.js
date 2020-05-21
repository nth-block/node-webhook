const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const port = process.env.PORT||443

const privateKey = fs.readFileSync('<path_to_private_key>','utf8');
const certificate= fs.readFileSync('<path_to_public_key_chain','utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.status(200);
    res.send("Hello World! You GET-ed a message");
});

app.post('/',function(req,res){
    console.log(req.body);
    res.status(200);
    res.send("Hello World! You POST-ed a message!");
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
