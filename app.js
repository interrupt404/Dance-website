const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 150;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    // res.status(200).render('index.pug', params);
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
        name=req.body.name;
        email=req.body.email;
        concern=req.body.concern;
        address=req.body.address;
        phone=req.body.phone; 
    
        let OutputToWrite=`the name of the person is ${name},
        his email is "${email}",
        his address is "${address}" ,
        his phone no is ${phone},
        his concern is "${concern}"`;
    
        // we receive information and save in Output.txt file 
        fs.writeFileSync("output.txt",OutputToWrite);

    const params = { 'message': 'Your form has been Submitted'};
    res.status(200).render('contact.pug',params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
