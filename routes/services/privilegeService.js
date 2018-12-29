var dao = require("../dao/privilegeDao.js");
var paramUtil = require("../utils/paramUitl.js");
var sqlUtil = require('../utils/sqlUtil.js');
var sqlCon = sqlUtil.sqlCondition(),
    sqlType = sqlUtil.sqlType()
;
var resultUtil = require("../utils/resultUtil");

//根据ID查询
function getById(req,callback) {
    var id = req.params.id;
    if(!id){
        callback(resultUtil.renderError(6001,"请检查id是否为空"));
    }
    dao.getById(id,function (rst) {
        callback(rst) ;
    })
}
//查询列表（分页）
function getPage(req,callback) {
    var originParam = req.query,param = {},search = [];
    if(originParam.search){
        search.push({key:'name',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'flag',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'description',val:originParam.search,condition:sqlCon.LIKE});
    }
    param.search = search;
    param = paramUtil.page(originParam,originParam);
    dao.getPage(param,function (rst) {
        callback(rst);
    })
}
//查询列表（不分页）
function getList(req, callback) {
    var originParam = req.query,param = {},search = [];
    if(originParam.search){
        search.push({key:'name',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'flag',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'description',val:originParam.search,condition:sqlCon.LIKE});
    }
    param.search = search;
    dao.getPage(param,function (rst) {
        callback(rst);
    });
}
//新增
function add(req,callback) {
    var originParam = req.body,param = {},item = [];
    if(!originParam.name){
        callback(resultUtil.renderError(6001,'name不能为空'));
    }
    if(!originParam.flag){
        callback(resultUtil.renderError(6001,'flag不能为空'));
    }
    item.push({key:'name',val:originParam.name});
    item.push({key:'flag',val:originParam.flag});
    item.push({key:'description',val:originParam.description||''});
    param.item = item;
    dao.add(param,function (rst) {
        callback(rst);
    });
}
//编辑
function edit(req,callback) {
    var originParam = req.body,id = req.params.id,param = {},item = [];
    if(originParam.name){
        item.push({key:'name',val:originParam.name});
    }
    if(originParam.flag){
        item.push({key:'flag',val:originParam.flag});
    }
    if(originParam.description){
        item.push({key:'description',val:originParam.description});
    }
    param.item = item;
    dao.edit(param,id,function (rst) {
        callback(rst);
    });
}
//根据ID删除
function delById(req,callback) {
    var id = req.params.id;
    if(!id){
        callback(resultUtil.renderError(6001,"请检查id是否为空"));
    }
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
