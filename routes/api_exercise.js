var express = require('express');
var router = express.Router();
var exerciseModel = require('../models/exerciseModel.js');
var userModel=require('../models/usersModel.js');

router.post('/addExercise', function (req, res) {
    var newExercise = new exerciseModel({
        title: req.body.title,
        status: false,
        tag: req.session.user,
        time: req.body.time
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
    exerciseModel.find({tag:req.session.user}, function(err, data){
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

//完成待辦事項
router.post('/doneExercise', function (req, res) {
    var id = req.body.id;
    exerciseModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            // data.title = req.body.title;
            data.status = req.body.status;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
                } else {
                    res.json({"status":0, "msg":"修改成功"});
                }
            });
        }
    });
});

router.post('/timeExercise', function (req, res) {
    var id = req.body.id;
    exerciseModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            data.time = req.body.time;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
                } else {
                    res.json({"status":0, "msg":"修改成功"});
                }
            });
        }
    });
});
    
module.exports = router;