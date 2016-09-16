/**
 *   做资源的控制分布
 */

var anymodel = require('./backend/db/anydoserver');
var dbcon = require('./backend/db/dbconnection');

/**
 *   查询所有数据
 * @param req
 * @param res
 */
exports.getAllAnyDolist = function(req,res){
    //  查询语句的回调函数
       var callback = function(e,r){
           res.json(r);
           dbcon.closeCon(tempcon);
       };
   var tempcon =  anymodel.queryAllAny(callback);
};

/**
 * 删除数据通过id
 * @param req
 * @param res
 */
exports.deleteAnydoByid = function(req,res){
    var callback = function(e,r){
        res.end();
        dbcon.closeCon(tempcon);
    }
   var tempcon = anymodel.deleteAnyDoById(req.params.id,callback);
}

/**
 *  添加 anydo 任务
 * @param req
 * @param res
 */
exports.addAnyDoinfo = function(req,res){
    var callback = function(e,r){
        res.json(r.insertId);
        res.end();
        dbcon.closeCon(tempcon);
    }
    var con = req.body.inVal;
    var date = req.body.dateTime;
    var money = req.body.money;
    var tempcon = anymodel.addAnyDo(con, date, money, callback);
}
