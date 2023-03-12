const express = require("express");
const expressApp = express();
const bodyParser= require("body-parser");
const { dirname } = require("path");
const fileSystem = require('fs');
const { Console } = require("console");


expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(express.static(__dirname));


//functionality
function PrimeNumberGenerator(startRange, endRange) {
    var PrimeNumberArray = [];
    var i = startRange;

    while (i <endRange && i >= startRange) {

        if (i%2!=0 && i%3!=0 && i%5!=0 && i%7!=0) {
            PrimeNumberArray.push(i);
        }
        i++;
    }
    return PrimeNumberArray;
}


expressApp.get("/",function(req,res){
    //console.log(req)
    res.sendFile(__dirname+"/index.html")
})

expressApp.post("/PrimeNumber",function (req,res) {
    if (Number(req.body.EndingRange) < 10) {
        res.send("<h1>Primary Numbers under 10 are: 1,2,3,5,7</h1>")
    }
    else{
        var PrimeNumberArrayResult = PrimeNumberGenerator(Number(req.body.StartingRange),Number(req.body.EndingRange) )
        res.send(`<h1>${PrimeNumberArrayResult}</h1>`)
        console.log(PrimeNumberArrayResult)
    
        fileSystem.writeFile(`${__dirname}/PrimeNumbersFrom${req.body.StartingRange}to${req.body.EndingRange}.txt`, PrimeNumberArrayResult.toString(), err => {
        if (err) {
            console.error(err);
        }
        else{
            console.log("fie written successfully");
        }
      // file written successfully
    });
    
    
    }
   

})

expressApp.listen(process.env.PORT || 3000,function () {
    console.log("server started on port 3000")
})