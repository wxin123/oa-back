var express = require('express');
var router = express.Router();
var service = require("../services/privilegeService.js");

router.post('/add', function(req, res, next) {
    service.add();
    res.send('respond with a resource');
});
module.exports = router;
