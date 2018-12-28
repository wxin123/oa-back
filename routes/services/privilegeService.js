var dao = require("../dao/privilegeDao.js");

//根据ID查询
function getById(req,callback) {
    var id = req.params.id;
    dao.getById(id,function (rst) {
        callback(rst) ;
    })
}
//查询列表（分页）
function getPage(req,callback) {
    var param = req.query;
    if(!param.page){
        param.page = 1;
    }
    if(!param.limit){
        param.limit = 2;
    }
    dao.getPage(param,function (rst) {
        callback(rst);
    })
}
//查询列表（不分页）
function getList(req, callback) {
    var param = req.query;
    dao.getList(param,function (rst) {
        callback(rst);
    });
}
//新增
function add(req,callback) {
    var param = req.query;
    dao.add(param,function (rst) {
        callback(rst);
    });
}
//编辑
function edit() {
    
}
//根据ID删除
function delById(req,callback) {
    var id = req.params.id;
    dao.delById(id,function (rst) {
        callback(rst);
    });
}

module.exports = {
    getById:getById,
    getPage:getPage,
    getList:getList,
    add:add,
    edit:edit,
    delById:delById
};
