var former = {}, __GetZoneResult_;
former.formDialog = {};
former.available = true; // 请求开关，防止用户快速重复提交表单

former.popWindow = function(eleId, title){
    var ele = document.getElementById(eleId);
    title = title || '信息提交表单';
    if(ele.length < 1){ console.warn('未找到表单。'); return false; }
    former.formDialog = dialog({
        title: title,
        content: ele,
        fixed: true
     });
    former.formDialog.showModal();

    return false;
};

former.addForms = function(str) {

    $(str).each(function(){
        if($(this).length > 0 ){
            $(this).submit(function(event){
                event.preventDefault();

                return former.submitForm($(this)[0]);
            })
        } else {
            console.warn('表单框中未找到<form>表单。 ' + $(this).attr('id'));
        }
    })
}

former.submitForm = function (el){

    // 上一次提交正在进行，等待上一次提交完成
    if (!former.available) {
        alert("正在提交，请稍候。（若长时间无响应，请刷新重试。）");
        return;
    }
    former.available = false; // 开始执行提交，停止响应用户的重复操作

    var data = {};
    data.name = el.name.value;
    data.mobile = el.mobile.value;
    data.iprealaddress = ipaddress;

    if(el.category){
        data.category = el.category.value;
    }
    if(el.user_action){
        data.user_action = el.user_action.value;
    }

    if(!former.checkForm(data.name, data.mobile)){
        alert('请输入正确信息');
        former.available = true;
        return false;
    }

    former.postData(data, former.callback);
}

former.checkForm = function(name, mobile){
    var partten = /^1[3-9]\d{9}$/;
    name = $.trim(name);
    mobile = $.trim(mobile);

    if(!partten.test(mobile)){
        return false;
    } else if(name === ''){
        return false;
    } else {
        return true;
    }
}


former.postData = function (data, callback){
    var url = window.location.href;
    var referrer = document.referrer;
    var mobileAddress = '';

    // 获取百度搜索关键字
    var keyword = getBaiduKeyword(referrer);


    // 获取手机号归属地
    getPhoneAddress(data.mobile); // 跨域GET请求，稍等结果

    setTimeout(function() {

        if(__GetZoneResult_) { // 跨域请求的 taobao 数据
            mobileAddress = __GetZoneResult_.province;
        }

        data = $.extend({
            name: '',
            mobile: '',
            user_action: '',
            category: ''
        }, data);

       var sendData = [
            {'name': 'name', 'value': data.name},
            {'name': 'mobile', 'value': data.mobile},
            {'name': 'mobile_address', 'value': mobileAddress},
            {'name': 'url', 'value': url},
            {'name': 'referrer', 'value': referrer},
            {'name': 'referrer_keyword', 'value': keyword},
            {'name': 'user_action', 'value': data.user_action },
            {'name': 'category', 'value': data.category },
            {'name': 'ip_realaddress', 'value': data.iprealaddress }
        ];

        $.post('http://static.xau8.com/customers/addNew', sendData, callback);

    }, 800);
    
}

former.callback = function(data){
     // 请求已完成
     // 打开提交开关，可以再次发起提交请求
    former.available = true;

    switch(data){
        case 'insert_success':
            if(former.formDialog.open){
                former.formDialog.close();
            }
            former.showDialog('提交成功，稍后客服人员会在第一时间与您取得联系！');
        break;
        case 'mobile_exists':
            if(former.formDialog.open){
                former.formDialog.close();
            }
            former.showDialog('信息不能重复提交，请等待客服人员与您取得联系。');
        break;
        default:
            former.showDialog('提交失败，请检查您的输入或稍候重试。');
        break;
    }

}


former.showDialog = function (content){

    var d = dialog({
        title: '提示',
        content: content,
        okValue: '确定',
        ok: function(){}
    });
    d.showModal();
}


function getBaiduKeyword(referrer) {
    var tmpObj = {}, keyWord = '';
    if(referrer.indexOf('baidu.com') >= 0) {
        var arr  = referrer.split('&').slice(1);

        for(var i=0; i<arr.length; i++){
          var tmpArr = arr[i].split('=');
          
          tmpObj[tmpArr[0]] = tmpArr[1];
        }

        return tmpObj.wd ? decodeURI(tmpObj.wd) : '';
    }

    return '';
}

function getPhoneAddress(mobile) {
    if(mobile.length > 0) {

        // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
        var url = 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=' + mobile;
        // 创建script标签，设置其属性
        var script = document.createElement('script');
        script.setAttribute('src', url);
        // 把script标签加入head，此时调用开始
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}