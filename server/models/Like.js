const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    // 누가 눌렀는지
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    commentId:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    },
    videoID:{
        type:Schema.Types.ObjectId,
        ref:'Video'
    }
    
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like } 