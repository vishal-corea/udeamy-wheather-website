const path = require('path')
const express = require('express');
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const gecode = require("./utils/geocode.js");

const app  = express();

// Define paths for Exprees config
const publicDirectoryPath  = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

console.log(partialsPath);

// Setup handelbar engine and views location
app.set('view engine','hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render("index",{
        title:"Weather",
        name :"vishal"
    });
})

app.get('/help',(req, res)=>{
    res.render("help",{
        title:"Help",
        message:"Here we are to help you Thanks !",
        name:"Vishal Koriya"
    });
})


app.get('/about',(req, res)=>{
    res.render("about",{
        name:"vishal",
        title :"About"
    });
})

app.get('/weather',(req, res)=>{

    let address = req.query.address;
    if(!req.query.address){
       return res.send({
            "error":"you must provide the adddres tearm"
        });
    }

    gecode(address, (err,{latitiude,longitude, location } = {})=>{
        if(err){
            return res.send({
                "error": err
            })
        }else{
            forecast(latitiude, longitude, (err, data) => {
                if (err) {
                    return res.send({
                        "err":err
                    });
                    
                } 

                res.send({
                    forecast:"Feels Like " + data.feelslike+" Actual temprature is "+ data.temperature,
                    location:location,
                    address: req.query.address,
                });
            })
        }

    })    
   
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        msgText : "Helper Page Not found"
    })
});

app.get('*',(req,res) => {
    res.render('404',{
        msgText : "Page Not found"
    })
});

app.listen(3000,() =>{
 console.log("server is up on port 3000");   
})