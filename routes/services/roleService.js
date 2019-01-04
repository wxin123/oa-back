var dao = require("../dao/roleDao.js");
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
    dao.getByIdJoinPrivilege(id,function (rst) {
        callback(resultUtil.renderData(foreachRoleList(rst))) ;
    })
}
//查询列表（分页）
function getPage(req,callback) {
    var originParam = req.query,param = {},search = [],item = [];
    if(originParam.search){
        search.push({key:'name',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'description',val:originParam.search,condition:sqlCon.LIKE});
    }
    if(originParam.level){
        item.push({key:'level',val:originParam.level,condition:sqlCon.EQ});
    }
    param.search = search;
    param.item = item;
    param = paramUtil.page(originParam,param);
    dao.getPage(param,function (rst) {
        callback(rst);
    })
}
//查询列表（不分页）
function getList(req, callback) {
    var originParam = req.query,param = {},search = [],item = [];
    if(originParam.search){
        search.push({key:'name',val:originParam.search,condition:sqlCon.LIKE});
        search.push({key:'description',val:originParam.search,condition:sqlCon.LIKE});
    }
    if(originParam.level){
        item.push({key:'level',val:originParam.level,condition:sqlCon.EQ});
    }
    param.search = search;
    param.item = item;
    dao.getPage(param,function (rst) {
        callback(rst);
    });
}
//新增
function add(req,callback) {
    var originParam = req.body.params,param = {},item = [];
    if(!originParam.name){
        callback(resultUtil.renderError(6001,'名称不能为空'));
    }
    if(!originParam.level){
        callback(resultUtil.renderError(6001,'等级不能为空'));
    }
    item.push({key:'name',val:originParam.name});
    item.push({key:'level',val:originParam.level});
    item.push({key:'description',val:originParam.description||''});
    param.item = item;
    dao.add(param,function (rst) {
        callback(rst);
    });
}
//编辑
function edit(req,callback) {
    var originParam = req.body.params,id = req.params.id,param = {},item = [];
    if(originParam.name){
        item.push({key:'name',val:originParam.name});
    }
    if(originParam.level){
        item.push({key:'level',val:originParam.level});
    }
    if(originParam.description){
        item.push({key:'description',val:originParam.description});
    }
    if(originParam.privilege){
        param.privilege = originParam.privilege;
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

//组装role对象
function foreachRoleList(arr) {
    var a = arr||[],obj = {},privilegeArr = [];
    if(a.length<1){
        return null;
    }
    a.forEach(function (val,idx) {
        privilegeArr.push({name:val.privilegeName,id:val.privilegeId,flag:val.privilegeFlag});
        if(idx==0){
            obj = val;
            delete obj['privilegeName'];
            delete obj['privilegeId'];
            delete obj['privilegeFlag'];
        }
    });
    obj.privilege = privilegeArr;
    return obj;
}

module.exports = {
    getById:getById,
    getPage:getPage,
    getList:getList,
    add:add,
    edit:edit,
    delById:delById
};
