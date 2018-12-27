var express = require('express');
var router = express.Router();
var db = require('./db.js');
var checkLogin = require('./utils/checkLogin.js');

/* GET home page. */
router.post('/login', function(req, res, next) {
    var param =  req.body;
    console.log(param)
    console.log(checkLogin.check(req));
    var sql = "select * form user where username="+param.username;
    /*db.query(sql, function (err, rows) {
        console.log()
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.render("persons", {title: '人员管理', datas: rows, s_name: name, s_age: age});
        }
    });*/
    res.render('index', { title: 'Express' });
});

module.exports = router;