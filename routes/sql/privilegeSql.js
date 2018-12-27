var db = require('../db.js');

function add(param,callback) {
    var sql = "INSERT INTO privilege (`id`, `name`, `flag`, `description`) VALUES ('"+param.id+"', '"+param.name+"', '"+param.flag+"', '"+param.description+"')";
    db.query(sql,callback);
}
function del() {
    
}
function getById() {
    
}
function getList() {
    
}
function getPage() {
    
}

module.exports = {
    add:add,
    del:del,
    getById:getById,
    getList:getList,
    getPage:getPage
};