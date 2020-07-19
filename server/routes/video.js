const express = require('express');
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { auth } = require("../middleware/auth");
const {Video} = require('../models/Video');
const {Subscriber} = require('../models/Subscriber');

// config option
let storage = multer.diskStorage({
    // 파일 저장 위치 설명
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});
// 파일하나 single로 
const upload = multer({ storage : storage}).single("file");

//=================================
//             Video
//=================================
// ※post 가아닌 get 메소드
router.get('/getVideos', (req, res) => {

    // 비디오를 DB에서 가져와서 클라이언트로 전달
   Video.find() // populate로 모든 비디오 writer 가져옴
        .populate('writer')
        .exec((err, videos)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true,videos})
        })
})
// 클라이언트에서 request 보내면 서버의 index.js로 도착한다.
router.post('/uploadfiles', (req, res) => {

    // req 에서 받은 비디오를 서버에 저장
    // dependency multer다운로드
    upload(req, res, err => {
        if(err){
            return res.json({success:false, err});
        }
        return res.json({ success: true, url: res.req.file.path,fileName:res.req.file.filename})
    })
})
// 비디오 상세화면
router.post('/getVideoDetail', (req, res) => {

    Video.findOne({"_id" : req.body.videoId})
        .populate('writer') //populate로 이용자모든정보가져옴
        .exec((err, videoDetail)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, videoDetail})
        })
})
// 비디오 저장
router.post('/uploadVideo', (req, res) => {

    // 비디오 정보를 DB에 저장
    const video = new Video(req.body) // 클라이언트에서 보낸 variables변수가 req.body에 담김 (writer등)

    // mongodb 메소드로 저장
    video.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true})
    })
})



router.post('/thumbnail', (req, res) => {

    // 썸네일 생성하고 비디오 러닝타임 가져오기
    let filePath='';
    let fileDuration ='';

    // 비디오 정보 가져옴
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })
    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        .on('error',function(err){
            console.error(err);
            return res.json({ success:false,err});

        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

})

router.post('/getSubscriptionVideos', (req, res) => {
    // 계정 아이디로 구독유튜버 찾는다
    Subscriber.find({'userFrom' : req.body.userFrom})
        .exec((err, subscriberInfo)=>{
            if(err) return res.status(400).send(err);

            let subscribedUser =[];

            subscriberInfo.map((subscriber, i) =>{
                subscribedUser.push(subscriber.userTo);
            })
            // 유튜버들의 비디오를 가져옴
            // 여러유튜버들의 id를 가져와야하므로 기존(req.body.id)과 다르게 mongoDB in메소드사용
            Video.find({writer:{ $in: subscribedUser }})
                // writer를이용해 비디오의 모든정보가져옴
                .populate('writer')
                .exec((err, videos)=>{
                    if(err) return res.status(400).send(err);
                    res.status(200).json({success:true, videos})
                })

        })
        
   
})


module.exports = router;
