var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');

 
//protected route
app.post("/user/add",verifyToken,function(req, res) {    
    jwt.verify(req.token, 'password', (err, authData) => {  
        if(err) {
            res.status(403).json({
                error:'Forbidden'
            });
          } else{}
        res.json({
        authData,    
        status:"user added"
   });
   });
 });



app.post("/login",(req,res)=>{
    const user= {
      id:1,
      username:'Chad',      
    }
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user
      }, 'password',(err,token)=>{
          res.json({
              token
          })
      });
});

//token format


function verifyToken (req,res,next){
    //get auth header value
    const barerHeader = req.headers['authorization']
    //check if barer is undefined
    if(typeof barerHeader !== 'undefined'){
         const bearerToken= barerHeader.split(' ')[1];
        req.token = bearerToken;        
        next();  
    }else{
        res.status(403).json({
            error:'Forbidden'
        });
    }
}

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


