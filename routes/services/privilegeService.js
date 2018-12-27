var sql = require("../sql/privilegeSql.js");

function add() {
    sql.add();
}
function del() {
    sql.del()
}


module.exports = {
    add:add,
    del:del
};
