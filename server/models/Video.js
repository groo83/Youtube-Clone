const mongoose = require('mongoose');
const Schema = mongoose.Schema

const videoSchema = mongoose.Schema({
    // 필드 정의
    // type schema : User의 email 등 정보를 가져올 수 있다.
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath : {
        type: String,
    },
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }