var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

// var mongoose = require('mongoose');            
// mongoose.connect('mongodb://localhost/PunchIn')//連接本地數據庫PunchIn
// var db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {username: req.session.user});
});
router.get('/index', function(req, res, next) {
  res.render('index', {username: req.session.user});
});

// 網站各頁面路由
/* About */
router.get('/about', (req, res) => {
  res.render('about');
});
/* Today */
router.get('/today', (req, res) => {
  res.render('today');
});
/* Group */
router.get('/group', (req, res) => {
  res.render('group');
});
/* Habit */
router.get('/habit', (req, res) => {
  res.render('habit');
});
/* Exercise */
router.get('/exercise', (req, res) => {
  res.render('exercise');
});
/* Study */
router.get('/study', (req, res) => {
  res.render('study');
});
/* Analysis */
router.get('/analysis', (req, res) => {
  res.render('analysis', {username: req.session.user});
});
router.get('/analysis-line', (req, res) => {
  res.render('analysis-line', {username: req.session.user});
});
router.get('/analysis-pie', (req, res) => {
  res.render('analysis-pie', {username: req.session.user});
});
//-----------------------------------------------------------------------------
// 登入註冊
/* user */
router.get('/user', (req, res) => {
  // res.render('user');
  var name = req.body.name;
  var mail = req.body.mail;
  res.render('user', {username: req.session.user, name: name, mail: mail});
});
/* Login */
router.get('/login', (req, res) => {
  res.render('login', {username: req.session.user});
});
/* Sign-up */
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

// 登入註冊功能將寫在 兩個post 路由裡 
router.post('/user/login', function (req, res) {
	  var postData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        mail: req.body.mail
    };
    User.findOne({
        username: postData.username,
        password: postData.password,
    }, function (err, data) {
        if(err) throw err;
        if(data){
            console.log('登入成功');
            req.session.user = postData.username;
            // 使用者資料
            // var user = db.collection('user').findOne({"username":postData.username});
            // if(user){
            //   var user_name=user.name; 
            //   var user_mail=user.mail; 
            //   console.log("AAAname:"+user.name);
            //   console.log("AAAmail:"+user.mail);
            // }
            // db.collection('user').findOne({"username":username}, toArray((err, data)=>{
            //     if(err) throw err;
            //     console.log(data);
            //     db.close;
            // }));
            // req.session.name=user_name;
            // req.session.mail=user_mail;
            console.log("username:"+req.session.user);
            // console.log("name:"+req.session.name);
            // console.log("mail:"+req.session.mail);
            res.redirect('/');  //導回首頁
            // res.send('登入成功');
            // req.session.isLogin = true;
        }else{
            console.log('帳號或密碼錯誤，請再次輸入');
            res.redirect('/user');  //導回user頁面
            // res.send('帳號或密碼錯誤');
        }
    } )
});
router.post('/user/sign-up', function (req, res) {
  // 獲取用戶提交的信息
  var postData = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    mail: req.body.mail
  };
  // 查詢是否被註冊
  User.findOne({username: postData.username}, function (err, data) {
    if (data) {
        res.send('用戶名已被註冊');
    } else {
        // 保存到數據庫
        User.create(postData, function (err, data) {
            if (err) throw err;
            console.log('註冊成功');
            req.session.user = postData.username;
            req.session.name = postData.name;
            req.session.mail = postData.mail;
            res.redirect('/user');
            // res.redirect('/userList');      // 重定向到所用用戶列表
        })
    }
  });
});

// 登出功能
router.post('/user/logout', function (req, res){
  req.session.isLogin = false;
  req.session.destroy();
  res.redirect('/');
  console.log('登出成功');
});


// 獲取所有用戶列表
router.get('/userList', function (req, res) {
  var userList = User.find({}, function (err, data) {
    if (err) throw  err;
    res.send(data)
  });
});


module.exports = router;
