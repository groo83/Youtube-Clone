const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

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

module.exports = router;
