var express = require('express');
var router = express.Router();
var db = require("./db.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function (req, res, next) {
  console.log(req.body);
    db.query('select * from user', function (err, rows) {
        console.log(rows);
        // res.render({title: '人员管理', datas: []})
        if (err) {
            res.send({title: '人员管理', datas: []});  // this renders "views/persons.html"
        } else {

            res.send({title: '人员管理', datas: rows});
        }
    })
});

router.post('/test', function (req, res, next) {
    console.log(req.body);
    console.log('post')
    db.query('select * from user', function (err, rows) {
        console.log(rows);
        // res.render({title: '人员管理', datas: []})
        if (err) {
            res.send({title: '人员管理', datas: []});  // this renders "views/persons.html"
        } else {

            res.send({title: '人员管理', datas: rows});
        }
    })
});

module.exports = router;
