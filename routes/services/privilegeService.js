var sql = require("../sql/privilegeSql.js");

function add() {
    sql.add();
}
function del() {
    sql.del()
}
function getList(req,callback) {
    var param = req.query;
    console.log(param);
    sql.getList(param,function (err,rows) {
        if (err) {

        }else {
            console.log(rows)
            return rows;
        }
    })
}


module.exports = {
    add:add,
    del:del,
    getList:getList
};
