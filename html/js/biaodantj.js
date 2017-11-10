/**
 * Created by Administrator on 2017/8/16.
 */
/**
 * Created by Administrator on 2017/8/16.
 */
$(document).ready(function(){


     
     $(".report-btn").click(function(){
        $(".SonContent").show();
     });
     $(".cloese").click(function(){
        $(".SonContent").hide();
     });

    $("#newSubmit").click(function(){
        var user_action=$("#user_action").val();
        var phoneY=$("#phoneY").val();
        var phoneName=$("#title").val();
        var phoneNum=$("#mobile").val();
        var pan_one=phoneName.indexOf('<');
        var pan_two=phoneName.indexOf('>');
        if(user_action==''){
            alert("请输入正确的股票代码");
            return false;
        }
        if(phoneName==''){
            alert("请输入姓名");
            return false;
        }
        if(pan_one!=-1||pan_two!=-1){
            alert("姓名里不能含有特殊字符");
            return false;
        }
        if(phoneNum==''){
            alert("电话不能为空");
            return false;
        }


        $('#pop-form').submit();
    });

    $("#newSubmit1").click(function(){
        var user_action1=$("#user_action1").val();
        var phoneY1=$("#phoneY1").val();
        var phoneName=$("#title1").val();
        var phoneNum=$("#mobile1").val();
        var pan_one=phoneName.indexOf('<');
        var pan_two=phoneName.indexOf('>');
        if(user_action1==''){
            alert("请输入正确的股票代码");
            return false;
        }
        if(phoneName==''){
            alert("请输入姓名");
            return false;
        }
        if(pan_one!=-1||pan_two!=-1){
            alert("姓名里不能含有特殊字符");
            return false;
        }
        if(phoneNum==''){
            alert("电话不能为空");
            return false;
        }


        $('#pop-form1').submit();
    });


    former.addForms('#pop-form,#pop-form1');



})