const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const port = process.env.PORT||443
const uuid = require('uuid');


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
    let uuid_prefix = uuid.v4();
    let ts = (new Date()).toISOString().substring(0,19).replace(/:/g,'').replace("T","_");
    let filename = "logs/" + ts + "_" + uuid_prefix + ".json";
    console.log(filename);
    fs.writeFileSync(filename, JSON.stringify(req.body), 'utf8');
    res.set("Content-Type","application/json");
    res.status(200);
    res.send(JSON.stringify({results:{requestId:uuid_prefix,timestamp:ts}}));

});

console.log("Starting server on port " + port);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
