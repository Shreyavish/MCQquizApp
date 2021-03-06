const express = require('express');

const router = express.Router();
var fs = require('fs');
const question = require('../models/question');
const LeaderBoard = require ('../models/leaderboard');
const Contest = require('../models/contest');
const quespaper = require('../models/questionpaper');
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

/*

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

router.post('/postresult',(req,res)=>{
  
  let userres= new userresult({
    username : req.body.username,
    result: req.body.result
    });

    userres.save((err,userres)=>{
      if(err){
        res.send({msg:'failed to post result'});
      }else{
        res.send({msg:'added successfully'});
      }
    })
})

router.get('/getresult',(req,res)=>{
  userresult.find(function(err,item){
    if(err){
        res.send({msg:'could not fetch questions'});
    }else{
        res.send(item);
    }
});
});


router.delete('/removeresult/:_id',(req,res)=>{

  userresult.remove({_id:req.params._id},
    function(err,item){
      if(err){
        res.send({msg:'failed to delete'})
      }else{
        res.send({msg:'deleted successfully'})
      }
    });
});*/




/*router.post('/createContest',(req,res)=>{

    let newContest = new Contest({

      Name: req.body.Name,
      Start_time: req.body.Start_time,
      End_time : req.body.End_time,
      Organized_by: req.body.Organized_by,
     // imgPath:req.body.imgPath,
      Contest_Link: req.body.Contest_Link,
  
      Questions:
          [{problem_no: req.body.problem_no,
          title:req.body.title,
          
          options: req.body.options,
          answer:req.body.answer,
          domain:req.body.domain,
          keywords:req.body.keywords}],
  
      LeaderBoard:{
          username:req.body.username,
          Rank:req.body.Rank,
          Score:req.body.Score,
          Time_taken: req.body.Time_taken,
      }
    });

  //  var newimg=fs.readFileSync(newContest.imgPath);
   // newContest.img.data= Buffer(newimg);
   // newContest.img.contentType = 'image/png';

        newContest.save((err,newContest)=>{

          if(err){
            res.send({msg:'adding failed'});
          }else{
            res.send({msg:'adding successful'});
          }

    });


  });*/

router.get('/getcontests',(req,res)=>{

  Contest.find(function(err,item) {
    if(err){
      res.send({msg:'failed to fetch'});
    }else{
      res.send(item);
    }
  })
});


router.delete('/removecontest/:_id',(req,res)=>{

  Contest.remove({_id:req.params._id},
    function(err,item){
      if(err){
        res.send({msg:'failed to delete'})
      }else{
        res.send({msg:'deleted successfully'})
      }
    });
  });


router.post('/createContest',(req,res)=>{
   let newContest = new Contest(req.body);
   newContest.save(function(err,result){
     if(err) throw err;
     res.json(result);
     console.log('created contest');
   })
})

router.get('/getContest/:_id',(req,res)=>{
// both for user display and admin editing 
// sends the whole contest (question paper too)

  Contest.findOne({_id:req.params._id})
  .populate(
    {path:'questionpaperid',
   populate : {
     path: 'section.question_content'
   }}
    )
  .exec(function(err,item){
    if(err){
      res.send(err)
    }else{
      res.send(item)
    }
  })
})


//this is final posting of result into contest schema
router.put('/postresult/:_id',(req,res)=> {
   var result_obtained = req.body;
console.log(result_obtained);














  Contest.findOneAndUpdate({_id:req.params._id},
    {$push : {'LeaderBoard':result_obtained}},
    {new: true},
    function(err,item){
      if(err){
        res.send({msg:'failed to update'});
      }else{
        res.send(item);
      }
    });
    
});



// this is posting temp result into leaderboard schema for first time

router.post('/postfirsttime',(req,res)=>{

  let firsttimeresult = new LeaderBoard(req.body);

  firsttimeresult.save(function(err,item){
    if(err){
      res.send(err);
    }else{
      res.send(item);
    }
  })
});

// this is updating temp result into leaderboard schema

router.put('/posttempresult/:_id',(req,res)=>{
  
  LeaderBoard.findOneAndUpdate(
    {_id:req.params._id},
    {$set : req.body},
    function(err,item){
      if(err){
        res.send(err);
      }else{
        res.send({msg:'updated succesfully'});
      }
    })
    
})





router.get('/getLeaderBoard/:_id',(req,res)=>{
  Contest.findOne({_id:req.params._id},
    function(err,item){
      if(err){
        res.send({msg:'could not find'});
      }else{
        res.send(item.LeaderBoard);
      }

    });

})


//loosely adding questions 
router.post('/addquestion',(req,res)=>{

  let newquestion = new question(req.body);
  console.log(req.body);  
  console.log(newquestion);
    newquestion.save(function(err,item){
      if(err){
        res.send(err);
      }else{
        res.send(item);
      }
    })
})

router.get('/getquestions',(req,res)=>{
  question.find(function(err,item){

    if(err){
      res.send({msg:'unsuccessful'});
    }else{
      res.send(item);
    }
  });
});



router.delete('/deletequestion/:_id',(req,res) =>{
  question.remove({_id:req.params._id},function(err,item){
    if(err){
      res.send({msg:'unsucessful'});
    }else{
      res.send({msg:'successfull'});
    }
  });
});


router.put('/editContest/:_id',(req,res)=>{

    Contest.findByIdAndUpdate(
      {_id: req.params._id},
      req.body,
      function(err,item){
        if(err)
        {res.send(err);
        }else{
          res.send(item);
        }

      });
});


// adding existing or created new questions to contest
router.put('/addQuestionsToContest/:_id',(req,res)=> {
  var question = req.body;
  console.log(question);

 Contest.findOneAndUpdate({_id:req.params._id},
   {$set: {'Questions':question}},
   {new: true},
   function(err,item){
     if(err){
       res.send({msg:'failed to update'});
     }else{
       res.send({msg:'successfull'});
     }
   });
   
});


// searching a question by some keyword or domain
router.post('/search',(req,res)=> {
  console.log(req.body);
  question.find(

    {$or : [ 
      {"domain" : req.body.search_key },
      {"keywords" : req.body.search_key}
    ]},
   
    function(err,item){
      if(err){
        res.send({msg:'failed to retrieve'});
      }else{
        res.send(item);
      }
    }
  )
})

router.post('/filterbylevel',(req,res)=>{
  question.find(

    {"level" : req.body.level},
    function(err,item){
      if(err){
        res.send({msg:'failed to retrieve'});
      }else{
        res.send(item);
      }
    }


  )
})




router.post('/filterbytype',(req,res)=>{
  question.find(

    {"type" : req.body.type},
    function(err,item){
      if(err){
        res.send({msg:'failed to retrieve'});
      }else{
        res.send(item);
      }
    }


  )
})


router.get('/getQuestionsofaContest/:_id',(req,res)=>{

  Contest.findOne(
    {_id:req.params._id},
    function(err,item){
      if(err){
        res.send(err);
      }else{
        res.send(item);
      }
    }
  )



})


router.delete('/deleteContest/:_id',(req,res)=>{
  Contest.remove(
    {_id:req.params._id},
    function(err,item){
      if(err)
      res.send(err);
      res.send({msg:'deleted successfully'});
    }
  )
})


router.post('/createQuestionPaper',(req,res)=>{

      let newquespaper = new quespaper(req.body);
  newquespaper.save(

    function(err,item){
      if(err){
        res.send(err);
      }else{
        res.send(item);
      }
    });
});


router.put('/updateQuestionPaper/:_id',(req,res)=>{

  quespaper.findOneAndUpdate(
    {_id: req.params._id},
    {$set : req.body},
    function(err,item){
      if(err)
      {res.send(err);
      }else{
        res.send(item);
      }

    });
});


router.get('/getQuestionPaper/:_id',(req,res)=>{
  quespaper.findById(req.params._id)
  .populate({path : 'section.question_content'},
  ).exec(function(err, ques) {
    if(err) console.log(err);
    else res.send(ques);
  }) ;
});


router.get('/deleteQpaper/:_id',(req,res)=>{
  quespaper.find(
    {_id:req.params._id},
    function(err,item){
      if(err)
      res.send(err);
      res.send({msg:'deleted successfully'});
    }
  )
})

// sending only contest details (excluding question paper) 
// this  is for user landing page

router.get('/getOnlyContestDetails/:_id',(req,res) => {
  Contest.findOne(
    {_id: req.params._id}
    ,function(err,item){
      if(err){
        res.send(err);
      }else{
        res.send(item)
      }
    }
  ).select("-questionpaperid");

})


// sending all the available question paper to let author choose one

router.get('/getAvailableQuestionPapers',(req,res)=>{

  quespaper.find()
  .populate({path : 'section.question_content'},
  ).exec(function(err, ques) {
    if(err) console.log(err);
    else res.send(ques);
  }) ;

})

router.put('/addQuesPaperToContest/:_id',(req,res)=>{
  console.log(req.body.qpaperid);
  Contest.findByIdAndUpdate(
    {_id:req.params._id},
    {$set : {questionpaperid:req.body.qpaperid}},
    {new: true},
    function(err,item){
      if(err){
      res.send(err)
    }
      else{
        res.send(item)
      }

    })
});



module.exports=router;