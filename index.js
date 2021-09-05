const express = require("express");

const app = express(); 
const path = require('path');

const methodoverride = require('method-override');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true})); // use to show how our post request will show the data
app.use(express.json()); // read the informnation sent in the json form

app.use(methodoverride('_method'));
 
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'/views'));
app.get('/ideatool' , (req,res) => {
    res.render('home.ejs');
});

let ideas = [
    {
        id : 1,
        name : "Suraj",
        subject : "Students",
        idea : "Students are one of the most important group of our society!!"
    },
    {
        id : 2,
        name : "Rijul",
        subject : "Career",
        idea : "In order to excel in your field u most know what is good for you"
    },
    {
        id : 3,
        name : "Shivam",
        subject : "Location",
        idea : "Always prefer the career which has good locality!!"
    },
    {
        id : 4,
        name : "Shrey",
        subject : "Career",
        idea : "sScience helped me to explore different aspects of my life"
    },
    {
        id : 5,
        name : "Riju Tejas",
        subject : "Health",
        idea : "The most important thing of this world is to eat everything"
    },
    {
        id : 6,
        name : "Nikhil",
        subject : "Students",
        idea : "My life has taught me that no work is less"
    }
];

app.get('/ideatool/create' , (req,res) => {
    res.render('create.ejs');
});


app.get('/ideatool/show', (req,res) => {
    res.render('display.ejs' , {ideas});
});


app.post('/ideatool' , (req,res) => {
    const {id, name , subject , idea} = req.body;
    ideas.push({id,name,subject,idea});
    res.redirect('/ideatool/show');
});

app.get('/ideatool/:id/edit' , (req,res) => {
    const {id} = req.params;
    const idea = ideas.find(i => i.id === parseInt(id));
    res.render('edit.ejs' , {idea});
});

app.patch('/ideatool/:id' , (req,res) => {
    const {id} = req.params;
    const newidea = req.body.idea;
    const foundidea = ideas.find(i => i.id === parseInt(id));
    if(foundidea){
        foundidea.idea = newidea;
    }
    

    res.redirect('/ideatool/show'); 
});

app.get('/ideatool/:id/move' , (req,res) => {
    const {id} = req.params;
    const idea = ideas.find(i => i.id === parseInt(id));
    res.render('move.ejs' , {idea});
});

app.patch('/ideatool/:id/move' , (req,res) => {
    const {id} = req.params;
    const newsubject = req.body.newsub;
    const foundidea = ideas.find(i => i.id === parseInt(id));
    if(foundidea){
        foundidea.subject = newsubject;
    }
    

    res.redirect('/ideatool/show'); 
});

app.delete('/ideatool/:id' , (req,res) => {
    const {id} = req.params;
    
    ideas = ideas.filter(i => i.id != id) ;

    res.redirect('/ideatool/show');
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!!");
});