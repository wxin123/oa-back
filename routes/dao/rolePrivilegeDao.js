var db = require('../db.js');
var async = require('async');
var sqlUtil = require('../utils/sqlUtil.js');
var resultUtil = require("../utils/resultUtil");
var Table = 'role_privilege';
//根据ID查询对象
function getById(id,callback) {
    var querySql = sqlUtil.sql_selectById(Table,id);
    db.query(querySql, function (err, rst) {
        if (rst.length > 0) {
            callback(resultUtil.renderData(rst[0]));
        }
    });
}
//查询列表
function getPage(param,callback) {
    var sql = sqlUtil.sql_condition('r',param);
    console.log(sql)
    var listSql = {
        list:"select * from oa.role r left join (SELECT rp.id rolePrivilegeId, rp.role_id roleId ,rp.privilege_id privilegeId,p.name privilegeName FROM oa.privilege p INNER JOIN oa.role_privilege rp ON p.id = rp.privilege_id) t  on t.roleId = r.id "+sql,
        count:"select count(1) from (select * from oa.role r left join (SELECT rp.id rolePrivilegeId, rp.role_id roleId ,rp.privilege_id privilegeId,p.name privilegeName FROM oa.privilege p INNER JOIN oa.role_privilege rp ON p.id = rp.privilege_id) t  on t.roleId = r.id" +sql+ " group by r.id) c;"
    };
    async.series([
        function (callback) {
            db.query(listSql.list,function (err,value) {
                if (value){
                    callback(null, value)
                }
                console.log(err)
            });
        },
        function (callback) {
            db.query(listSql.count,function (err,value2) {
                if(value2){
                    callback(null,value2[0].count);
                }
                console.log(err)
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
    var addSql = sqlUtil.sql_add(Table,param);
    console.log(addSql);
    db.query(addSql,function (err,rst) {
        if (!err){
            db.query(sqlUtil.sql_selectById(Table,rst['insertId']), function (err, rst) {
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
    var editSql = sqlUtil.sql_edit(Table,id,param);
    console.log(editSql);
    async.series([
        function (callback) {
            db.query(sqlUtil.sql_selectById(Table,id), function (err, rst) {
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
            db.query(sqlUtil.sql_selectById(Table,id), function (err, rst) {
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
    var querySql = sqlUtil.sql_selectById(Table,id);
    var delSql = sqlUtil.sql_deleteById(Table,id);
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