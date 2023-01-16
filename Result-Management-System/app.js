const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
// require('dontenv').config()


const expressLayouts  = require('express-ejs-layouts')
const app = express()
const port = 5000

//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json
app.use(bodyParser.json())

//Listening on port 500
app.listen(port, ()=>console.log(`listening ${port}`)) 

//static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use(expressLayouts)

//templating engine
app.set('views', './src/views/partials')
app.set('layout','./../layouts/layout')
app.set('view engine', 'ejs')

//DB Connection
const db = require("./models");
const { Student } = require('./models')


db.sequelize.sync().then((req)=>{
    app.listen(3000,()=>{
        console.log("Database running");
    });
});


//Error handler
const errHandler =err =>{
    console.log("Error : ",err);
};

//routes
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/student',(req,res)=>{
    res.render('student')
})
app.get('/addresult',(req,res)=>{
    console.log("in the addRecord")
    res.render('addResult')
});

app.post('/submitAddResult',(req,res)=>{
    console.log(req.body.name, req.body.score);
    Student.create({
        rollno:req.body.rollno,
        name : req.body.name,
        dob : req.body.dob,
        score: req.body.score,
    });
    res.redirect("/teacher");
    
    console.log("created the addRecord")
});


app.post("/submitEditResult",(req,res)=>{
    console.log("in the edit section");
    Student.update({
        name:req.body.name,
        dob:req.body.dob,
        score:req.body.score,
    },{where:{rollno:req.body.rollno}}).catch(err=>{
        console.log(err)
    });
    res.redirect("/teacher")
});


app.get('/teacher',async(req,res)=>{
    console.log("in teacher module")
    
    Student.findAll().then((students)=>{
        res.render('teacher',{students:students}); 
    }).catch((err)=>{
        console.log(err);
    });    
});

app.get('/viewResult',(req,res)=>{
    res.render('viewResult')
});

app.post('/submitViewResult',(req,res)=>{
    Student.findAll({
        where :
        {
            rollno:req.body.rollno,
            name:req.body.name,
        }
    }).then((students)=>{
        console.log("submit view :"+students.rollno);
        res.render('viewResult',{students:students});
    }).catch((err)=>{
        console.log(err);
    });
});


app.get("/edit",(req,res)=>{
    console.log("The edting roll no"+req.query.rollno);
    Student.findAll({
        where:{
            rollno:req.query.rollno,
        }
    }).then((student)=>{
        console.log("Hello world "+student)
        res.render('editResult',{student:student});
    }).catch((err)=>{
        console.log(err);
    });
});

app.get("/delete",(req,res)=>{
    Student.destroy({
        where:{rollno:req.query.rollno }
    });
    console.log("destroyed id "+ req.query.rollno);

    Student.findAll().then((students)=>{
        res.render('teacher',{students:students}); 
    }).catch((err)=>{
        console.log(err);
    });    
});