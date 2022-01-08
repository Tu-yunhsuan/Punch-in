var express = require('express');
var router = express.Router();
var habitModel = require('../models/habitModel.js');

router.post('/addHabit', function (req, res) {
    // let array=[];
    // for(let i=0;i<times;i++){
    //     array.push(0);
    // }
    // console.log(array);
    var newHabit = new habitModel({
        title: req.body.title,
        times: req.body.times,
        status: false,
        tag: req.session.user,
        // done: array,
    });
    newHabit.save(function (err, data) {
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
router.get('/getHabit', function (req, res) {
    habitModel.find({tag:req.session.user},function(err, data){
        if(err) console.log(err);
        res.json(data);
    })
});

//修改與更新待辦事項
router.post('/updateHabit', function (req, res) {
    console.log(req.body);
    console.log("編號:"+req.body.id);
    var id = req.body.id;
    habitModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        }else{
            data.title = req.body.title;
            data.times = req.body.times;
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
router.post('/deleteHabit', function (req, res) {
    var id = req.body.id;
    // listModel.deleteOne();
    habitModel.remove({_id:id}, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        }else{
            console.log("刪除成功");
            res.json({"status":0, "msg":"success"});
        }
    });
});

// 紀錄完成次數
// router.post('/doneOnce', function (req, res) {
//     var id = req.body.id;
//     habitModel.findById(id, function(err, data){
//         if(err){
//             console.log(err);
//             res.json({"status":1, "msg":"error"});
//         } else {
//             data.done[num]=1;
//             data.save(function(err){
//                 if(err){
//                     console.log(err);
//                     res.json({"status":1, "msg":"error"});
//                 } else {
//                     res.json({"status":0, "msg":"紀錄成功"});
//                 }
//             });
//         }
//     });
// });
    
module.exports = router;