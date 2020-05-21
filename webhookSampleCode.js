const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT||443

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.status(200);
    res.send("Hello World! You GET-ed a message");
    console.log(req.headers);
});

app.post('/',function(req,res){
    console.log(req.body);
    res.status(200);
    res.send("Hello World! You POST-ed a message!");
});

app.listen(port, function(err) {
    console.log("Server started..." + Date());
});
