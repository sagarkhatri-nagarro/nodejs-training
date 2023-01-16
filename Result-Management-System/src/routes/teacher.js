const express = require('express')
const teacherRouter = express.Router()

const Students  =require('./../models/Student')

    const errHandler =err =>{
        console.log("Error : ",err);
    };

teacherRouter.get('/teacher',async(req,res)=>{
    
    const st = await Students.findAll().catch(errHandler);
    console.log(st);
    res.render('teacher',{students:st}); 
});

module.exports = teacherRouter