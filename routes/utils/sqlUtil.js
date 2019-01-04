function sqlType() {
    return {
        STRING: 'string',
        NUMBER: 'number',
        BOOLEAN: 'boolean'
    }
}

function sqlCondition() {
    return {
        LT: 'lt',
        GT: 'gt',
        LET: 'let',
        GET: 'get',
        EQ: 'eq',
        LIKE: 'like'
    }
}

function sql_selectById(table, id) {
    return "SELECT * FROM " + table + " where id=" + id;
}

function sql_deleteById(table, id) {
    return "DELETE FROM " + table + " WHERE id=" + id;
}

function sql_edit(table, id, param) {
    var editSql = "UPDATE " + table + " SET `id` = " + id + ",";
    var items = param.item;
    for (var i = 0; i < items.length; i++) {
        var key = items[i].key, val = items[i].val, type = items[i].type || 'string',
            condition = items[i].condition || 'eq';
        if (type === 'string') {
            val = "'" + val + "'";
        }
        if (type === 'number') {
            val = Number(val);
        }
        if (items.length - 1 == i) {
            editSql += "`" + key + "` = " + val;
        } else {
            editSql += "`" + key + "` = " + val + ",";
        }

    }
    editSql += " WHERE `id`=" + id + "";
    return editSql;
}

function sql_add(table, param) {
    var keyStr = "(", valStr = "(";
    var items = param.item || [];
    for (var i = 0; i < items.length; i++) {
        var key = items[i].key, val = items[i].val, type = items[i].type || 'string',
            condition = items[i].condition || 'EQ';
        if (type === 'string') {
            val = "'" + val + "'";
        }
        if (type === 'number') {
            val = Number(val);
        }
        if (i != items.length - 1) {
            keyStr += "`" + key + "`,";
            valStr += val + ",";
        } else {
            keyStr += "`" + key + "`";
            valStr += val;
        }
    }
    keyStr += ")";
    valStr += ")";
    return "INSERT INTO " + table + keyStr + " VALUES " + valStr;
}

function sql_page(table, param) {
    var listSql = "", countSql = "";
    listSql += "SELECT * FROM " + table + " where 1=1 ";
    countSql += "SELECT COUNT(1) count FROM " + table + " where 1=1 ";
    var items = param.item, page = param.page, search = param.search;
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var key = items[i].key, val = items[i].val, type = items[i].type || "string",
                condition = items[i].condition || "eq";
            if (type === 'string') {
                val = "'" + val + "'";
            }
            if (type === 'number') {
                val = Number(val);
            }
            if (condition === 'eq') {
                listSql += " AND " + key + " =" + val;
                countSql += " AND " + key + " =" + val;
            }
            if (condition === 'like') {
                listSql += " AND " + key + " like '%" + val + "%'";
                countSql += " AND " + key + " like '%" + val + "%'";
            }
            if (condition === 'gt') {
                listSql += " AND " + key + " > " + val;
                countSql += " AND " + key + " >" + val;
            }
            if (condition === 'get') {
                listSql += " AND " + key + " >= " + val;
                countSql += " AND " + key + " >=" + val;
            }
            if (condition === 'lt') {
                listSql += " AND " + key + " < " + val;
                countSql += " AND " + key + " < " + val;
            }
            if (condition === 'let') {
                listSql += " AND " + key + " <= " + val;
                countSql += " AND " + key + " <= " + val;
            }
        }
    }
    if (search) {
        listSql += " AND (";
        countSql += " AND (";
        for (var i = 0; i < search.length; i++) {
            var key = search[i].key, val = search[i].val, type = search[i].type, condition = search[i].condition;
            if (type === 'string') {
                val = "'" + val + "'";
            }
            if (type === 'number') {
                val = Number(val);
            }
            var concat = i == search.length - 1 ? " AND " : " OR ";
            if (condition === 'eq') {
                listSql += key + " =" + val + concat;
                countSql += key + " =" + val + concat;
            }
            if (condition === 'like') {
                listSql += key + " like '%" + val + "%'" + concat;
                countSql += key + " like '%" + val + "%'" + concat;
            }
            if (condition === 'gt') {
                listSql += key + " > " + val + concat;
                countSql += key + " >" + val + concat;
            }
            if (condition === 'get') {
                listSql += key + " >= " + val + concat;
                countSql += key + " >=" + val + concat;
            }
            if (condition === 'lt') {
                listSql += key + " < " + val + concat;
                countSql += key + " < " + val + concat;
            }
            if (condition === 'let') {
                listSql += key + " <= " + val + concat;
                countSql += key + " <= " + val + concat;
            }
        }
        listSql += " 1=1 )";
        countSql += " 1=1 )";
    }
    listSql += " ORDER BY id DESC";
    if (page) {
        listSql += " LIMIT " + (page[0] - 1) * page[1] + "," + page[1];
    }
    listSql += ";";
    countSql += " ORDER BY id DESC;";
    return {
        list: listSql,
        count: countSql
    }
}

function sql_condition(table,param) {
    var sql = "";
    var items = param.item, page = param.page, search = param.search;
    if(items||search){
        sql+=" WHERE (1=1)"
    }
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var key = table+"."+items[i].key, val = items[i].val, type = items[i].type || "string",
                condition = items[i].condition || "eq";
            if (type === 'string') {
                val = "'" + val + "'";
            }
            if (type === 'number') {
                val = Number(val);
            }
            if (condition === 'eq') {
                sql += " AND " + key + " =" + val;
            }
            if (condition === 'like') {
                sql += " AND " + key + " like '%" + val + "%'";
            }
            if (condition === 'gt') {
                sql += " AND " + key + " > " + val;
            }
            if (condition === 'get') {
                sql += " AND " + key + " >= " + val;
            }
            if (condition === 'lt') {
                sql += " AND " + key + " < " + val;
            }
            if (condition === 'let') {
                sql += " AND " + key + " <= " + val;
            }
        }
    }
    if (search) {
        sql += " AND (";
        for (var i = 0; i < search.length; i++) {
            var key = search[i].key, val = search[i].val, type = search[i].type, condition = search[i].condition;
            if (type === 'string') {
                val = "'" + val + "'";
            }
            if (type === 'number') {
                val = Number(val);
            }
            var concat = i == search.length - 1 ? " AND " : " OR ";
            if (condition === 'eq') {
                sql += key + " =" + val + concat;
            }
            if (condition === 'like') {
                sql += key + " like '%" + val + "%'" + concat;
            }
            if (condition === 'gt') {
                sql += key + " >" + val + concat;
            }
            if (condition === 'get') {
                sql += key + " >=" + val + concat;
            }
            if (condition === 'lt') {
                sql += key + " < " + val + concat;
            }
            if (condition === 'let') {
                sql += key + " <= " + val + concat;
            }
        }
        sql += " 1=1 ) ";
    }
    /*if (page) {
        sql += " LIMIT " + (page[0] - 1) * page[1] + "," + page[1]+" ";
    }*/
    return sql
}

function sql_delByField(table,fieldKey,fieldVal) {
    return sql = "DELETE FROM "+table+" WHERE "+fieldKey+"="+fieldVal;
}

function sql_batchInsert(table, param) {
    var sql = "INSERT INTO " + table, keys = " (",vals = "";
    for (var i = 0; i < param.length; i++) {
        var obj = param[i], val = " (";
        for (var item in obj) {
            val += obj[item] + ",";
            if (i < 1) {
                keys += " `" + item + "`,";
            }
        }
        if (i < 1) {
            keys = keys.slice(0, keys.length - 1) + ") ";
        }
        val = val.slice(0, val.length - 1) + ") ,";
        vals+=val;
    }
    vals = vals.slice(0, vals.length - 1);
    sql = sql + keys + " VALUES " + vals + ";";
    return sql;
}

module.exports = {
    sqlType: sqlType,
    sqlCondition: sqlCondition,
    sql_condition: sql_condition,
    sql_selectById: sql_selectById,
    sql_deleteById: sql_deleteById,
    sql_add: sql_add,
    sql_page: sql_page,
    sql_edit: sql_edit,
    sql_delByField:sql_delByField,
    sql_batchInsert:sql_batchInsert
};