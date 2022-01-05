var express = require('express');
var router = express.Router();
var exerciseModel = require('../models/exerciseModel.js');
// var allList = []; //存放所有待辦事項
// var id = 1; //紀錄待辦事項的索引值
router.post('/addExercise', function (req, res) {
    var newExercise = new exerciseModel({
        title: req.body.title,
        status: false
    });
    newExercise.save(function (err, data) {
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
router.get('/getExercise', function (req, res) {
    exerciseModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    })
});

//修改與更新待辦事項
router.post('/updateExercise', function (req, res) {
    console.log(req.body);
    console.log("編號:"+req.body.id);
    var id = req.body.id;
    exerciseModel.findById(id, function(err, data){
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
router.post('/deleteExercise', function (req, res) {
    var id = req.body.id;
    // listModel.deleteOne();
    exerciseModel.remove({_id:id}, function(err, data){
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