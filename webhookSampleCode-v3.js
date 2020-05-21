const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const port = process.env.PORT||443

const privateKey = fs.readFileSync('<path _to_priv_key>',utf8');
const certificate= fs.readFileSync('<path_ti_public_key_chain>','utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.status(200);
    res.send("Hello World! You GET-ed a message");
});

app.post('/',function(req,res){
    console.log(req.body)
    responseText = req.body[0].data.validationCode;
    responseObject = new Object;
    responseObject["validationResponse"]=responseText;
    console.log(JSON.stringify(responseObject));
    res.status(200);
    res.send(JSON.stringify(responseObject));
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
