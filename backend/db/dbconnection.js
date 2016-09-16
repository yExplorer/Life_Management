/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-14
 * Time: 上午10:00
 * To change this template use File | Settings | File Templates.
 */
var mmysql = require('mysql');



/**
 *   创建连接对象
 *
 * @return {*}
 */
exports.getCon = function(){
    var con = mmysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'test'
    });
    return con;
}

/**
 *    关闭数据库
 * @param con
 */
exports.closeCon = function (con){
    con.destroy();
}