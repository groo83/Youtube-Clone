const express = require('express');
const router = express.Router();

const {Comment} = require('../models/Comment');


//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
   
    const comment = new Comment(req.body)
    comment.save((err, comment)=>{
        if(err) return res.json({success:false,err})
        // writer의 모든정보를갖고오기위해 populater는 save일때 쓸수없으므로 find
        Comment.find({'_id': comment._id})
            .populate('writer')
            .exec((err, result)=>{
                if(err) return res.json({success:false,err})
                res.status(200).json({success:true, result})
            })
        
    })
    
})

module.exports = router;
