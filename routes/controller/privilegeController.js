var express = require('express');
var router = express.Router();
var service = require("../services/privilegeService.js");

/**
 * 根据ID查询
 */
router.get("/info/:id",function (req,res,next) {
    service.getById(req,function (rst) {
        res.send(rst);
    });
});
/**
 * 查询列表（分页）
 */
router.get("/page",function (req,res,next) {
    service.getPage(req,function (rst) {
        res.send(rst);
        {name:"权限2",description:"大幅度",flag:"a"}
    });
});
/**
 * 查询列表（不分页）
 */
router.get("/list",function (req,res,next) {
    service.getList(req,function (rst) {
        res.send(rst);
    });
});
/**
 * 新增
 */
router.post('/add', function(req, res, next) {
    service.add(req,function (rst) {
        res.send(rst);
    });
});
/**
 * 编辑
 */
router.post('/edit/:id', function(req, res, next) {
    service.add(req,function (rst) {
        res.send(rst);
    });
    res.send('respond with a resource');
});
/**
 * 根据ID删除
 */
router.post('/del/:id', function(req, res, next) {
    service.delById(req,function (rst) {
        res.send(rst);
    });
});
module.exports = router;
