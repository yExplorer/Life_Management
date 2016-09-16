/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-4-9
 * Time: 下午4:37
 * To change this template use File | Settings | File Templates.
 */

/* 创建anydo 模型 类 */
var anyModel = Backbone.Model.extend({
    urlRoot:'/anydo'    // 设置该模型的请求地址
});

/* 创建集合 类 */
var colanylist =Backbone.Collection.extend({
    model:anyModel,    //  此集合装的模型为  mamnydo 模型
    url:'/todo'
});
//  创建一个 集合实体
var allanydolist = new colanylist();

function getAllData(){
    // 通过 fecth 方法到后台自动同步数据
    allanydolist.fetch({success:function(){
        //  模型的数据从后台获取后 显示到界面中
        var tempstr = '';
        for(var i =0;i<allanydolist.length;i++){
            var noon = allanydolist.at(i).get('date').split(' ')[1] > '12:00' ? 'pm' : 'am';
            tempstr +=  '<div id = msg'+i+' class="things">' +
                '<div class="time z"><h5>'+allanydolist.at(i).get('date').split(' ')[1]+'</h5><h5>'+noon+'</h5></div>' +
                '<div class="circleBox">' +
                '<div class="inCircle"><i class="fa fa-smile-o loc"></i></div></div>' +
                '<div id=sigle'+i+' class="singleBox"><div class="arrow"></div><h6>'+allanydolist.at(i).get('date').split(' ')[0]+'</h6>' +
                '<p>'+allanydolist.at(i).get('con')+'</p><i data-close = '+i+' class="fa fa-times-circle-o close"></i>' +
                '</div><div class="time-border"></div><div class="money-box">'+allanydolist.at(i).get('money')+'$</div>' +
                '</div>';
        }
        $('#main').html(tempstr);
    }});
}

/*  创建视图  */
var cview = Backbone.View.extend({
    el:'#content',
    events:{
        'click .close':'deleteAnyDo',
        'click .submit': 'addAnyDo',
        'mouseover .singleBox': 'showClose',
        'mouseleave .singleBox': 'hideClose'
    },
    deleteAnyDo:function(e){
            var tempid =  $(e.target).data('close');
            $('#msg'+tempid).remove();
            //将该节点所对应的 模型 里的数据同步到后台
            allanydolist.at(tempid).destroy();
    },
    addAnyDo:function(){
        var inStr = $('.inputInfo').val();
        var money = $('.money').val();
        if(inStr!=''&&money!=''){
            $('.inputInfo').val('');
            $('.money').val('');
            var date = getDate();
            var model1 = new anyModel({
                inVal: inStr,
                dateTime: date,
                money: money
            });
            var noon = date.split(' ')[1] > '12:00' ? 'pm' : 'am';
            model1.save(null,{success:function(){
                allanydolist.add(model1);
                //重新加载所有数据
                getAllData();
            }});
        }
    },
    showClose: function(e){
        $(e.target).children('i').fadeIn();
    },
    hideClose: function(e){
        $(e.target).children('i').fadeOut();
    }

});

//  实例化  视图
var viewlistobj = new cview();
//初始化页面数据
$(function(){
    getAllData();
});

function getDate(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    return y+'-'+(m+1)+'-'+d+' '+h+':'+mi;
}