var express = require('express');
var router = express.Router();
var service = require("../services/privilegeService.js");

router.post('/add', function(req, res, next) {
    service.add();
    res.send('respond with a resource');
});
router.get("/list",function (req,res,next) {
    var data = service.getList(req);
    res.send({status:200,data:data});
});
module.exports = router;
