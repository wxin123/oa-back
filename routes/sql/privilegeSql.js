var db = require('../db.js');

function add(param,callback) {
    var sql = "INSERT INTO privilege (`id`, `name`, `flag`, `description`) VALUES ('"+param.id+"', '"+param.name+"', '"+param.flag+"', '"+param.description+"')";
    db.query(sql,callback);
}
function del() {
    
}
function getById() {
    
}
function getList(param,callback) {
    var sql = "",param = {
        name:'',
        flag:'',
        description:''
    };
    sql+="SELECT * FROM privilege where 1=1 ";
    if (param.name){
        sql+=" AND name like %"+param.name+"%";
    }
    if(param.flag){
        sql+=" AND flag like %"+param.flag+"%";
    }
    if(param.description){
        sql+=" AND description like %"+param.description+"%";
    }
    sql+=" ORDER BY id DESC;";
    console.log(sql);
    var result = {};
    db.query(sql,function (err,rows) {
        result.data = rows;
    });
    function func1() {
        db.query(sql,function (err,rows) {
            result.data = rows;
        });
    }
    function func2() {
        db.query(sql,function (err,rows) {
            result.data2 = rows;
        });
    }


}
function getPage(param,callback) {
    var sql = "",param = {
        page:1,
        limit:10,
        name:"",
        id:"",
    };
    sql+="SELECT * FROM privilege ";
    db.query()
}

module.exports = {
    add:add,
    del:del,
    getById:getById,
    getList:getList,
    getPage:getPage
};