var db = require('./dbconnection');

/**
 *   查询所有任务
 */

exports.queryAllAny = function(cback){
   var tempcon =  db.getCon();
    tempcon.query('SELECT * FROM t_note',cback);
    return tempcon;
}

/**
 *  添加一条任务数据
 */
exports.addAnyDo = function(con, date, money, cback){
    var tempcon =  db.getCon();
    tempcon.query('INSERT INTO t_note(con, date, money) VALUE(?,?,?)',[con, date, money],cback);
    return tempcon;
}

/**
 *   删除一条任务数据
 */
exports.deleteAnyDoById = function(id,cback){
    var tempcon =  db.getCon();
    tempcon.query('DELETE FROM t_note WHERE id =?', [id], cback);
    return tempcon;
}

/**
 *   修改一条任务数据
 */
//exports.updateAnyDoById = function(id,cback){
//    var tempcon =  db.getCon();
//    tempcon.query('UPDATE t_anydo SET f_state=1 WHERE id =?',[id],cback);
//    return tempcon;
//}
