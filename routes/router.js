var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

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
/* Today List*/
router.get('/todayList', (req, res) => {
  res.render('todayList', {username: req.session.user});
});
/* Group */
router.get('/group', (req, res) => {
  res.render('group');
});
/* Habit */
router.get('/habit', (req, res) => {
  res.render('habit', {username: req.session.user});
});
/* Exercise */
router.get('/exercise', (req, res) => {
  res.render('exercise', {username: req.session.user});
});
/* Study */
router.get('/study', (req, res) => {
  res.render('study', {username: req.session.user});
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
  let query=req.session.user;
  console.log(query);
  User.findOne({username:query},function(err,data){
    if(err) throw err;
    if(data){
      res.render('user',{data: data,username: req.session.user});
    }else{
      res.render('user');
    }
  });
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
        password: req.body.password
    };
    User.findOne({
        username: postData.username,
        password: postData.password,
    }, function (err, data) {
        console.log(data);
        if(err) throw err;
        if(data){
            console.log('登入成功');
            req.session.user = postData.username;
            console.log("username:"+req.session.user);
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
