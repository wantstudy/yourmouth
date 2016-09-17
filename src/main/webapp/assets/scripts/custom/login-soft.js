var Login = function () {
	var isie6=function(){if($.browser.version.substring(0,1)=="6"&&$.browser.msie)return true;else return false;};
	var isie7=function(){if($.browser.version.substring(0,1)=="7"&&$.browser.msie)return true;else return false;};
	var isie8=function(){if($.browser.version.substring(0,1)=="8"&&$.browser.msie)return true;else return false;};
	var tabindex;
	var handleLogin = function() {
		var rules=[];
		var message=[];
		rules["nav_login"]={
				username: {
					required: true
				},
				password: {
					required: true
				},
				remember: {
					required: false
				} 					
			}
		message["nav_login"]={
			username: {
				required: "用户名不能为空"
			},
			password: {
				required: "密码不能为空"
			}
		}
		rules["nav_service"]={
				alias: {
					required: true
				},
				pin: {
					required: true
				},
				password:{
					required: true	
				},
				remember: {
					required: false
				} 					
			}
		message["nav_service"]={
				alias: {
					required: "公司简称不能为空"
				},
				pin: {
					required: "考勤号码不能为空"
				},
				password:{
					required: "自助密码不能为空"	
				}
			}	
			
		var validate=function(tab){			
			$('#'+tab).find("form").validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules:rules[tab] ,
	            messages:message[tab],
	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('#'+tab).find("form")).show();
	            },
	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },
	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },
	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },
	            submitHandler: function (form) {
					var user=$("#username").val();
					var alias=$("#alias").val();
					var pin=$("#pin").val();
					if($("input[data-type=nav_login]").attr("checked")=="checked"&&user!="")
						$.cookie("loginname",user);
					else
						$.cookie("loginname",null); 
					if($("input[data-type=nav_service]").attr("checked")=="checked"&&alias!=""&&pin!=""){
						$.cookie("alias",alias);
						$.cookie("alias_pin",pin);
					}else{
						$.cookie("alias",null);
						$.cookie("alias_pin",null);						
					}
	                form.submit();
	            }
	        });
			
		}	
		validate("nav_login");
		tabindex="nav_login";
		var tabc=$('a[data-toggle="tab"]');
		tabc.on('shown.bs.tab', function (e) {
			var tab=$(e.target).attr("href");
			tab=tab.substring(1,tab.length); 
			validate(tab);
			tabindex=tab;
		});
		$('.login-form input').keypress(function (e) {
			if (e.which == 13) {
				var form=$(this).parents("form");
				if (form.validate().form()) {
					form.submit();
				}
				return false;
			}
		});
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {

		function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }


		$("#select2_sample4").select2({
		  	placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });


			$('#select2_sample4').change(function () {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });



         $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                fullname: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please accept TNC first."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
			var ie=false;
			ie=isie6();
			ie=isie7();
			//ie=isie8();
			if(!ie||!$.browser.msie){
				handleLogin();
				handleForgetPassword();
				handleRegister();        	       
				$.backstretch([
					"/express/new/assets/img/bg/1.jpg",
					"/express/new/assets/img/bg/2.jpg",
					"/express/new/assets/img/bg/3.jpg",
					"/express/new/assets/img/bg/4.jpg"
					], {
					  fade: 1000,
					  duration: 5000
				});
				var erro="";
				var tmp=App.getUrl().split("/")[1];
				var tabshow=App.getUrl().split("/")[0];
				if(tmp){
					var adic={"user":"nav_login","emp":"nav_service"};
					$("a[href=#"+adic[tabshow.substring(1)]+"]").trigger("click");
					tabindex=adic[tabshow.substring(1)];
				}
				switch(tmp){
					case "loginerro":
						erro="用户名或密码错误！";
					break;
					case "serverstop":
						erro="该账户已停用,请续交服务费！";
					break;
					case "empty":
						erro="用户名密码不能为空！";
					break;
					case "stopbyadmin":
						erro="权限组用户被超级管理员停用！";
					break;
					case "nopergroup":
						erro="该账号未被分配管理权限，请通知系统管理员！";
					break;
					case "notexits":
						erro="公司简称不存在！";
					break;
					case "loginerro":
						erro="考勤号码或自助密码错误！";
					break;
					case "empty":
						erro="公司简称，密码，考勤号码都不能为空！";
					break;
					default:
					erro=false;	
				}
				if(erro)
				$('.alert-warning', $('#'+tabindex).find("form")).show().find("span").text(erro);
			}else{
				window.location.href="/android_login/login.html";	
			}

        }

    };

}();
$(document).ready(function(e) {
	var loginname=$.cookie("loginname");
	var alias=$.cookie("alias");
	var alias_pin=$.cookie("alias_pin");
	if(loginname!="null"&&typeof loginname!="undefined"){
		$("#username").val($.cookie("loginname"));
		$("input[data-type=nav_login]").attr("checked",true);	
	}
	if(alias!="null"&&alias_pin!="null"&&typeof alias!="undefined"&& typeof alias_pin!="undefined"){
		$("#alias").val($.cookie("alias"));
		$("#pin").val($.cookie("alias_pin"));
		$("input[data-type=nav_service]").attr("checked",true);
	}
	
});