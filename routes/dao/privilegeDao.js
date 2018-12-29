var db = require('../db.js');
var async = require('async');
var sqlUtil = require('../utils/sqlUtil.js');
var resultUtil = require("../utils/resultUtil");

//根据ID查询对象
function getById(id,callback) {
    var querySql = sqlUtil.sql_selectById('privilege',id);
    db.query(querySql, function (err, rst) {
        if (rst.length > 0) {
            callback(resultUtil.renderData(rst[0]));
        }
    });
}
//查询列表
function getPage(param,callback) {
    var listSql = sqlUtil.sql_page('privilege',param);
    async.series([
        function (callback) {
            db.query(listSql.list,function (err,value) {
                if (value){
                    callback(null, value)
                }
            });
        },
        function (callback) {
            db.query(listSql.count,function (err,value2) {
                if(value2){
                    callback(null,value2[0].count);
                }
            });
        }
    ],function (err,rst) {
        console.log(listSql);
        if(err){
            callback(resultUtil.renderError(6001,err));
        }else {
            callback(resultUtil.renderList(rst[0],rst[1]));
        }
    });

}
//新增
function add(param,callback) {
    var addSql = sqlUtil.sql_add('privilege',param);
    console.log(addSql);
    db.query(addSql,function (err,rst) {
        if (!err){
            db.query(sqlUtil.sql_selectById('privilege',rst['insertId']), function (err, rst) {
                if (rst.length < 1) {
                    callback(resultUtil.renderError(6001,'查无结果'));
                } else {
                    callback(resultUtil.renderData(rst[0]));
                }
            });
        }
    });
}
//编辑
function edit(param,id,callback) {
    var editSql = sqlUtil.sql_edit('privilege',id,param);
    console.log(editSql);
    async.series([
        function (callback) {
            db.query(sqlUtil.sql_selectById('privilege',id), function (err, rst) {
                if (rst.length < 1) {
                    callback('查无结果', null);
                } else {
                    callback(null, rst[0])
                }
            });
        },
        function (callback) {
            db.query(editSql,function (err,rst) {
                callback(null,rst);
            })
        },
        function (callback) {
            db.query(sqlUtil.sql_selectById('privilege',id), function (err, rst) {
                if (rst.length < 1) {
                    callback('查无结果', null);
                } else {
                    callback(null, rst[0])
                }
            });
        }
    ],function (err,rst) {
        if(err){
            callback(6001,err)
        }else {
            callback(resultUtil.renderData(rst[2]));
        }
    });

}
//根据ID删除
function delById(id,callback) {
    var querySql = sqlUtil.sql_selectById('privilege',id);
    var delSql = sqlUtil.sql_deleteById('privilege',id);
    async.series([
        function (callback) {
            db.query(querySql, function (err, rst) {
                if (rst.length < 1) {
                    callback('查无结果', null);
                } else {
                    callback(null, rst[0])
                }
            });
        },
        function (callback) {
            db.query(delSql,function (err,rst) {
                callback(null,null);
            })
        }
    ],function (err,rst) {
        if(err){
            callback(resultUtil.renderError(6001,err));
        }else {
            callback(resultUtil.renderData(rst[0]));
        }
    });
}

module.exports = {
    getById:getById,
    getPage:getPage,
    add:add,
    edit:edit,
    delById:delById
};