(function() {
	//关闭左侧菜单：
	
	top.App.toggleSidebarStatus(true);
	
	
    //页面初始化
    var $baseInfo = $('#baseInfo'),
        $modifySchoolTable = $('#modifySchoolTable'),
        $imgs = $('#imgs'),
        $userImages = $('#userImages'),
        $mailList = $('#mailList'),
        $dialNumber = $('#dialNumber'),
        $receiveState = $('#receiveState'),
        $nuclearRecord = $('#nuclearRecord'),
        $nuclearRecordTitle = $('#nuclearRecordTitle'),
        $checkSelect = $('#checkSelect'),
        $checkAppend = $('#checkAppend'),
        $txList = $('#txList'),
        $phoneCheck = $('#phoneCheck'),
        $nuclearRecordWrap = $('#nuclearRecordWrap'),
        $nuclearReportWrap = $('#nuclearReportWrap'),
        $faceCheckBtn = $('#faceCheckBtn'),
        $auditcommitForm = $('#auditcommitForm'),
        $checkAgainData = $('#checkAgainData'),
        $xuexinScore = $('#xuexinScore'),
        $triggerRuleWrap = $('.triggerRuleWrap');


    var checkObj = {
        init: function(data) {
        	//判断data是否为空
        	if(data.data.incomeId==null){
        		var ttext="";
        		var goback=false;
        		if(this.getQuery()['comefrom']=="search"){
        			goback=true;
        			ttext="该进件状态已经改变，请重新查询！"
        		}else{
        			ttext="触发进件规则，进件被拒绝！";
        		}
                top.art.dialog({
                    title: "提示",
                    fixed: true,
                    height:100,
                    width:200,
                    padding: 10,
                    content: ttext,
                    lock: true,
                    button: [
                        {
                            value: '确 定',
                            callback: function () {
                            	if(goback){
                            		Qhistory.goback();
                            	}else{
                                	location.href="modules/auditManagement/list.html";
                                }
                                return true;
                            }
                        }
                    ]

                });

                return false;
        		
        	};
        	var data = data.data;
        	if (this.getQuery()['userAction'] == 'no') {
        		$("#reCheck").hide();
        	}else{
        		window.localStorage.setItem(data.incomeId,1);
        		$auditcommitForm.find("textarea").val(window.localStorage.getItem(data.incomeId+"_save"));
	        	$("#reCheck").click(function(){
	        		top.art.dialog({
						title: "重新验证吗？",	fixed: true,width: 300,height: 50,
						content: "你确定要重新验证吗?",	okValue: "确定",cancelValue: "取消",lock: true,
						ok: function() {
							util.ajax.ajax({
								type: "post",
								data:{
									"incomeId":data.incomeId,
									"userId":data.userId,
									"userCardNo":data.userCardNo,
									"userName":data.userName,
									"faceIdentifyPic":data.faceIdentifyPic
								},
								url: "pep/haixincheck.htmls",
								success: function(ret) {
									top.App.notice('验证成功', 'success', 'top-center');
									util.ajax.ajax({
										url: 'pep/perinfo.htmls',
										data: util.url.getQuery(),
										//type: 'POST',
									    success: function(ret) {
									        if (ret.result == 0) {
									            senstime(ret.data);
									        };
									    }
									});
								}
							});
							return true;
						},
						cancel: function() {
							return true;
						}
					});
				});
			}
        	$mailList.find("div.scroller").slimScroll({
                size: '10px',
                color: '#a1b2bd',
                opacity: .5,
                position: 'right',
                height: 300,
                allowPageScroll: false,
                disableFadeOut: false
            });
        	
        	
            //从综合查询里面链接过来
            if (this.getQuery()['userAction'] == 'no') {
                $('#modifySchoolBtn,#phoneCheck,#auditcommitForm,#panel-c .user-action').hide();
            };

           
            $baseTds = $baseInfo.find('td'),
                $schoolTds = $modifySchoolTable.find('td'),
                $imgs = $imgs;


            //初始化弹层学历
            var $educationSelect = $('#htmlTmp select.education');
            util.ajax.ajax({
                type: "post",
                url: $educationSelect.data('ajax'),
                success: function(ret) {
                    if (ret.result == 0) {
                        var html = '';
                        $.each(ret.data.list, function(i, e) {
                            html += '<option value="' + e.id + '">' + e.name + '</option>';
                        });
                        $educationSelect.append(html);

                        $.each($educationSelect.find('option'), function(i, e) {
                            if ($.trim($(e).val()) == data.educationalLevel) {
                                $(e).attr('selected', true);
                            };
                        });

                    };

                }
            });
            $('input[name=incomeId]').val(data.incomeId);
            $('input[name=userId]').val(data.userId);
            $('input[name=userCardNo]').val(data.userCardNo);
            $('input[name=userName]').val(data.userName);
            $('input[name=faceIdentifyPic]').val(data.faceIdentifyPic);

            $('input[name=educationalLevel]').val(data.educationalLevel);
            $('input[name=inschoolTime]').val(data.inschoolTime);
            $('input[name=graduateYear]').val(data.graduateYear);
            $('input[name=schoolName]').val(data.schoolName);
            $('input[name=schoolId]').val(data.schoolId);
            $('input[name=cityCode]').val(data.cityCode);
            $('input[name=cityName]').val(data.cityName);

            //基本信息
            $baseTds.eq(1).html(data.incomeId);
            $baseTds.eq(3).html(data.userId);
            $baseTds.eq(5).html(data.incomeDateStr);
            $baseTds.eq(7).html(data.userName);
            $baseTds.eq(9).html(data.userCardNo);
            $baseTds.eq(11).html(data.phoneNo);
            $baseTds.eq(13).html(data.emergencyPerson ? data.emergencyPerson : '无');
            $baseTds.eq(15).html(data.emergencyPhone ? data.emergencyPhone : '无');
            $baseTds.eq(17).html(data.referrerCode  ? data.referrerCode  : '无');
            var dicTmp={
            	10:"自动审核中",
            	13:"初审待分配",
            	14:"初审审核中",
            	15:"预通过待分配",
            	16:"预通过审核中",
            	44:"最终拒绝",
                41:"拒绝",
                23:"最终通过",
                22:"通过",
                21:"预通过",
                25:"冻结"
            }
            $baseTds.eq(19).html(dicTmp[data.incomeState]);
            var dicTmp1={1:"渠道",2:"自己注册",3:"喵卡支付"};
            $baseTds.eq(21).html(dicTmp1[data.origin]);
            
			data.xuexinResult.xuexinResult=data.xuexinResult.xuexinResult||"";
           	if(data.xuexinResult.xuexinResult==""){
                $xuexinScore.children('span').html('学信网未验证');
            }else{
              	 if(data.xuexinResult.xuexinResultScore==null || data.xuexinResult.xuexinResultScore==""|| data.xuexinResult.xuexinResultScore=="-1"){
              	 	$xuexinScore.children('span').html('学信网检测异常');
              	 }else{
                	$xuexinScore.children('span').html(data.xuexinResult.xuexinResultScore);
                }
            };
            //$xuexinScore.children('span').html(data.xuexinResult.xuexinResultScore ? data.xuexinResult.xuexinResultScore : '学信网未验证');

            //学籍信息
            $schoolTds.eq(1).html(data.cityName).data('text', data.cityName);
            $schoolTds.eq(3).html(data.schoolName).data('text', data.schoolName);
            var tdEducationalLevel = ['专科', '本科', '硕士', '博士'][data.educationalLevel]
            $schoolTds.eq(5).html(tdEducationalLevel).data('text', tdEducationalLevel);
            $schoolTds.eq(7).html(data.inschoolTime).data('text', data.inschoolTime);
            $schoolTds.eq(9).html(data.graduateYear).data('text', data.graduateYear);
 			$schoolTds.eq(11).html(data.inschoolAge).data('text', data.inschoolAge);
            this.checkResultRender(data.xuexinResult);
			if(data.xuexinResult.xuexinResultScore=="-1"){
				 $("#modifySchoolTable span").hide();
			}
            /*console.info($schoolTds.eq(1).data('text'));
            console.info($schoolTds.eq(3).data('text'));
            console.info($schoolTds.eq(5).data('text'));
            console.info($schoolTds.eq(7).data('text'));
            console.info($schoolTds.eq(9).data('text'));*/
            //图片描述

            
            var senstime=(function(data){
            	//senstime验证
            	if(data.senstimeResult){
            		$imgs.find('td.t').html('senstime人脸识别');
            		if( data.senstimeResult.result==1 ){
            			$imgs.find('td.a').html('通过');
            		}else if( data.senstimeResult.result==2 ){
            			$imgs.find('td.a').html('拒绝');
            		}else if( data.senstimeResult.result==3 ){
            			$imgs.find('td.a').html('人工');
            		};
	                $imgs.find('td.b').html(data.senstimeResult.thirdPartyValue);
            		return;
            	};
	       
            	//海鑫验证 
            	$imgs.find('td.t').html('海鑫人脸识别');
	            //data.haixinResult.haixinScore=data.haixinResult.haixinScore||"";
	            //data.haixinResult.haixinResult=data.haixinResult.haixinResult||"";
//	            if(data.haixinResult.haixinResult==""){
//	            	if(data.haixinResult.haixinScore=="-1"){
//	                	$imgs.find('td.a').html('未验证');
//	                	$imgs.find('td.b').html("未验证");
//	               	}else if(data.haixinResult.haixinScore==""){
//	               		$imgs.find('td.a').html('异常');
//	                	$imgs.find('td.b').html("异常");
//	               	}
//	            }else{
	                $imgs.find('td.a').html(data.haixinResult.haixinResult);
	            //};
	
//	            if(data.haixinResult.haixinScore=="-1"){
//	            	$imgs.find('td.a').html('未验证');
//	                $imgs.find('td.b').html('未验证');
//	            }else if(data.haixinResult.haixinScore==""){
//	        		$imgs.find('td.b').html("异常");
//	        		$imgs.find('td.a').html('异常');
//	            }else{	
	            	$imgs.find('td.b').html(data.haixinResult.haixinScore);
	            //};
            });
          	senstime(data);
            

                
            



            //$imgs.find('td.a').html(data.haixinResult.haixinResult ? data.haixinResult.haixinResult : '未验证');
            //$imgs.find('td.b').html(data.haixinResult.haixinScore ? data.haixinResult.haixinScore : '未验证');



            //用户图片
            var $imgsArr = [{
                title: '海鑫',
                src: data.faceIdentifyPic
            }, {
                title: '身份证正面',
                src: data.idcardAPic
            }, {
                title: '手持身份证正面',
                src: data.handPic
            }, {
                title: '其它图片',
                src: data.otherPic1
            }, {
                title: '其它图片',
                src: data.otherPic2
            }, {
                title: '其它图片',
                src: data.otherPic3
            }];

            $.each($imgsArr, function(i, e) {
                if (e.src) {
                    var html = '<li><a href="javascript:void(0)" rel="lightbox-group" title="' + e.title + '"><img src="' + e.src + '" id="i' + (i + 1) + '"></a><p>' + e.title + '</p></li>';
                    $userImages.append(html)
                };
            });


            //人脸识别ajax验证
            this.faceCheck(data);


            //通讯录初始化
            var $mailListArr = data.addressBooks ? data.addressBooks : [],
                mailListTmp = '';
            $mailList.find('.sub-title span').html($mailListArr.length);
            $.each($mailListArr, function(i, e) {
                mailListTmp += '<tr><td>' + e.relName + '</td><td>' + e.relPhone + '</td></tr>';
            });
            $mailList.find('table').append(mailListTmp);
            //点击查询通讯录
            $txList.find('button').on('click', function(e) {
                var pars = $txList.serialize();
                util.ajax.ajax({
                    url: $txList.data('ajax'),
                    data: pars,
                    success: function(data) {
                        if (data.result == 0) {
                            if (data.data.list) {
                                var html = '';
                                $.each(data.data.list, function(i, e) {
                                    html += '<tr><td>' + e.relName + '</td><td>' + e.relPhone + '</td></tr>';
                                });
                                $mailList.find('table tr:gt(0)').remove();
                                $mailList.find('table').append(html);
                                $mailList.find('.error-tips').html('');
                                $mailList.find('.sub-title span').html(data.data.list.length);
                            } else {
                                $mailList.find('table tr:gt(0)').remove();
                                $mailList.find('.error-tips').html('暂无数据');
                                $mailList.find('.sub-title span').html(0);
                            };
                        };
                    }
                });
                e.preventDefault();
            });


            //审核右侧
            this.rightInfo(data);


            //复制图片到top
            this.topShowImgs();
            //Qbase初始化
            this.qBaseInit();


            //触发规则ajax
            this.triggerRule(data);

        },


        triggerRule: function(data) {
            util.ajax.ajax({
                url: $triggerRuleWrap.data('ajax'),
                data: "incomeId=" + data.incomeId,
                success: function(ret) {
                    var triggerRuleMap_key = "triggerRuleMap";
                    var allRuleMap_key = "allRuleMap";
                    var data = ret.data;
                    var htmlTmp = [];
                    for (var i in data[triggerRuleMap_key]) {
                        var row = data[triggerRuleMap_key][i];
                        htmlTmp.push('<tr><td>' + (parseInt(i) + 1) + '.' + row.name + '&nbsp;&nbsp;<span class="alert-danger">' + ({
                            "1": "通过"
                        }[row.result] || "不通过") + '</span></td></tr>');
                    }
                    $("." + triggerRuleMap_key + " tbody").html(htmlTmp.join("\n"));
                    htmlTmp = [];
                    for (var i in data[allRuleMap_key]) {
                        var row = data[allRuleMap_key][i];
                        htmlTmp.push('<tr><td>' + (parseInt(i) + 1) + '.' + row.name + '&nbsp;&nbsp;<span class="alert-danger">' + ({
                            "1": "通过"
                        }[row.result] || "不通过") + '</span></td></tr>');
                    }
                    $("." + allRuleMap_key + " tbody").html(htmlTmp.join("\n"));
                }
            });
        },


        faceCheck: function(data) {
            $faceCheckBtn.on('click', function() {
                var $form = $(this).parent().children('form');
                util.ajax.ajax({
                    url: $form.data('ajax'),
                    data: $form.serialize(),
                    success: function(data) {
                        if (data.result == 0) {
                            $faceCheckBtn.parents('tr').find('td:eq(1)').html(data.haixinScore);
                            top.App.notice('检测成功', 'success', 'top-center');
                        };
                    }
                })
            });
        },
        rightInfo: function(data) {
            //拨打号码
            var _this = this,
                $dialNumberList = data['select'].dailNumber ? data['select'].dailNumber : [],
                $receiveStateList = data['select'].receiveState ? data['select'].receiveState : [],
                dialNumberListTmp = receiveStateListTmp = '';
            $.each($dialNumberList, function(i, e) {
                dialNumberListTmp += '<option value="' + e + '">' + e + '</option>';
            });
            $.each($receiveStateList, function(i, e) {
                receiveStateListTmp += '<option value="' + e + '">' + e + '</option>';
            });
            $dialNumber.append(dialNumberListTmp);
            $receiveState.append(receiveStateListTmp);

            //初始化电核记录
            this.nuclearRecord(data);
            //ajax电核记录
            $phoneCheck.find('button').on('click', function(e) {
            	// var thiz = this;
            	// if($(thiz).data('status')=="0"){
            	// 	return false;
            	// };
            	// $(thiz).data('status',"0");

                if (!$.trim($dialNumber.val())) {
                    top.App.notice('请选择拨打号码', 'warning', 'top-right');
                    return false;
                } else if (!$.trim($receiveState.val())) {
                    top.App.notice('请选择接听状态', 'warning', 'top-right');
                    return false;
                } else if (!$.trim($phoneCheck.find('textarea').val())) {
                    top.App.notice('请填写电核日志', 'warning', 'top-right');
                    return false;
                };
                util.ajax.ajax({
                    url: $phoneCheck.data('ajax'),
                    data: $phoneCheck.serialize(),
                    success: function(data) {
                        //$(thiz).data('status',"1");
                        if (data.result == 0) {
                            _this.phoneRecordInit(data, 'ajax');
                            top.App.notice('保存成功', 'success', 'top-right');
                            $phoneCheck[0].reset();
                        };
                    }
                });
                e.preventDefault();
            });

            //决策
            this.policyDecision(data);


        },
        getQuery: function() {
            return util.url.getQuery();
        },
        //决策
        policyDecision: function(data) {
            var _this = this,
                $select = data['select'].decision ? data['select'].decision : [],
                html = '';

            $.each($select, function(i, e) {
                html += '<option value="' + e.status + '">' + e.sName + '</option>';
            });
            $checkSelect.append(html).on('change', function() {
                var val = $(this).val(),
                    $inputType = null,
                    _Tmp = '';
                //console.info(val);
                if (val == 21) {
                	var disabled=";"
                	if(_this.getQuery()["tolockdecision"]=="21"){
                		disabled='readonly="readonly"';	
                	}
                    $inputType = $('<input type="text" '+disabled+' maxlength="5" class="changeMoney" name="changeMoney" value="' + $select['21']['value'] + '" />');
                } else if (val == 22) {
                    $inputType = $('<input type="text" maxlength="5" class="changeMoney" name="changeMoney" value="' + $select['22']['value'] + '" />');
                } else if (val == 23) {
                    $inputType = $('<input type="text" maxlength="5" class="changeMoney" name="changeMoney" value="' + $select['23']['value'] + '" />');
                } else if (val == 41) {
                    $inputType = $('<select name="refuseNo" id="refuseNo"><option value="">请选择</option></select>');
                    $.each($select['41']['value'], function(i, e) {
                        _Tmp += '<option value="' + i + '">' + e + '</option>';
                    });
                    $inputType.append(_Tmp);

                } else if (val == 44) {
                    $inputType = $('<select name="refuseNo" id="refuseNo"><option value="">请选择</option></select>');
                    $.each($select['44']['value'], function(i, e) {
                        _Tmp += '<option value="' + i + '">' + e + '</option>';
                    });
                    $inputType.append(_Tmp);

                };

                $checkAppend.html($inputType);
            });



            $auditcommitForm.delegate('.changeMoney', 'keyup', function() {
                var val = $(this).val(),
                    reg1 = /^\d+$/ig,
                    reg2 = /\d+/ig;
                if (!reg1.test(val)) {
                    $(this).val(val.match(reg2) ? val.match(reg2)[0] : '');
                }
            });

            //ajax验证
            var $textarea = $auditcommitForm.find('textarea');
            $auditcommitForm.find('.btn-danger').on('click', function(e) {
            	if($textarea.val()!=""){
            		window.localStorage.setItem(data.incomeId+"_save",$textarea.val());
            		top.App.notice('暂存成功，请尽快处理，如浏览器清除缓存，暂存数据也会被删除！且行且珍惜！', 'warning', 'bottom-right',8);
            	}
            });
            $auditcommitForm.find('button.btn-info').on('click', function(e) {
                var thiz = this;
            	// if($(thiz).data('status')=="0"){
            	// 	return false;
            	// };
            	// $(thiz).data('status',"0");

                if (!$.trim($textarea.val())) {
                    top.App.notice('请填写报告内容！', 'warning', 'bottom-right');
                    return false;
                };
                if (!$.trim($checkSelect.val())) {
                    top.App.notice('请选择决策！', 'warning', 'bottom-right');
                    return false;
                };

                var $changeMoney = $auditcommitForm.find('.changeMoney');
                if ($changeMoney.length) {
                    if (!$.trim($changeMoney.val()) || $.trim($changeMoney.val()) == 0) {
                        top.App.notice('金额不能为空，并且为大于0的数字！', 'warning', 'bottom-right');
                        return false;
                    };
                };

                var $refuseNo = $auditcommitForm.find('#refuseNo');
                if ($refuseNo.length) {
                    if (!$.trim($refuseNo.val())) {
                        top.App.notice('请选择拒绝理由！', 'warning', 'bottom-right');
                        return false;
                    };
                };



                util.ajax.ajax({
                    url: $auditcommitForm.data('ajax'),
                    data: $auditcommitForm.serialize(),
                    success: function(data) {
                        //$(thiz).data('status',"1");
                        if (data.result == 0) {
                            _this.reportInit(data, 'ajax');
                            top.App.notice('添加报告成功！', 'success', 'top-center');
                            $auditcommitForm[0].reset();
                            $auditcommitForm.find('textarea,select,input,button.btn-info').attr('disabled',true);
                            $auditcommitForm.find('button.btn-danger').remove();
                            $(thiz).removeClass('btn-info').addClass('blackBt');
                            //$auditcommitForm.find('select').attr('disabled',true);
                            //$(thiz).attr('disabled',true);
                            if(_this.getQuery()["from"]=="1"){
                            	location.href='list.html?reload=1';
                            }else{
                            	location.href="pre_list.html?reload=1";
                            };
                            
                        };
                    }
                });
                e.preventDefault();
            });


        },

        qBaseInit: function() {
            var _this = this;
            Qpage.edit.main({
                v_selector: function() {
                    return this.parent() + ",[data-type=edit]|tdEdits,#userImages img|imgs";
                },
                v_eventBindType: function() {
                    return this.parent() + " mouseover mouseout mouseenter mouseleave";
                },
                p_imgs_click: function(e, el) {
                    var id = el[0].id;
                    //console.info(id,el,top.$('#'+id))
                    top.$('#' + id).trigger('click');
                },
                p_tdEdits_mouseover: function(e, el) {
                    el.find('span').css({
                        filter: 'Alpha(Opacity=100)',
                        opacity: 1
                    });
                },
                p_tdEdits_mouseout: function(e, el) {
                    el.find('span').css({
                        filter: 'Alpha(Opacity=0)',
                        opacity: 0
                    });
                },
                p_modifySchoolBtn_click: function(e, el) {
                    var html = $("#htmlTmp").html(),
                        _timer = null;
                    var $dialog = top.art.dialog({
                        title: "修改学籍信息",
                        fixed: true,
                        width: 600,
                        padding: 10,
                        content: html,
                        okValue: "提交并检测",
                        cancelValue: "取消",
                        lock: true,
                        initialize: function() {
                            //top.$('#'+name).val(el.data('val'));
                            $('#modifySchoolTable td[class]').each(function(i, e) {
                                top.$('#modifySchoolForm').find('.' + $(e).attr('class')).val($.trim($(e).data('text')));
                            });
                            top.M$("citySchoolSuggest", function() {


                                top.citySuggest();
                                top.schoolSuggest();


                                //时间选择器

                                var $beginTime = top.$('.layer-begin-time'),
                                    $endTime = top.$('.layer-end-time'),
                                    rule = {
                                        format: 'yyyy',
                                        language: 'zh-CN',
                                        autoclose: 1,
                                        minView: 4,
                                        startView: 4,
                                        startDate: "2005",
                                        endDate: "2020"
                                    };
                                $beginTime.datetimepicker(rule).on('changeDate', function(ev) {
                                    var a = ev.date.valueOf(),
                                        d = new Date();
                                    d.setTime(a);
                                    var timefromat = (d.getFullYear() + 1) + '-' + (d.getMonth() + 1) + '-' + d.getDate();

                                    $endTime.attr('disabled', false).datetimepicker("remove").val('').datetimepicker({
                                        format: 'yyyy',
                                        language: 'zh-CN',
                                        autoclose: 1,
                                        minView: 4,
                                        startDate: timefromat,
                                        startView: 4,
                                        endDate: "2020"
                                    }).focus();
                                });


                                _timer = setInterval(function() {
                                    top.$('.datetimepicker .table-condensed').css({
                                        width: 230
                                    }).find('.prev').html('&lt;').css('color', '#999').end().find('.next').html('&gt;').css('color', '#999');
                                }, 50);




                            });

                        },
                        ok: function() {
                            clearInterval(_timer);
                            var status = true,
                                $form = top.$('#modifySchoolForm');
                            //console.info(top.$('#modifySchoolForm').find('input').length,top.$('#modifySchoolForm').find('input:visible').length);
                            $.each(top.$('#modifySchoolForm').find('input:visible'), function(i, e) {
                                if (!$.trim($(e).val())) {
                                    top.$('#modifySchoolForm').find('.tips').css({
                                        color: '#f00'
                                    });
                                    status = false;
                                    return false;
                                };
                            });
                            if (!$.trim($form.find('select.education').val())) {
                                top.$('#modifySchoolForm').find('.tips').css({
                                    color: '#f00'
                                });
                                status = false;
                                return false;
                            };
                            if (status) {
                                //学籍信息 提交并检测
                                $checkAgainData.find('input[name=educationalLevel]').val($form.find('.education').val());
                                $checkAgainData.find('input[name=inschoolTime]').val($form.find('.entranceTime').val());
                                $checkAgainData.find('input[name=graduateYear]').val($form.find('.graduationTime').val());
                                $checkAgainData.find('input[name=cityName]').val($form.find('.city').val());
                                $checkAgainData.find('input[name=schoolName]').val($form.find('.name').val());

                                if ($form.find('#schoolId').length && $.trim($form.find('#schoolId').val())) {
                                    $checkAgainData.find('input[name=schoolId]').val($form.find('#schoolId').val());
                                };
                                if ($form.find('#cityId').length && $.trim($form.find('#cityId').val())) {
                                    $checkAgainData.find('input[name=cityCode]').val($form.find('#cityId').val());
                                };

                           
                                $form.parents('.d-inner').find('.d-state-highlight').attr('disabled','disabled');
                                util.ajax.ajax({
                                    url: $checkAgainData.data('ajax'),
                                    data: $checkAgainData.serialize(),
                                    success: function(ret) {
                                        //console.info(ret);
                                        if (ret.result == 0) {
                                            var data = ret.data;

                                            //_this.checkResultRender(data);

                                            //$xuexinScore.children('span').html(data.xuexinResultScore?data.xuexinResultScore:0);
                                            top.App.notice('修改成功', 'success', 'top-center');
                                            $dialog.close();
                                            location.reload();


                                        };
                                    },
                                    error: function(msg) {
                                        $dialog.close();
                                        top.App.notice(msg, 'error', 'top-center');
                                    }
                                });

                                return false;
                            } else {
                                return false;
                            };
                        },
                        cancel: function() {
                            clearInterval(_timer);
                            return true;
                        }
                    });

                    e.preventDefault();
                },
                p_tdEdits_click: function(e, el) {
                    var text = $.trim(el.html()),
                        name = $.trim(el.data('class'));
                    //console.info(e,text)
                    //    window.parent.$.dialog({
                    //     title: "提示信息",
                    //     fixed: true,
                    //     content: '<div style="width:450px;padding:30px 0; font-size:14px;text-align:center">修改<span style="color:#f00;">'+el.data("name")+'</span>：<input style="height:30px; line-height:30px; width:200px; border:1px solid #ccc; background:#fff;" type="text" value="" id="'+name+'" /></div>',
                    //     okValue: "提交并检测",
                    //     cancelValue: "取消",
                    //     lock: true,
                    //     initialize:function(){
                    //     	top.$('#'+name).val(el.data('val'));
                    //     },
                    //     ok: function() {
                    //         var val = top.$('#'+name).val();
                    //         console.info(top.$('#'+name),666)
                    //         if(val==''){
                    //         	console.info(3232332)
                    //         	return false;
                    //         };
                    //         el.html(val);
                    //     },
                    //     cancel:function(){
                    //     	return true;
                    //     }
                    // });
                }
            });
        },


        //初始化学籍信息检测
        checkResultRender: function(data) {
            var fail = '<span class="fa fa-times-circle"></span>',
                ok = '<span class="fa fa-check-circle"></span>',
                noSure = '<span class="fa fa-question-circle"></span>';

            $modifySchoolTable.find('td span').remove();

            if (data.idcardResult == "N") {
                $('#userNoTips').append(fail);
            };
            if (data.inschoolTimeResult == "T") {
                $modifySchoolTable.find('td.entranceTime').append(ok);
            } else if (data.inschoolTimeResult == "F") {
                $modifySchoolTable.find('td.entranceTime').append(fail);
            } else if (data.inschoolTimeResult == "U") {
                $modifySchoolTable.find('td.entranceTime').append(noSure);
            };

            if (data.collegeNameResult == "T") {
                $modifySchoolTable.find('td.name').append(ok);
            } else if (data.collegeNameResult == "F") {
                $modifySchoolTable.find('td.name').append(fail);
            } else if (data.collegeNameResult == "U") {
                $modifySchoolTable.find('td.name').append(noSure);
            };

            if (data.educationalLevelResult == "T") {
                $modifySchoolTable.find('td#educationalLevelTips').append(ok);
            } else if (data.collegeNameResult == "F") {
                $modifySchoolTable.find('td#educationalLevelTips').append(fail);
            } else if (data.collegeNameResult == "U") {
                $modifySchoolTable.find('td#educationalLevelTips').append(noSure);
            };
        },


        phoneRecordInit: function(data, type) {
            if (type == 'init') {
                var $nuclearRecordList = data.nuclearRecord ? data.nuclearRecord : [];
            } else if (type == 'ajax') {
                var $nuclearRecordList = data.data.list ? data.data.list : [];
            };

            var _Tmp = '',
                $tableObj = $('<table class="table table-bordered table-hover" id="nuclearRecord">\
									<tr>\
										<td width="30" style="background: #ececec;">序号</td>\
										<td width="120" style="background: #ececec;">时间</td>\
										<td width="60" style="background: #ececec;">操作员</td>\
										<td style="background: #ececec;">拨打号码</td>\
										<td width="70" style="background: #ececec;">接听状态</td>\
										<td width="60" style="background: #ececec;">电核日志</td>\
									</tr>\
								</table>');
            if ($nuclearRecordList.length) {
                $.each($nuclearRecordList, function(i, e) {
                    _Tmp += '<tr><td>' + (i + 1) + '</td><td>' + e.phoneDate + '</td><td>' + e.operateName + '</td><td>' + e.phoneNo + '</td><td>' + e.status + '</td><td><a class="detailBtn" style="cursor:pointer;">查看</a></td></tr><tr class="hide"><td colspan="6">' + e.auditDialog + '</td></tr>';
                });
            } else {
                _Tmp = '<tr><td colspan="6" style="text-align:center;">暂无数据</td></tr>';
            };

            $tableObj.append(_Tmp);
            $nuclearRecordWrap.html($tableObj);
        },
        reportInit: function(data, type) {
            if (type == 'init') {
                var $reportListList = data.reportList ? data.reportList : [];
            } else if (type == 'ajax') {
                var $reportListList = data.data.list ? data.data.list : [];
            };
            var _Tmp = '',
                $tableObj = $('<table class="table table-bordered table-hover" id="nuclearRecord">\
										<tr>\
											<td width="30" style="background: #ececec;">序号</td>\
											<td width="120" style="background: #ececec;">时间</td>\
											<td width="60" style="background: #ececec;">姓名</td>\
											<td style="background: #ececec;">授信金额</td>\
											<td style="background: #ececec;">决策结果</td>\
											<td style="background: #ececec;">拒绝码</td>\
											<td width="70" style="background: #ececec;">内容</td>\
										</tr>\
									</table>');
            //console.info($reportListList)
            if ($reportListList.length) {
                $.each($reportListList, function(i, e) {
                	var money=e.changeMoney||0;
                	money=(money/100).toFixed(2);
                    _Tmp += '<tr><td>' + (i + 1) + '</td><td>' + e.reportDate + '</td><td>' + e.operateName + '</td><td>' + money + '</td><td>' + e.decision + '</td><td>' + (e.refuseNo||"") + '</td><td><a class="detailBtn" style="cursor:pointer;">查看</a></td></tr><tr class="hide"><td colspan="7">' + e.context + '</td></tr>';
                });
            } else {
                _Tmp = '<tr><td colspan="7" style="text-align:center;">暂无数据</td></tr>';
            };

            $tableObj.append(_Tmp);
            $nuclearReportWrap.html($tableObj);
        },

        //页面初始化电核记录与报告记录
        nuclearRecord: function(data) {
            var statusType = this.getQuery()['status'];

            this.phoneRecordInit(data, 'init');
            this.reportInit(data, 'init');



            /*$nuclearRecordWrap.delegate('a.recorddetailBtn','click',function(e){
									alert(11)
									var content = $(this).data('content'),
									    dialog = top.art.dialog({
							    		title: "详情",
										fixed: true,
										height:100,
										width:450,
										padding: 10,
										content: '<div style="overflow:hidden; float:left; word-break: break-all; word-wrap: break-word; line-height:22px;">'+content+'</div>',
										lock: true,
										button: [
									        {
									            value: '关 闭',
									            callback: function () {
									               return true;
									            }
									        }
									    ]

									});
									e.preventDefault();
								});*/



            $('#nuclearReportWrap,#nuclearRecordWrap').delegate('a.detailBtn', 'click', function(e) {
                var $tr = $(this).parents('tr').next();
                $tr.toggle();
                if ($tr.is(':visible')) {
                    $(this).html('关闭');
                } else {
                    $(this).html('查看');
                };
                e.preventDefault();
            });



        },



        ajaxGetData: function() {
            var _this = this;
            util.ajax.ajax({
                url: 'pep/perinfo.htmls',
                data: _this.getQuery(),
                //type: 'POST',
                success: function(ret) {
                    if (ret.result == 0) {
                        _this.init(ret);
                    };
                }
            });
        },
        topShowImgs: function() {
            //复制图片到top
            if (top.$('#userImages').length) {
                //console.info(top.$('#userImages').length)
                top.$('#userImages').remove();
            };
            var $cloneData = $userImages.clone();
            $.each($cloneData.find('a'), function(i, e) {
                $(e).attr('href', $(e).find('img').attr('src'));
            });
            top.$('body').append($cloneData);

            top.$("a[rel^='lightbox']").picbox({
                /* Put custom options here */
            }, null, function(el) {
                return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
            });

            $userImages.children('img').on('click', function() {
                var id = this.id;
                //alert(id)
                //alert(top.$('#' + id).length)
                //console.info(id,el,top.$('#'+id))
                top.$('#' + id).trigger('click');
            });
        }
    };

    //初始化数据
    checkObj.ajaxGetData();

})();
