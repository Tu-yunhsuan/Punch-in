var express = require('express');
var router = express.Router();
var studyModel = require('../models/studyModel.js');
// var allList = []; //存放所有待辦事項
// var id = 1; //紀錄待辦事項的索引值
router.post('/addStudy', function (req, res) {
    var newStudy = new studyModel({
        title: req.body.title,
        status: false,
        tag: req.session.user,
        time: req.body.time
    });
    newStudy.save(function (err, data) {
        if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
            console.log("新增失敗");
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
            console.log("新增成功");
        }
    })
});

//登入畫面擷取所有資料
router.get('/getStudy', function (req, res) {
    studyModel.find({tag:req.session.user},function(err, data){
        if(err) console.log(err);
        res.json(data);
    })
});

//修改與更新待辦事項
router.post('/updateStudy', function (req, res) {
    console.log(req.body);
    console.log("編號:"+req.body.id);
    var id = req.body.id;
    studyModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        }else{
            data.title = req.body.title;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
                }else{
                    res.json({"status":0, "msg":"修改成功"});
                }
            });
        }
    });
});
//刪除待辦事項
router.post('/deleteStudy', function (req, res) {
    var id = req.body.id;
    // listModel.deleteOne();
    studyModel.remove({_id:id}, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        }else{
            console.log("刪除成功");
            res.json({"status":0, "msg":"success"});
        }
    });
});


    
module.exports = router;