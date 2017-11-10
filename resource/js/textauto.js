/*响应式布局 start*/
function autosize() {
    var dw=$(document).width();
    if(dw >= 640){ dw= 640};
  	 var fz = (dw / 320 * 12);
    $('html').css({'font-size':fz + 'px'});
}
autosize();
/*响应式布局 end*/
 $(window).resize(function(){
	autosize();
});




$(function(){
	//滚动插件
	(function($){
	$.fn.extend({
		Scroll:function(opt,callback){
			//参数初始化
			if(!opt) var opt={};
			var _this=this.eq(0).find("table:first");
			var lineH=_this.find("tr:first").height(), //获取行高
			line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
			speed=opt.speed?parseInt(opt.speed,10):5000, //卷动速度，数值越大，速度越慢（毫秒）
			timer=opt.timer?parseInt(opt.timer,10):5000; //滚动的时间间隔（毫秒）
			if(line==0) line=1;
			var upHeight=0-line*lineH;
			//滚动函数
			scrollUp=function(){
				_this.animate({
					marginTop:upHeight
				},speed,function(){
					for(i=1;i<=line;i++){
						_this.find("tr:first").appendTo(_this);
					}
					_this.css({marginTop:0});
				});
			}
			//鼠标事件绑定
			_this.hover(function(){
				clearInterval(timerID);
			},function(){
				timerID=setInterval("scrollUp()",timer);
			}).mouseout();
		}        
	})
	})(jQuery);
	$(document).ready(function(){
		$("#scrollDiv").Scroll({line:1,speed:500,timer:2000});
	});	


	//随机增加数字
	var num1 = 856633;
	var num2 = 1211;
	$('.zdp .b1').text(num1);
	$('.zdp .b2').text(num2);
	setInterval(function(){
		var adnum = parseInt(20*Math.random());
		num1=num1+adnum;
		num2=num2+adnum;
		$('.zdp .b1').text(num1+adnum);
		$('.zdp .b2').text(num2+adnum);
	},2000)
	
	
	
	
	//输入验证
	//var gpze=/^(((002|000|300|600)[\d]{3})|60[\d]{4})/; 
	//$(".zdt .but").click(function(e) {
		//var gpinput=$(this).siblings('.gpdm').find('input').val();
     //   if(gpinput==""){
		//	alert("请输入正确的股票代码")
		//return false;	
		//}else if(!gpze.test(gpinput)){
		//	alert("股票代码不正确，无法诊断\n请输入6位数的股票代码，以000|002|300|600开头");
		//return false;
	//}else{
	//	$("body").on("touchmove",function(event){
		//	event.preventDefault;
		//}, false);
		//$("#tgName").val(gpinput);
		//$('.cjc').fadeIn();
		//mnan();
		//setTimeout(function(){
		//	$('.cjc').fadeOut(300);
		//	$('.conx').fadeIn();
		//},2500)
	//}
	//});
	
	//关闭
	//$('.conx .close').click(function(){
	//	$('.conx').fadeOut(300);
	//	$("body").off("touchmove");
	//})
	//
})
