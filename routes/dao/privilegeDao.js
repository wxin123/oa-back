var db = require('../db.js');
var async = require('async');

//根据ID查询对象
function getById(id,callback) {
    var querySql = "SELECT * FROM privilege where id="+id;
    var result = {
        status:200,
        message:'成功'
    };
    db.query(querySql, function (err, rst) {
        if (rst.length > 0) {
            result.status = rst[0];
        }
        callback(result);
    });
}
//查询列表（分页）
function getPage(param,callback) {
    var listSql = "",countSql = "";
    listSql+="SELECT * FROM privilege where 1=1 ";
    countSql+="SELECT COUNT(1) count FROM privilege where 1=1 ";
    if (param.name){
        listSql+=" AND name like '%"+param.name+"%'";
        countSql+=" AND name like '%"+param.name+"%'";
    }
    if(param.flag){
        listSql+=" AND flag like '%"+param.flag+"%'";
        countSql+=" AND flag like '%"+param.flag+"%'";
    }
    if(param.description){
        listSql+=" AND description like '%"+param.description+"%'";
        countSql+=" AND description like '%"+param.description+"%'";
    }
    listSql+=" ORDER BY id DESC";
    listSql +=" LIMIT "+(param.page-1)*param.limit+","+param.limit+";";
    countSql+=" ORDER BY id DESC;";
    var result = {
        count:0,
        list:[]
    };
    new Promise(function (resolve) {
        resolve(console.log(listSql));
    }).then(function () {
        db.query(listSql,function (err,value) {
            if (value){
                result.list = value;
            }
        })
    }).then(function () {
        db.query(countSql,function (err,value2) {
            if(value2){
                result.count = value2[0].count;
            }
            callback(result);
        });
    }).catch(function (reason) {
        result.messge = reason;
    });
}
//查询列表（不分页）
function getList(param,callback) {
    //dao
    var listSql = "",countSql = "";
    listSql+="SELECT * FROM privilege where 1=1 ";
    countSql+="SELECT COUNT(1) count FROM privilege where 1=1 ";
    if (param.name){
        listSql+=" AND name like '%"+param.name+"%'";
        countSql+=" AND name like '%"+param.name+"%'";
    }
    if(param.flag){
        listSql+=" AND flag like '%"+param.flag+"%'";
        countSql+=" AND flag like '%"+param.flag+"%'";
    }
    if(param.description){
        listSql+=" AND description like '%"+param.description+"%'";
        countSql+=" AND description like '%"+param.description+"%'";
    }
    listSql+=" ORDER BY id DESC;";
    countSql+=" ORDER BY id DESC;";
    var result = {
        count:0,
        list:[]
    };
    new Promise(function (resolve) {
        resolve(console.log(listSql));
    }).then(function () {
        db.query(listSql,function (err,value) {
            if (value){
                result.list = value;
            }
        })
    }).then(function () {
        db.query(countSql,function (err,value2) {
            if(value2){
                result.count = value2[0].count;
            }
            callback(result);
        });
    }).catch(function (reason) {
        result.messge = reason;
    });
}
//新增
function add(param,callback) {
    var addSql = "INSERT INTO privilege (`id`, `name`, `flag`, `description`) VALUES ('"+param.id+"', '"+param.name+"', '"+param.flag+"', '"+param.description+"')";
    db.query(addSql,function (err,rst) {
        console.log(JSON.stringify(rst));
    });
}
//编辑
function edit(param,callback) {

}
//根据ID删除
function delById(id,callback) {
    var querySql = "SELECT * FROM privilege WHERE id="+id;
    var delSql = "DELETE FROM privilege WHERE id="+id;
    var result = {};
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
        result.status = 200;
        result.message = '成功';
        result.data = rst[0];
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