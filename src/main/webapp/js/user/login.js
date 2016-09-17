Qpage.edit.main({
	init:function(){
		$('body').on('click', '[data-close="alert"]', function(e){
            $(this).parent('.alert').hide();
            e.preventDefault();
        });
         if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
		$.backstretch([
				"/img/bg/5.png",
				"/img/bg/8.png",
				"/img/bg/4.png",
				"/img/bg/2.png",
				"/img/bg/3.png",
				"/img/bg/1.png"
			], {
				fade: 1000,
				duration: 5000
			});
	},
    p_getValidateRule: function () {
        return {
        	userId: [
                {reg: /.+/, msg: "请输入账号"}
            ],
            passWord: [
                {reg: /.+/, msg: "请输入密码"}
            ]
        };
    },
    get_ajax_default_data: function () {
        var data = this.p_getData();
//        data.passWord=md5(data.passWord);
        data.passWord=data.passWord;
        return data;
    },
    show_ajax_errmsg:function(msg){
    	if(msg) {
            $("#nav_login .alert-warning span").html(msg);
            $("#nav_login .alert-warning").css("display", "block");
        } 
    },
    p_showErrorMsg: function (msg, el) {
        if (msg) {
            $("#nav_login .alert-danger span").html(msg);
            $("#nav_login .alert-danger").css("display", "block");
        } else {
             $("#nav_login .alert-danger").hide();
        }
    },
    p_cb_submit: function (){
    	location="/index.html";
    }
});
