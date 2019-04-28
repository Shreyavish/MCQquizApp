const express = require('express');

const router = express.Router();

const question = require('../models/question');

//get questions url

router.get('/getquestions',(req,res)=>{
    question.find(function(err,item){
        if(err){
            res.send({msg:'could not fetch questions'});
        }else{
            res.send(item);
        }
    });
});



router.post('/addquestion',(req,res)=>{

    let ques= new question({
        qno: req.body.qno,
        title: req.body.title,
        op1: req.body.op1,
        op2:req.body.op2,
        op3:req.body.op3,
        op4:req.body.op4,
        answer:req.body.answer

    })
  
    ques.save((err,ques)=>{
        if(err){
            res.send({msg:'failed'});
          }
          else{
            res.send({msg:'successfully added'});
          }
    })

});






router.delete('/removequestion/:id',(req,res)=>{

    question.remove({_id:req.params.id},
      function(err,item){
        if(err){
          res.send({msg:'failed to delete'})
        }else{
          res.send({msg:'deleted successfully'})
        }
      });
  });



module.exports=router;