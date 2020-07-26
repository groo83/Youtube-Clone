const express = require('express');
const router = express.Router();

const {Like} = require('../models/Like');
const {Dislike} = require('../models/Dislike');

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
   // 비디오 좋아요 || 댓글 좋아요 나뉨
    let variable = {}
    if(req.body.videoId){
        variable = { videoId: req.body.videoId}//, userId: req.body.userId}
    }else{
        variable = { commentId: req.body.commentId}//, userId: req.body.userId}
    }
    Like.find(variable)
        .exec((err, likes)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true,likes})
        })
});

router.post('/getDislikes', (req, res) => {
    // 비디오 싫어요 || 댓글 싫어요 나뉨
     let variable = {}
     if(req.body.videoId){
         variable = { videoId: req.body.videoId}//, userId: req.body.userId}
     }else{
         variable = { commentId: req.body.commentId}//, userId: req.body.userId}
     }
     Dislike.find(variable)
         .exec((err, dislikes)=>{
             if(err) return res.status(400).send(err)
             res.status(200).json({success:true,dislikes})
         })
 });
 

 router.post('/upLike', (req, res) => {
    // 비디오 싫어요 || 댓글 싫어요 나뉨
     let variable = {}
     if(req.body.videoId){
         variable = { videoId: req.body.videoId, userId: req.body.userId} 
     }else{
         variable = { commentId: req.body.commentId, userId: req.body.userId}
     }
    
     // 1.Like collection에 클릭 정보를 입력.
     const like = new Like(variable)
     like.save((err,likeResult)=>{
        if(err) return res.json({success:false},err)
     })

     // 2.만약 DisLike이 이미 클릭되어있다면 Dislike의 1을 줄여준다 (취소)
     Dislike.findByIdAndDelete(variable) 
        .exec((err, dislikeResult)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
 });

 router.post('/unLike', (req, res) => {
     let variable = {}
     if(req.body.videoId){
         variable = { videoId: req.body.videoId, userId: req.body.userId} 
     }else{
         variable = { commentId: req.body.commentId, userId: req.body.userId}
     }
    
     // save한것을 없애줌
     Like.findByIdAndDelete(variable) //  ◇ vs findOneAndDelete?
        .exec((err, result)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
 });
 
 router.post('/unDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId} 
    }else{
        variable =  { commentId: req.body.commentId, userId: req.body.userId}
    }
   
    // save한것을 없애줌
    Disike.findByIdAndDelete(variable) //  ◇ vs findOneAndDelete?
       .exec((err, result)=>{
           if(err) return res.status(400).json({success:false,err})
           res.status(200).json({success:true})
       })
});
router.post('/upDislike', (req, res) => {
   
     let variable = {}
     if(req.body.videoId){
         variable = { videoId: req.body.videoId, userId: req.body.userId} //, userId: req.body.userId} 
     }else{
         variable =  { commentId: req.body.commentId, userId: req.body.userId}
     }
    
     // 1.Dislike collection에 클릭 정보를 입력.
     const dislike = new Dislike(variable)
     dislike.save((err,dislikeResult)=>{
        if(err) return res.json({success:false},err)
     })

     // 2.만약 Like이 이미 클릭되어있다면 Dislike의 1을 줄여준다 (취소)
     Like.findByIdAndDelete(variable) 
        .exec((err, likeResult)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
 });
module.exports = router;
