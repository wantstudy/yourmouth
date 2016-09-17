var Index = function () {
    return {
        //main function
        init: function () {

        },

        initIntro: function () {
            if ($.cookie('intro_show')) {
                //return;
            }

            $.cookie('intro_show', 1);
			var intro = introJs();
			intro.setOptions({
				showStepNumbers:false,
			  /* Next button label in tooltip box */
			  nextLabel: '下一步 &rarr;',
			  /* Previous button label in tooltip box */
			  prevLabel: '&larr; 上一步',
			  /* Skip button label in tooltip box */
			  skipLabel: '取消',
			  /* Done button label in tooltip box */
			  doneLabel: '关闭',
				steps: [
					{
					element: "#header_notification_bar",
					intro: "这里会提示您有多少设备在线，多少考勤异常，是否有人员需要同步的"
					},
					/*{
					element: "#header_task_bar",
					intro: "Ok, 我住在这里面，下回您有问题可以再问我",
					position: 'bottom'
					},*/
					{
					element: $(".page-sidebar-menu")[0],
					intro: '这块是导航栏,您可以',
					position: 'right',
					},
					{
					element: $('.page-sidebar .sidebar-toggler')[0],
					intro: "这个按钮可以讲导航栏隐藏",
					position: 'right'
					}
				]
			});
			intro.onchange(function(a){
				console.log(a);
				$(a).pulsate({
                    color: "#dd5131",
                    repeat: 5,
					reach: 20,
                    speed: 800
			    });
			});
			intro.start();

           /* setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Meet Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic is a brand new Responsive Admin Dashboard Template you have always been looking for!',
                    // (string | optional) the image to display on the left
                    image: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 12000);
            }, 2000);

            setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Buy Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic comes with a huge collection of reusable and easy customizable UI components and plugins. Buy Metronic today!',
                    // (string | optional) the image to display on the left
                    image: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 13000);
            }, 8000);*/

            //setTimeout(function () {

               /* $('#styler').pulsate({
                    color: "#bb3319",
                    repeat: 10
                });

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    position: 'top-left',
                    // (string | mandatory) the heading of the notification
                    title: 'Customize Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic allows you to easily customize the theme colors and layout settings.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/avatar1.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 2000);*/
                //$('#header_notification_bar .badge').text("6");
                //$('#header_notification_bar').pulsate({
                //    color: "#dd5131",
                //    repeat: 10,
				//	reach: 20,
                //    speed: 800
			   // });
           // }, 2000);

           /* setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Notification',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 3 new notifications.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/image1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                var number = $('#header_notification_bar .badge').text();
                number = parseInt(number);
                number = number + 3;
                $('#header_notification_bar .badge').text(number);
                $('#header_notification_bar').pulsate({
                    color: "#66bce6",
                    repeat: 5
                });

            }, 40000);

            setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Inbox',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 2 new messages in your inbox.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                var number = $('#header_inbox_bar .badge').text();
                number = parseInt(number);
                number = number + 2;
                $('#header_inbox_bar .badge').text(number);
                $('#header_inbox_bar').pulsate({
                    color: "#dd5131",
                    repeat: 5
                });

            }, 60000);*/
        }

    };

}();

zkui.initpageinfo=function(a,b){
	if(b){
		//save	
	}else{
		return zkui.saas.info[a];	
	}
}
zkui.getPageNo=function(fn){
	zkui.common.getAjaxInfo("/express/setconf/",function(row){	
		row=zkui.common.evalData(row);											 
		if(row!=null){
			zkui.saas={};
			zkui.pagerNoCount=row.page_count;
			zkui.saas.info=row;
			row=null;
			App.init();
			fn();
			//App.init(zkui.initpageinfo);
			/*
			
			
			*/
			
		}
		//zkui.framework.initValidate("companyF");
	});	
};

zkui.framework.detectM=function(){
	var url3="/express/lastactivity/"
	zkui.common.getAjaxInfo(url3,
		function(tmp){
			var msg=zkui.common.evalData(tmp);
			var style="";
			var notibarobj=$("#right_bar").find("li[id=header_notification_bar]");
			var devli=notibarobj.find("ul[id=notify]").find("li[data-name=zkdevice]");
			var devnotii=devli.find("a");
			if(typeof(msg.device.result)!='undefined'){				
				if(msg.result==0&&zkui.olock==0){
					zkui.olock=1;zkui.klock=zkui.clock=0;
					devnotii.html('<i class="fa fa-smile-o"></i>'+msg.device.message);
					devli.removeAttr("data-res");
				}else if(msg.result!=0&&zkui.clock==0){
					zkui.olock=zkui.klock=0;zkui.clock=1;	
					devnotii.html('<i class="fa fa-warning"></i>'+msg.device.message);
					devli.attr("data-res","1");
				}
			}else if(zkui.klock==0){				
				zkui.olock=zkui.clock=0;zkui.klock=1;var strMsg=[];
				var j=0;
				for(i in msg.device){
					var row=msg.device[i];
					if(row.online==-1){
						strMsg[j]=row.name;
						j++;
					}
				}
				devli.attr("data-res","1");
				devnotii.html('<i class="fa fa-warning"></i>您有'+j+'台设备没在线');
			}
			if(msg.warning>0){	
				notibarobj.find("ul[id=notify]").find("li[data-name=usersync]").attr("data-res","1").show().find("a").html('<i class="fa fa-warning"></i>您有'+msg.warning+'位员工的信息需要同步');
				devli.attr("data-res","1");
			}else
				notibarobj.find("ul[id=notify]").find("li[data-name=usersync]").removeAttr("data-res").hide();
			zkui.empanalyse(msg);
		}
	);
	var a=setTimeout("zkui.framework.detectM()",1000*6*3);
}
zkui.empanalyse=function(obj){
	zkui.empanalyse.data=obj;
	var erro=0;
	erro+=obj["errors"];
	//erro+=obj["trans"];
	//erro+=obj["exceps"];			
	var notibar=$("#right_bar").find("li[id=header_notification_bar]");
	var notii=notibar.find("ul[id=notify]").find("li[data-name=tranexception]").find("a");
	if(erro>0){
	notii.parent().attr("data-res","1");
	notii.html('<i class="fa fa-warning"></i>您当月有'+erro+'条考勤异常待处理');
	}else
		notii.parent().removeAttr("data-res").hide();
	var notify_count=notibar.find("li[data-res]").find("i.fa-warning");
	notibar.find("ul.dropdown-menu").find("a").eq(0).html('您有'+notify_count.length+'条通知');	
	notibar.find("a[id=notify_badge]").find("span.badge").html(notify_count.length);
	if(zkui.locker==0)
	if(notify_count.length>0){
		try{
		notibar.find("a[id=notify_badge]").pulsate({
			color: "#dd5131",
			repeat: 25,
			reach: 20,
			speed: 800
		});
		}catch(e){}
	}
	zkui.locker=1;
}
zkui.initpermission=function(){
	var is_admin=$.cookie("is_admin");
	var pin=$.cookie("pin");
	var who=$.cookie("who");
	var management=$.cookie("management");
	if(pin==null||pin==""){
		$("#gotosomewhere").parent().remove();
	}else{
		$("#right_bar").find("a[id=gotosomewhere]").click(function(){
			var url=$(this).attr("data-href");
			var action=$(this).attr("action");
			zkui.common.gotosomewhere(url,action);
		});
	}
	if(is_admin==null||is_admin==1){
		$("#gotosomewhere").parent().hide();
		zkui.getPageNo(function(){
			setTimeout("zkui.framework.detectM()",1000);
			if(pin==null||pin=="")
			zkui.role="root";
			else{
				zkui.role="root_admin";
				if(pin!=""){
					$("#gotosomewhere").attr("data-href","/express/logon/").attr("action","manageToEmployee");
					$("#gotosomewhere").parent().show();
				}else 
					$("#gotosomewhere").parent().remove();
			}
			zkui.initLeftMenu(leftMenuList);		
			if(!App.nohome){
				zkui.handleAdress();
			}			
		});			
	}else{	
		$("#header_notification_bar").remove();
		if(who=="employees"){
			zkui.role="employees";
			if(management=="1"){
				$("#gotosomewhere").attr("data-href","/express/logon/").attr("action","employeeToManage");
				$("#gotosomewhere").html('<i class="fa fa-cog"></i>进入管理中心');
				$("#gotosomewhere").parent().show();
			}else{
				$("#gotosomewhere").parent().remove();
			}
			//leftMenuList=selfLeftList;
			zkui.initLeftMenu(selfLeftList);
			zkui.dataFilter();
			zkui.pagerNoCount=15;
			App.init();
			if(!App.nohome){
				zkui.handleAdress();
			}			
		}else{
			if(pin!=""){
				$("#gotosomewhere").attr("data-href","/express/logon/").attr("action","manageToEmployee");
				$("#gotosomewhere").parent().show();
			}else 
				$("#gotosomewhere").parent().remove();
			zkui.getPageNo(function(){
				setTimeout("zkui.framework.detectM()",1000);
				zkui.locker=1;
				zkui.common.getAjaxInfo("/express/selfpermission/",function(msg){
					zkui.permission_data=zkui.common.evalData(msg);
					//$("#saasHelper").parent().remove();
					//$("#setting").parent().remove();
					zkui.role="administrator";
					zkui.initLeftMenu(leftMenuList,zkui.permission_data);
					if(!App.nohome){
						zkui.handleAdress();
					}			
				});

			});				
		}
	}
}
var leftMenuList={
	indexhome:{
		name:"首页",
		tag:"home",
		icon:"fa fa-home",
		url:"home.html",
		aclass:"ajaxify start"
	},
	personmanage:{
		name:"人员信息",
		tag:"dept",					
		icon:"fa fa-user",	
		content:{			
			dept:{tag:"dept",	url:"zk_person/dept.html",icon:"fa fa-sitemap",name:"部门管理"},
			emp:{tag:"person",	url:"zk_person/person.html",icon:"fa fa-user",name:"员工管理"}, 
			personset:{tag:"personset",	url:"zk_person/personset.html",icon:"fa fa-users",name:"员工同步"}
		}
	},
	tranmanage:{
		name:"考勤管理",
		icon:"fa fa-clock-o",
		tag:"transaction",
		content:{										
			all_transaction:{tag:"transaction",url:"zk_tran/transaction.html",icon:"fa fa-clock-o",name:"考勤记录"},
			daystatus:{tag:"tranexception",url:"zk_tran/tranexception.html",icon:"fa fa-warning",name:"考勤异常"},
			emp_transaction:{tag:"checktran",url:"zk_tran/checktran.html",icon:"fa fa-check-square-o",name:"考勤审批"}
		}
	},
	shiftmanage:{
		name:"排班管理",
		icon:"fa fa-calendar",		
		tag:"shift",
		content:{								
			schedule:{url:"zk_shift/shift.html",tag:"shift",icon:"fa fa-calendar",name:"排班表"},
			deptschedule:{url:"zk_shift/deptshift.html",tag:"deptshift",icon:"fa fa-sitemap",name:"部门排班"},
			empschedule:{url:"zk_shift/personshift.html",tag:"personshift",icon:"fa fa-user",name:"员工排班"},						
			"shift":{url:"zk_shift/shiftmanage.html",tag:"shiftmanage",icon:"fa fa-calendar-o",name:"班次管理"}
		}
		
	},				
	exceptionmanage:{
		name:"请假公出",
		icon:"fa fa-sign-out",		
		tag:"exception",			
		content:{
			exception:{url:"zk_exception/exception.html",tag:"exception",icon:"fa fa-sign-out",name:"请假公出"},
			emp_exception:{url:"zk_exception/checkexception.html",tag:"checkexception",icon:"fa fa-check-square-o",name:"请假审批"}
		}
		
	},
	reportmanage:{
		name:"考勤报表",
		sontag:"calc_sum",
		icon:"fa fa-bar-chart-o",		
		tag:"statement",
		url:"zk_report/index.html"
	},
	
	devicemanage:{
		name:"设备管理",
		sontag:"device",
		icon:"fa fa-cloud",		
		tag:"zkdevice",
		url:"zk_device/zkdevice.html"
	},
	settings:{
		name:"系统设置",
		icon:"fa fa-cogs",	
		tag:"zkset",	
		content:{
			zkset:{url:"zk_setting/zkset.html", tag:"zkset",icon:"fa fa-cloud-upload",name:"发送异常设置"},
			zksrep:{url:"zk_setting/zksrep.html",tag:"zksrep",icon:"fa fa-bar-chart-o",name:"发送报表设置"},
			holiday:{url:"zk_setting/holiday.html",tag:"holiday",icon:"fa fa-coffee",name:"节假日设置"},						
			zkgroup:{url:"zk_setting/zk_power.html",tag:"zk_power",icon:"fa fa-users",name:"权限设置"},
			zkphone:{url:"zk_setting/zkphone.html",tag:"zkphone",icon:"fa  fa-square-o",name:"模板设置"},						
			setbirth:{url:"zk_setting/setbirth.html",tag:"setbirth",icon:"fa fa-gift",name:"生日祝福设置"},						
			shortInfo:{url:"zk_setting/shortInfo.html",tag:"shortInfo",icon:"fa fa-envelope",name:"短消息设置"}
		}
		
	}				
};
var selfLeftList={
	indexhome:{
		name:"首页",
		tag:"home",
		icon:"fa fa-home",
		url:"employee/home.html",
		aclass:"ajaxify start"
	},
	askfortran:{
		name:"考勤自助",
		tag:"askfortran",					
		icon:"fa fa-clock-o",
		content:{			
			askfortran:{tag:"askfortran",url:"employee/askfortran.html",icon:"fa  fa-clipboard",name:"补签卡申请"},
			transaction:{tag:"transaction",	url:"employee/transaction.html",icon:"fa fa-clock-o",name:"考勤查询"}, 
			tranexception:{tag:"tranexception",	url:"employee/tranexception.html",icon:"fa fa-warning",name:"考勤异常"},
			phoneexception:{tag:"phoneexception",url:"employee/phoneexception.html",icon:"fa fa-envelope",name:"短消息查询"}									
		}
	},
	askforexception:{ 
		name:"请假公出",
		tag:"askforexception",					
		icon:"fa fa-sign-out",
		content:{			
			askforexception:{tag:"askforexception",url:"employee/askforexception.html",icon:"fa  fa-clipboard",name:"请假公出申请"},
			exception:{tag:"exception",	url:"employee/exception.html",icon:"fa fa-sign-out",name:"请假公出查询"} 
		}
	},
	statement_z:{
		name:"考勤报表", 
		sontag:"statement_z",
		icon:"fa fa-bar-chart-o",		
		tag:"statement_z",
		url:"employee/statement_z.html"
	}
	
};
zkui.inituser=function(){
	if ($.cookie) {
		var username=$.cookie('user'); 
		$("#right_bar").find("span.username").html(username);
		$("#right_bar").find("a[id=setting]").click(function(){
			var title=$(this).text();
			zkui.common.getAjaxInfo("/express/new/zk_setting/setting.html",function(a){
				$("ul.page-sidebar-menu").find("li.active").removeClass("active");
				var pageContentBody = $('.page-content .page-content-body');						
				pageContentBody.html(a);
			});
		});
	}
}
$(document).ready(function(){
	zkui.stopEnterkey();
	App.init();
	zkui.ajaxSetup();
	zkui.pre="p=1";
	zkui.intPageNo=1;
	zkui.oldPageNo=1;
	zkui.totalPage=0;
	zkui.icount=0;
	zkui.olock=0;
	zkui.clock=0;
	zkui.klock=0;
	zkui.locker=0;
	$("#right_bar").find("li[id=header_notification_bar]").find("ul[id=notify]").find("li").find("a[href]").bind("click",function(e){
		window.location=$(this).attr("tag");
		zkui.handleAdress();	
	});
	zkui.initLeftMenu(leftMenuList);
	//zkui.initpermission();
	//zkui.inituser();
	
});
