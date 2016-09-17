
var TableAjax = function () {
	var grid;
    var initPickers = function () {
		$('.date-picker').each(function(index, element) {
			var form=$(this).attr("data-format");
			$(this).css("cursor","default");
			$(this).datepicker({
            	rtl: App.isRTL(),
            	autoclose: true,
				format:form
        	});
		});
    };
	
	TableAjax.operlist=[];
	var formatter=function(conf){
		var ary=[];			
		if(conf.multiselect)
		ary.push({
			"aTargets": [0],
			"bSortable":false,
			"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
				if(conf.multiselect)
				$(nTd).html('<input type="checkbox" name="id[]" value="'+oData.pin+'">');
				$(nTd).find("input").data("row",oData);
			}
		});
		var j=0;
		for(var i=0;i<conf.colModel.length;i++){
			var obj={};
			var tary=[];
			var row=conf.colModel[i];
				if(conf.multiselect){
					j=i+1;
				}else{
					j=i;
				}
				tary.push(j);
				obj.aTargets=tary;
				obj.bSortable=row.sortable==false?false:true;
				if(typeof row.formatter!="undefined"){
				obj.fnCreatedCell=(function(row){
					return function(nTd, sData, oData, iRow, iCol){
						$(nTd).html(row.formatter(sData,nTd,oData));
					}
				})(row);
				}
				ary.push(obj);
		}
		return 	ary;		
	};
    var handleRecords = function(conf) {
		var header=$("tr[role=row]");
		var tt=[];
		var yy=[];
		var ii=0;
		if(conf.multiselect){
			tt.push('<th width="1%"><input type="checkbox" class="group-checkable"></th>');	
			ii=1;
		}
		if(!conf.colselect)
		$("#column_toggler").prev("button").hide();
		for(var i in conf.colNames){
			var row=conf.colNames[i];
			var colModel=conf.colModel[i];
			tt.push('<th width="15%">'+row+'</th>');	
			if(colModel.name!=null&&conf.colselect)	
			yy.push('<label><input type="checkbox" checked data-column="'+ii+'">'+row+'</label>');				
			ii++;
		}
		$("tr.heading[role=row]").html(tt.join("\n"));
		$("#column_toggler").html(yy.join("\n"));
        grid = new jqgrid();
		grid.init({
			src: $("#datatable_ajax"),
			onSuccess: function(grid) {
		
			},
			onError: function(grid) {
				
			},
			dataTable: {  
				"iDisplayLength": parseInt(zkui.pagerNoCount), 
				"bServerSide": true, 
				"sAjaxSource": conf.url,
				"sServerMethod":"get",				
				"sAjaxDataProp": "rows",
				"aoColumns": (function(conf){
					var tmp=[];							
					if(conf.multiselect)
						tmp.push({"mData":null});
					for(var i in conf.colModel){
						var tmpp={};
						var roww=conf.colModel[i];														
						tmpp.mData=roww.name;
						tmp.push(tmpp);
					} 
					return tmp;						
					})(conf),				
				"aoColumnDefs": formatter(conf),
				"fnRowCallback":function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
					conf.afterInsertRow(nRow,aData,iDisplayIndex);
					if(conf.ondblClickRow)
					$(nRow).dblclick(function(){
						conf.ondblClickRow(nRow,aData,iDisplayIndex);
					});
				},
				fnInitComplete:function(oSettings){
					if(conf.gridComplete)
					conf.gridComplete();
				},
									
				"bStateSave":true,
				"fnStateSaveParams": function (settings, data) {
					data.aoSearchCols = null;
					data.oSearch=null;
				},
				"fnStateLoaded": function (settings,data) {
					var cols=data.abVisCols;
					$("#column_toggler").find("input").each(function(index, element) {
						var i=0;
						if(conf.multiselect) i=1;else i=0;
						$(this).attr("checked",cols[index+i]);
					});
				}
			}
		});
		$("#buttonlist").on('click', '.table-group-action-open-search', function(e){
			e.preventDefault();
			$(this).hide();
			$("#search_action").show("fast");
		});
		$("button.table-group-action-close-search").click(function(e){
			e.preventDefault();
			$(this).parents("form").parent().hide("fast");
			$("button.table-group-action-open-search").show();
		});
		$("button.table-group-action-return").click(function(e){
			e.preventDefault();
			zkui.reg_search()[1]();
			grid.getDataTable().fnDraw();
		});
		$("button.table-group-action-search").click(function(e){
			e.preventDefault();
			zkui.dosearch();
		});
		grid.getTableWrapper().on('click', '.table-group-action-submit', function(e){
			e.preventDefault();
			var action = $(".table-group-action-input", grid.getTableWrapper());
			if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
				grid.addAjaxParam("sAction", "group_action");
				grid.addAjaxParam("sGroupActionName", action.val());
				grid.addAjaxParam("sGroupActionFn", TableAjax.operlist);
				var records = grid.getSelectedRows();
				for (var i in records) {
					grid.addAjaxParam(records[i]["name"], records[i]["value"]);  
					grid.addAjaxParam("row", records[i]["data"]);  
				}
				grid.getDataTable().fnDraw();
				grid.clearAjaxParams();
			} else if (action.val() == "") {
				App.alert({type: 'danger', icon: 'warning', message: '请选择操作项', container: grid.getTableWrapper(), place: 'prepend',closeInSeconds:5});
			} else if (grid.getSelectedRowsCount() === 0) {
				App.alert({type: 'danger', icon: 'warning', message: '请选择要操作的记录', container: grid.getTableWrapper(), place: 'prepend',closeInSeconds:5});
			}
		});
    };

	var operationbar=function(obj,opt){
		var selectlist=$(".table-group-action-input");
		var buttonlist=[];
		var buttontmp=[];
		if(opt.showsearchnow)
			buttontmp.push('<button style="display:none" class="btn default blue-stripe table-group-action-open-search fade in"><i class="fa fa-search"></i> <span class="hidden-480">查询</span></button>');
		else if(opt.showsearch)
			buttontmp.push('<button class="btn default blue-stripe table-group-action-open-search fade in"><i class="fa fa-search"></i><span class="hidden-480">查询</span></button>');
		var selecthtml=[''+
		'<option value="">请选择操作...</option>'];
		var buttonhtml=[];
		
		
		var show=true;
		var permission=zkui.framework.getoperation();
		if(permission.length==0) show=false; 
		else if(permission[0]==0){ show=true; permission=[];}
		for(var i in obj){
			var row=obj[i];
			if(row!=null){
				if(typeof row=="object"){
					if(row.type=="operation"){
						for(var i in permission){
							if(permission[i]==row.action){
								show=true;
								break;
							}else
								show=false;			
						}
						if(show){
							if(typeof row.selectIndex!="undefined")
							TableAjax.operlist.push(row);
							else
							buttonlist.push(row);
						}
					}
				}
			}		
		}
		TableAjax.operlist.sort(function(a,b){return a.selectIndex-b.selectIndex});
		buttonlist.sort(function(a,b){return a.buttonIndex-b.buttonIndex});
		if(TableAjax.operlist.length==1) selecthtml=[];
		for(var i in TableAjax.operlist){			
			var row=TableAjax.operlist[i];
			selecthtml.push('<option value="'+row.action+'">'+row.text+'</option>');
		}
		for(var i in buttonlist){
			var row=buttonlist[i];
			buttontmp.push('<button action="'+row.action+'" data-action="operation" class="btn default yellow-stripe"><i class="fa '+row.iconCss+'"></i><span class="hidden-480"> '+row.text+'</span></button>');
		}		
		selectlist.html(selecthtml.join("\n"));
		if(selectlist.find("option").length==1&&selectlist.find("option").attr("value")==""){ 
			$("select.table-group-action-input,button.table-group-action-submit").hide();
			zkui.conf.multiselect=false;
		} 
		$("#buttonlist").html(buttontmp.join("\n"));
		$("#buttonlist").find("button[data-action=operation]").each(function(i){
			$(this).bind("click",function(){
				buttonlist[i].operationFn();
			});
		});
	};
    return {
        init: function (obj) {
            initPickers();
			obj.initAjax();
			operationbar(obj,zkui.conf);
            handleRecords(zkui.conf);
			if(!zkui.conf.selectoperation)
				$("select.table-group-action-input,button.table-group-action-submit").hide();
        },
		getgrid:function(){
			return grid;		
		}
    };
};
var zkui={};
zkui.conf={};
zkui.ajaxCount=0;

zkui.init=function(o){
	zkui.table=new TableAjax();
	zkui.table.init(o);
};
zkui.setpermission=function(btnlist){
	btnlist=btnlist||$("#buttonlist").find("button[action]");
	var show=true;
	var dellist=[];
	var permission=zkui.framework.getoperation();
	if(permission.length==0) show=false; 
	else if(permission[0]==0) {show=true; permission=[];}
	btnlist.each(function(index, element) {
		for(var i in permission){
			if(permission[i]!=$(this).attr("action")){
				show=false;	
			}else{
				show=true;					
				break;
			}
		}
		if(!show) dellist.push(index);
	});
	for(var i in dellist){
		btnlist.eq(dellist[i]).remove();
	}
	
};
zkui.dosearch=function(){
	zkui.table.getgrid().addAjaxParam("sAction", "filter");
	var param=zkui.reg_search()[0]();
	var strtmp="";
	var isadd=true;
	if(param.length>1)
	for(var i=0;i<param.length;i++){
		strtmp+=param[i]+(i==param.length-1?"":"&");
	}
	else{
		isadd=false;
		strtmp=param[0];
	}
	zkui.table.getgrid().addAjaxParam("is_search_url_add",isadd);
	zkui.table.getgrid().addAjaxParam("search_url_add",strtmp);
	zkui.table.getgrid().getDataTable().fnDraw();
	zkui.table.getgrid().clearAjaxParams();			
}
zkui.reg_search=function(opt){
	if(typeof opt=="undefined"){		
		return [zkui.searchFn,zkui.initSearchFn];
	}else{
		zkui.initSearchFn=opt.searchInit;	
		zkui.searchFn=opt.searchFn;
	}
};
/*zkui.framework.initValidate=function(formID){
	var reg="";
	$("#"+formID+" [name='easyTip']").each(function(){
		var tipObj=$(this);
		tipObj.addClass("onShow");
		tipObj.prevAll("input[type!=hidden]").eq(0).bind("mouseover mouseleave",function(event){
			if(event.type=="mouseleave"){
				$("div[id=tipMsg]").fadeOut("fast");
			}else
			if($(this).hasClass("inputErroShow"))
			zkui.framework.validate.doErroOper($(this),tipObj,true);
		});
		tipObj.bind("mouseover mouseleave",function(event){
			if(event.type=="mouseleave"){
				$("div[id=tipMsg]").fadeOut("fast");
			}else{
			var obj=$(this).prevAll("input[type!=hidden]").eq(0);
			if(obj.hasClass("inputErroShow"))
			zkui.framework.validate.doErroOper(obj,tipObj,true);
			}
		});
	});
	$("#"+formID+" input").blur(function(){
		zkui.framework.validate($(this));
	});
	$("#"+formID+" input").focus(function(){
		$(this).nextAll("[name='easyTip']").eq(0).addClass("onFocus");				   
	});
}*/
zkui.framework={
	loadGrid:function(settings){
		zkui.conf.id=settings.id;
		zkui.conf.url=settings.url;	
		zkui.conf.colNames=settings.colNames;
		zkui.conf.colModel=settings.colModel
		zkui.conf.afterInsertRow=settings.afterInsertRow;
		zkui.conf.multiselect=settings.multiselect;
		zkui.conf.loadComplete=settings.loadComplete;
		zkui.conf.ondblClickRow=settings.ondblClickRow;
		zkui.conf.sortSource=settings.sortSource;
		if(typeof settings.showsearch=="undefined") settings.showsearch=true;
		zkui.conf.showsearch=settings.showsearch;		
		if(typeof settings.showsearchnow=="undefined") settings.showsearchnow=false;
		zkui.conf.showsearchnow=settings.showsearchnow;
		if(typeof settings.selectoperation=="undefined") settings.selectoperation=true;
		zkui.conf.selectoperation=settings.selectoperation;
		if(typeof settings.colselect=="undefined") settings.colselect=true;
		zkui.conf.colselect=settings.colselect;
		zkui.conf.gridComplete=settings.gridComplete;
	},
	setnowmodel:function(obj){
		zkui.datamodel=obj.attr("datamodel");
	},
	getoperation:function(){
		var permission=[];
		if(typeof zkui.permission_data!="undefined"){
			var rows=zkui.permission_data[zkui.datamodel.split("/")[0]][zkui.datamodel.split("/")[1]];
			for(var i in rows.operation){
				if(i!="list")
				permission.push(i);
			}
		}else
		permission.push(0);
		return permission;
	},
	permission:function(obj){
		var tt=[];
		var dis="";
		var show=true;
		var permission=zkui.framework.getoperation();
		if(permission.length==0) show=false; 
		else if(permission[0]==0){ show=true; permission=[];}
		for(var j=0;j<obj.length;j++){
			var row=obj[j];
			for(var i in permission){
				if(permission[i]==row.action){
					show=true;
					break;
				}else
					show=false;			
			}
			if(show){
				if(row.disabled){
					dis='disabled';
					row.css="btn default btn-xs";
				}else
					dis="";
				tt.push('<a id="'+row.action+'" class="'+row.css+' '+dis+'">');
				tt.push('<i class="fa '+row.icon+'"></i> '+row.text+'</a>');
			}
		}
		return tt.join("\n");
	},
	ajaxPostData:function(){
		zkui.common.getAjaxInfo(zkui.framework.get_confirm.url,
			function(tmp){
				var msg=zkui.common.evalData(tmp);
				if(!zkui.framework.get_confirm.manual)
				if(msg.result=="1" || msg.result=="0"){
					zkui.common.p_lock_notice('操作成功！', 5);				
					if(zkui.table){
						var sear=$("button.table-group-action-search");
						if($("button.table-group-action-search").length>0)
						$("button.table-group-action-search").trigger("click");
						else
						zkui.table.getgrid().getDataTable().fnDraw();
					}else{
						try{
						zksaas.loadData();
						}catch(e){}
					}
				} else{
					zkui.common.showMsg(msg.message);  
					//msg=null;
				}
				zkui.framework.get_confirm.manual=false;
				if(zkui.framework.get_confirm.callBack!=null){
					zkui.framework.get_confirm.callBack(msg);
					zkui.framework.get_confirm.callBack=null;
				}
			},zkui.framework.get_confirm.post,zkui.framework.get_confirm.postData,false
		);
	},
	get_confirm:function(conf){
		zkui.isVaild=true;
		zkui.framework.get_confirm.url=conf.url;
		var isForm=0;
		zkui.framework.get_confirm.postData="";
		zkui.framework.get_confirm.post=conf.post=conf.post || "get";
		conf.icon=conf.icon || "question";
		conf.formId=conf.formId||0;
		conf.yFn=conf.yFn||null;
		if(conf.formId!=0) isForm=1;
		bootbox.dialog({
			message: conf.html,
			title: conf.title,
			className:"modal-scroll",
			onEscape: function(a) {
				if(conf.closeFn) conf.closeFn();
				$("div.dataTables_processing").css("visibility","hidden");
				return true;
			},			
			buttons: {
				canncel: {
					label: "取消",
					callback: function() {
						if(conf.closeFn) conf.closeFn();
						$("div.datetimepicker").remove();
						$("div.dataTables_processing").css("visibility","hidden");
						return true;
					}
				},
				main: {
					label: "确定",
					className: "blue",
					callback: function() {
						if(conf.yFn!=null&&zkui.isVaild){
							conf.yFn(conf.formId);	
						}
						if(isForm==1&&conf.post!="json"&&conf.serialize){
							try{zkui.framework.get_confirm.postData=$("#"+conf.formId).serialize();	
								//zkui.isVaild=zkui.framework.runValidate(conf.formId);
							}catch(e){}
						}
						$("div.datetimepicker").remove();					
						zkui.framework.get_confirm.dataType="text";
						if(zkui.isVaild){
							zkui.framework.ajaxPostData();					
						}
						return zkui.isVaild;						
					}
				}
			}
		});
		
		if(typeof conf.initFn!="undefined"){
			conf.initFn(conf.formId);}
		if(isForm==1){
			try{zkui.framework.forminit();}catch(e){}
			$("#form_edit").find(".form-actions").remove();
			$("#"+conf.formId+" input[init=time]").each(function(){
				this.value=zkui.common.timeStr(5);													
			});
			//zkui.framework.initValidate(conf.formId);			
		}
	},
	createTextArea:function(list){
		var perM=[];
		var perN=[];
		var emps="";
		for(var i=0;i<list.length;i++){
			var pin=list[i].pin;
			var name=list[i].name;
			perM.push(pin);
			perN.push(name);
			emps+=(pin+",　"+name+"\n");
		}
		emps="<textarea rows='5' class='form-control input-medium' readonly='readonly' id='selePers'>"+emps+"</textarea>";
		return [perM,emps]
	},

	form_format:function(form_Id,yfn,newFormId){
		var html="";
		newFormId=newFormId||"form_edit";
		var formObj=$("#"+form_Id);
		var url=formObj.attr("action");
		var post=formObj.attr("method");
		var strTitle=formObj.attr("title");
		html="<form id='"+newFormId+"' ";
		html+="enctype='application/x-www-form-urlencoded'";
		html+=">"+formObj.html();
		html+="<\/form>";
		if(yfn)
		yfn.type="fun";
		return {"url":url,formId:newFormId,"title":strTitle,"html":html,"method":post,"yfn":yfn};
	},
	form_confirm:function(form_Id,icon,follow,yfn,initfn,nofn){
		var html="";
		follow=follow||null;
		var obj=zkui.framework.form_format(form_Id,yfn);
		zkui.framework.get_confirm({
			url:obj.url,
			title:obj.title,
			html:obj.html,
			formId:obj.formId,
			post:obj.method,
			icon:icon,
			follow:follow,
			yFn:obj.yfn,
			initFn:initfn,
			closeFn:nofn,
			serialize:true
		});
	},
	autoCreateForm:function(dic,icon,initfn,yfn,follow,html,nofn){
        var htmltmp="";
        if(typeof html!="undefined"&&html!=null)
            htmltmp=html;
        else
            htmltmp=zkui.framework.createForm(dic);
		
		var fn;	
		if(typeof dic.showdialog=="undefined"||dic.showdialog==false)	
			fn=zkui.framework.pagerPost;
		else if(dic.showdialog)
			fn=zkui.framework.get_confirm
		//zkui.framework.get_confirm({
		fn({
			url:dic.action,
			title:dic.formTitle,
			html:htmltmp,
			formId:"form_edit",
			icon:icon,
			post:dic.formMethod||"post",
			follow:follow,
			yFn:yfn,
			colwith:dic.colwith,
			initFn:initfn,
			closeFn:nofn,
			serialize:typeof dic.serialize=="undefined"?true:false
		});
	},
	createview:function(dic){
		var m=0;
		var tmp=[];
		var col_name="";
		var col_value="";
		var colwidth=dic.colwith||[5,7];
		for(var i in dic.content){
			var row=dic.content[i]; 
			if(row==null) continue;
			if(typeof dic.column!="undefined"){	
				col_name="col-md-2";
				col_value="col-md-4";
				if(m%dic.column==0)
				tmp.push('<div class="row static-info">');
			}else{
				col_name="col-md-"+colwidth[0];
				col_value="col-md-"+colwidth[1];
				tmp.push('<div class="row static-info">');
			}
			tmp.push('<div class="'+col_name+' name">'+row.title+'：</div>');
			if(row.dataInnerID)
			tmp.push('<div class="'+col_value+' value" id="'+row.dataInnerID+'"></div>');
			else
			tmp.push('<div class="'+col_value+' value">'+(row.showVal||"")+'</div>');
			if(typeof dic.column!="undefined"){	
				m++;
				if(m%dic.column==0){
					tmp.push('</div>');
				}
			}else{
				tmp.push('</div>');
			}
		}
		if(m%dic.column!=0){
			tmp.push('</div>');
		}
		return tmp.join("\n");
	},
	
	createForm:function(dic){
		var tmp=[];
		var isForm=0;
		var br="";
		var width='';
		var tableClass="";
		var colwidth=dic.colwith||[5,7];
		dic.formMethod=dic.formMethod||"post";
		if(typeof dic.formID!="undefined"){
			tmp.push('<form action="'+dic.action+'" title="'+dic.formTitle+'" id="form_edit" method="'+dic.formMethod+'" class="form-horizontal">');
			isForm=1;
		}
		var m=0;
		tmp.push('<div class="form-body">'); 
		for(var i in dic.content){
			var textValue=reg=remote=maxLength=span_title=cols=rows=outInnerID="";
			var row=dic.content[i]; 
			var type="text";
			if(row==null) continue;
			if(typeof dic.column!="undefined"){	
				if(m%dic.column==0)
				tmp.push('<div class="row">');
				tmp.push('<div class="col-md-6"><div class="form-group">');
			} else{
				tmp.push('<div class="row"><div class="col-md-12"><div class="form-group">');
			}
			if(row.title!="") row.title+="：";
			if(typeof row.form.inputType !="undefined" && row.form.inputType!="")type=row.form.inputType;
			if(typeof row.form.verify!="undefined"&& row.form.verify.required==1&&isForm==1){
				tmp.push('<label class="control-label col-md-'+colwidth[0]+'"><span class="required">*</span>'+row.title+'</label>');
				textValue='required';
			}else
				tmp.push('<label class="control-label col-md-'+colwidth[0]+'">'+row.title+'</label>');
			if(typeof row.form.dataInnerID!="undefined")
				tmp.push('<div class="col-md-'+colwidth[1]+'" id="'+row.form.dataInnerID+'">');
			else 
				tmp.push('<div class="col-md-'+colwidth[1]+'">');
			if(typeof row.showVal!="undefined"){
				var showData=row.showVal;
				tmp.push(showData+'</div>');
			}else{
				if(typeof row.form.dataInnerID!="undefined")
					tmp.push('</div>');
				if(typeof row.form.value!="undefined")
					textValue='value="'+row.form.value+'"';
				if(typeof row.form.cols!="undefined")
					cols='cols="'+row.form.cols+'"';
				if(typeof row.form.rows!="undefined")
					rows='rows="'+row.form.rows+'"';
				if(typeof row.form.inputID!="undefined"){
					if(typeof row.form.verify.reg!="undefined")
						reg='reg="'+row.form.verify.reg+'"';
					if(typeof row.form.verify.remote!="undefined")
						remote='remote="'+row.form.verify.remote+'"';
					if(typeof row.form.verify.max!="undefined")
						maxLength='maxlength="'+row.form.verify.max+'"';
					if(typeof row.form.verify.vspan!="undefined")	
						span_title='title="'+row.form.verify.vspan+'"';
					if(typeof row.form.showVal!="undefined"){
						//tmp.push(row.form.showVal);
						if(row.form.hidden==1){	
							type="text";
							var readonly="";							
							if(row.form.disabled)
							readonly='disabled="disabled"';
							else
							readonly='readonly="readonly"';	
							
							tmp.push('<input class="form-control" '+readonly+' name="'+row.form.inputID+'" id="'+row.form.inputID+'" type="'+type+'" '+textValue+' /></div>');
						}
					}else{
						var readonly="";
						if(row.form.append&&row.form.append.indexOf('init="time"')!=-1)  readonly='readonly="readonly"';	
						tmp.push('<input class="form-control" name="'+row.form.inputID+'" id="'+row.form.inputID+'" type="'+type+'"	 title="'+row.title+'" '+readonly+'  '+reg+' '+remote+' '+maxLength+' '+textValue+' '+(row.form.append||"")+' /><span class="help-block"></span></div>');
						
					}
				}else if(typeof row.form.selectID!="undefined"){
					if(typeof row.form.initValue!="undefined"){
						tmp.push('<select class="form-control select2_category" name="'+row.form.selectID+'" id="'+row.form.selectID+'">');				
						var selectOp=row.form.initValue["selected"];
						var selectTmp="";
						var selectList=row.form.initValue;
						if(typeof row.form.initValue["listval"]!="undefined")
						selectList=row.form.initValue["listval"];
						for(var j in selectList){
							var row1=selectList[j]; 
							if(j!="selected"){	
								if(parseInt(j)==selectOp)
									selectTmp='selected="selected"';
								else
									selectTmp='';
								tmp.push('<option value="'+j+'" '+selectTmp+'>'+row1+'</option>');
							}
						}
						tmp.push('</select><span class="help-block"></span></div>');
					}
				} else if(typeof row.form.textareaID!="undefined"){
					if(typeof row.form.value!="undefined")
						textValue=row.form.value;
					else
						textValue="";
					tmp.push('<textarea class="form-control" name="'+row.form.textareaID+'" id="'+row.form.textareaID+'" title="'+row.form.textareaID+'" '+rows+'>'+textValue+'</textarea><span class="help-block"></span></div>');	
				}
			}
			tmp.push('</div>');
			if(typeof dic.column!="undefined"){	
				m++;
				if(m%dic.column==0){
					tmp.push('</div>');
				}
				tmp.push('</div>');
			}else{
				tmp.push('</div></div>');
			}
		}
		if(m%dic.column!=0){
			tmp.push('</div>');
		}
		if(typeof dic.formID!="undefined"){	
		tmp.push('</div><div class="form-actions fluid"><div class="row"><div class="col-md-12">'+
				'<div class="col-md-offset-5 col-md-7">'+
				'<button class="btn green" type="button" id="saveForm"><i class="fa fa-save"></i>保存</button>'+
				' <button class="btn default" type="button" id="closeForm"><i class="fa fa-rotate-right"></i>取消</button></div></div></div>'+
				'</div></form>');
		}else
		tmp.push('</div>');
		return tmp.join("\n");
	},
	viewer:function(a,b,c,d){
		if(c)
			zkui.framework.pagerPost({
				id:"viewDiv",
				title:b,
				html:a,
				initFn:d||null	
			});
		else{
			bootbox.dialog({
			className:"modal-scroll",
			onEscape: function(a) {return true;},
			message:a,
			title: b,
			buttons: {
				canncel: {
					label: "关闭",
					callback: function() {
						return true;
					}
				}			
			}
			});
			if(d)
			d();
		}
	},
	forminit:function(){
		$('input[maxlength]').maxlength({
            limitReachedClass: "label label-danger",
            threshold: 20
        });
		$('.select2_category').select2({
			placeholder: "Select an option",
			allowClear: true
		});	
		$('[init=time]').each(function(index, element) {
			var format=$(this).attr("data-format");
			$(this).css("cursor","default");
			if(format=="yyyy-mm-dd")
			$(this).datepicker({
				rtl: App.isRTL(),
				format:format,
				autoclose: true
			});
			if(format=="yyyy-mm-dd HH:MM:SS")
			$(this).datetimepicker({
				rtl: App.isRTL(),
				autoclose: true
			});	
		});
	},
	pagerPost:function(options){
		zkui.framework.pagerPost.closeFn=options.closeFn;
		zkui.framework.pagerPost.id=options.id||"updateDiv";
		var isVaild=true;
		var cid=options.cid||"";
		zkui.framework.pagerPost.containter=$("#databox").parent().parent();
		zkui.scrollY=$(document).scrollTop();
		$("#"+zkui.framework.pagerPost.id+" div.portlet-body "+cid).html(options.html);
		try{
			zkui.framework.forminit();
			//zkui.framework.initValidate("form_edit");	
		}catch(e){}
		if(options.initFn) options.initFn("form_edit");
		var obj=zkui.framework.form_format("form_edit");
		$("#"+zkui.framework.pagerPost.id+" div.caption").eq(0).html(obj.title||options.title);
		$("#form_edit input[init=time]").each(function(){
			var format=$(this).attr("data-format");
			if(format=="yyyy-mm-dd HH:MM:SS")
			this.value=zkui.common.timeStr(5);	
			if(format=="yyyy-mm-dd")
			this.value=zkui.common.timeStr(0);	
															
		});
		zkui.framework.pagerPost.containter.slideUp("normal",function(){
			$("#"+zkui.framework.pagerPost.id).slideDown("fast");	
		});
		$("#closeForm").bind("click",function(){
			zkui.framework.pagerPost.closeLocker();		
		});
		
		var yfn=options.yFn;
		var done=function(getdata){
			zkui.framework.get_confirm.post=obj.method;
			if(obj.method=="post"&&getdata){
				zkui.framework.get_confirm.postData=$("#form_edit").serialize();	
				//isVaild=zkui.framework.runValidate("form_edit");
			}
			zkui.framework.get_confirm.callBack=function(msg){
				if(msg.result=="1" || msg.result=="0"){
					setTimeout(function(){
						$("#closeForm").trigger("click");
					},1000);
				}
				msg=null;
			};
			zkui.framework.ajaxPostData();					
		};
		
		$("#saveForm").bind("click",function(){
			zkui.framework.get_confirm.url=obj.url||"";
			zkui.framework.get_confirm.postData="";
			if(isVaild){				
				if(yfn){
					var result=yfn("form_edit");
					if(typeof result!="undefined"){
						if(result)
							done(false);
						else{
							setTimeout(function(){
								$("#closeForm").trigger("click");
							},1000);
							return result;
						}
					}else
						done(true);
				}else
					done(true);
			}
			
		});
	}	
};
zkui.framework.runAjaxCheck=function(aShareDic){
	var boolean=false;
	zkui.common.getAjaxInfo(aShareDic["url"],
		function(res){
			var msg=zkui.common.evalData(res);
			if(msg.result=="1" || msg.result=="0"){
				aShareDic["doCorrectOper"](aShareDic["obj"],aShareDic["tipObj"]);
				boolean=true;
			} else{
				aShareDic["doErroOper"](aShareDic["obj"],aShareDic["tipObj"],false,msg.message);
				boolean=false;
			}
		},"get",null,false						  
	);
	return boolean;
}
zkui.framework.validate=function(obj,cannel,sendAjax){
	var tipObj;
	if(obj.next("span.help-block").eq(0).length==0)
		tipObj=obj.parent("div").nextAll("[name='easyTip']").eq(0);
	else
		tipObj = obj.next("span.help-block").eq(0);
	var regDic={
		"sn":{"regExp":"^[0-9]+[0-9]{7,12}","tip":"只能是8到13位的数字"},
		"activecode":{"regExp":"^[0-9]+[0-9]{9,9}","tip":"只能是10位的数字"},
		"IDCard":{"regExp":"^(\\d{14}|\\d{17})(\\d|[xX])$","tip":"只能是合法的身份证格式"},
		"num":{"regExp":"^[1-9]+[0-9]*$","tip":"只能是非0开头的数字"},
		"money":{"regExp":"^[0-9]+(\.[0-9]{2})?$","tip":"只能为有两位小数的正实数"},
		"name":{"regExp":"[\u4E00-\u9FA5a-zA-Z]","tip":"只能是汉字或英文"},
		"mobile":{"regExp":"^13[0-9]{1}[0-9]{8}|^15[0-9]{1}[0-9]{8}|^18[0-9]{1}[0-9]{8}|^14[0-9]{1}[0-9]{8}","tip":"不是一个有效手机号"},
		"email":{"regExp":"[A-Za-z0-9-_.]+@[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+","tip":"不是一个有效的Email"},
		"phone":{"regExp":"^(([0]\\d{3,4}-)?(0\\d{2,3})-)?(\\d{7,8}-)?(\\d{4,6})","tip":"格式不正确"},
		"postcode":{"regExp":"^[0-9]\\d{5}(?!\\d)$","tip":"格式不正确"},
		"remote":{
			"pin":"/express/emp/?action=checkpin&pin=","dept":"dept/?action=checkid&branch=",
			"deptname":function(){var a=$("#form_edit input[id=dept_father]").val();var b="/express/dept/?action=checkname&fatherid="+a+"&name="; return b;},
			"cardnumber":"/express/emp/?action=checkcardnumber&cardnumber=",
			"editcard":function(){var b=$("#emp_pin").val();return "/express/emp/?action=checkcardnumber&pin="+b+"&cardnumber=";},
			"shiftName":"shift/?action=checkname&name=",
			"editShiftName":function(){var a=$("#shiftTmpName").attr("oldid"); return "/express/shift/?action=checkname&_id="+a+"&name=";},
			"username":"/express/check_duplicate/?username=",
			"checkaddsn":"/express/opdevice/?action=checksn&sn=",
			"checkaddname":"/express/opdevice/?action=checkname&name=",
			"checkeditname":function(){ return "/express/opdevice/?action=checkname&old_sn="+$("#old_sn").val()+"&name="}
		}
	};
	zkui.framework.validate.doErroOper=function(a,b,show,txt){
		var data=b.data("txt");
		var txtinfo=txt||data;		
		b.data("txt",txtinfo);
		a.addClass("inputErroShow");
		b.addClass("onError");
		if(show){
		var offset=b.offset();
		var top=offset.top-5;
		var left=offset.left+b.width()+15;
		$("div[id=tipMsg]").css({"position":"absolute","top":top+"px","left":left+"px"}).fadeIn("fast").find("div[id=tipText]").text(txtinfo);
		}
	};
	zkui.framework.validate.doCorrectOper=function(a,b){
		a.removeClass("inputErroShow");
		b.removeClass("onError");
		b.addClass("onCorrect");
		b.removeData();
	};
	zkui.framework.validate.checkMark=function(obj,tipObj,strTitle){
		var strTmp='~!#$%^_&*?=+|<{}[]～！×？＃％＆￥（）【】《》，。、""\'\'：；"';
		var strValue=obj.val();
		for(var m=0;m<strTmp.length;m++){
			for(var j=0;j<strValue.length;j++){
				if(strValue.charAt(j)==strTmp.charAt(m)){
					zkui.framework.validate.doErroOper(obj,tipObj,false,"不能包含非法字符");
					return false;
				}		
			}
		}
		return true;
	}
	var isreg=1;
	var reg="";
	var isAjaxCheckWay=0;
	var formAlt=obj.attr("alt");
	var formReg=obj.attr("reg"); 
	if(typeof(obj.attr("remote"))!="undefined"&&sendAjax!=0&&obj.val()!="")
		isAjaxCheckWay=1;
	if(formAlt=="required"){
		if(obj.val()=="")	
			isreg=0;
		else{
			if(typeof(formReg)!="undefined"){
				reg=new RegExp(regDic[formReg]["regExp"]);
			}else{
				isreg=2;				
			}
		}
	}else{ 
		if(obj.val()!=""){	
			if(typeof(formReg)!="undefined")
				reg=new RegExp(regDic[formReg]["regExp"]);
			else{
				isreg=2; 
			}
		}else{
			isreg=4;		
		}
	}
	var objValue = obj.attr("value");
	var strTitle=typeof(obj.attr("title"))!="undefined"?obj.attr("title"):"";
	var tipTitle=typeof(tipObj.attr("title"))!="undefined"?tipObj.attr("title"):"";	
	var aShareDic="";
	if(isAjaxCheckWay!=0){
	var aurl="";	
	if(typeof(regDic["remote"][obj.attr("remote")])!="function"){
		aurl=regDic["remote"][obj.attr("remote")]+obj.val();	
	}else{
		aurl=regDic["remote"][obj.attr("remote")]()+obj.val();	
	}
	aShareDic={"url":aurl,"doCorrectOper":zkui.framework.validate.doCorrectOper,"doErroOper":zkui.framework.validate.doErroOper,"obj":obj,"tipObj":tipObj};
	}
	tipObj.removeClass("onFocus");
	if(cannel==1){	
		isreg=4;
	}
	if(isreg==1)
		if(!reg.test(objValue)){
			zkui.framework.validate.doErroOper(obj,tipObj,false,regDic[formReg]["tip"]);
			return false;
		}else{
			var aBoolean=zkui.framework.validate.checkMark(obj,tipObj,strTitle);
			if(!aBoolean) return aBoolean;
			if(isAjaxCheckWay==1){
				return zkui.framework.runAjaxCheck(aShareDic);
			}else{
				zkui.framework.validate.doCorrectOper(obj,tipObj);
				return true;
			}
		}
	else if(isreg==0){
		if(typeof(obj.attr("title"))!="undefined")
			zkui.framework.validate.doErroOper(obj,tipObj,false,"不能为空");
		else
			zkui.framework.validate.doErroOper(obj,tipObj,false,"不能为空");	
		return false;			
	}
	else if(isreg==2){
		var aBoolean=zkui.framework.validate.checkMark(obj,tipObj,strTitle);
		if(!aBoolean) return aBoolean;
		if(isAjaxCheckWay==1){
			return zkui.framework.runAjaxCheck(aShareDic);
		}else{
			zkui.framework.validate.doCorrectOper(obj,tipObj);
			return true;
		}
	}
	else if(isreg==4){
		zkui.framework.validate.doCorrectOper(obj,tipObj);
		return true;
	}
}

zkui.framework.pagerPost.closeLocker=function(){
	$("#"+zkui.framework.pagerPost.id).slideUp("normal",function(){
		if(typeof zkui.framework.pagerPost.closeFn!="undefined") zkui.framework.pagerPost.closeFn();
		//zkui.framework.pagerPost.showBar();
		$("div.datetimepicker").remove();
		$("div.dataTables_processing").css("visibility","hidden");
		$("#"+zkui.framework.pagerPost.id).find("div.portlet-body").find("div.row").remove();
		$("#"+zkui.framework.pagerPost.id).find("div.portlet-body").find("form").remove();
		zkui.framework.pagerPost.containter.slideDown("fast");
	});
};
zkui.framework.load_content=function(url,content_fun,callBack,dataContainer){ 
	dataContainer=dataContainer||"#dataT";
	var tmpContainer=dataContainer+" table tbody";
	zkui.common.getAjaxInfo(url,
		function(tmp){
			var objs=zkui.common.evalData(tmp);
			var i="",j;
			try{
				i=content_fun(objs);
			}catch(e){}
			$(tmpContainer).html(i);
			$(dataContainer+" tbody[id=sys_table_content] tr").each(function(x){
				$(this).data("row",objs[x]);
			});
			if(typeof callBack!="undefined")
				callBack(objs);	
			//objs=null;
		}
	);
};
zkui.framework.pageActionReg=function(){
	$("a[id=pagePre],a[id=pageNext],div[id=goto]").click(function(){
		zkui.framework.pageNo(this);	
	});
	$("input[id=pageNo]").blur(function(){
		$("input[id=pageNo]").val(this.value);		
		zkui.framework.pageNo("goto");									 
	});
};
zkui.framework.pageNo=function(obj){
	var target="";
	zkui.oldPageNo=zkui.intPageNo;
	var direct=obj.id||obj;
	var aobj=$("input[id=pageNo]");
	zkui.intPageNo=aobj.val();
	if(direct=="pagePre"){
		if(zkui.intPageNo>1){
			zkui.intPageNo--;
		}//else{
		//	zkui.common.p_lock_notice("已经是第一页了！");	
		//	return 0;
		//}
	} else if(direct=="pageNext"){
		if(zkui.intPageNo<zkui.totalPage){
			zkui.intPageNo++;
		}//else{
			
		//	zkui.common.p_lock_notice("已经是最后一页了！");	
		//	return 0;
		//}
	/*} else if(direct=="gotoFirst"){
		if(zkui.intPageNo!=1)
		zkui.intPageNo=1;
		else
		return 0;
	} else if(direct=="gotoLast"){
		if(zkui.intPageNo!=zkui.totalPage)
		zkui.intPageNo=zkui.totalPage;
		else
		return 0;
		*/
	} else if(direct=="goto"){
		var int=/^[1-9]*[1-9][0-9]*$/;
		if (!int.exec(zkui.intPageNo)){
			zkui.common.p_lock_notice("页码输入不正确！",3,"warning");
			aobj.val(zkui.oldPageNo);
			zkui.intPageNo=zkui.oldPageNo;
			return 0;
		}
		if(zkui.intPageNo>zkui.totalPage){
			zkui.common.p_lock_notice("没有该页码！",3,"warning");
			aobj.val(zkui.oldPageNo);
			zkui.intPageNo=zkui.oldPageNo;
			return 0;
		}else if(zkui.intPageNo<1){
			zkui.common.p_lock_notice("没有该页码！",3,"warning");
			aobj.val(zkui.oldPageNo);	
			zkui.intPageNo=zkui.oldPageNo;
			return 0;
		}
	}
	
	$("a[id=pageNext]").removeClass("disabled");		
	if(zkui.intPageNo==zkui.totalPage)
		$("a[id=pageNext]").addClass("disabled");
	if(zkui.intPageNo<=zkui.totalPage)
		$("a[id=pagePre]").removeClass("disabled");
	if(zkui.intPageNo==1)
	$("a[id=pagePre]").addClass("disabled");
	aobj.val(zkui.intPageNo);
	zkui.pre="p="+zkui.intPageNo;
	if(zkui.tag=="shift"||zkui.tag=="statement"){
		try{zksaas.loadajax();}catch(e){zksaas.loadData();}
	}else{
		try{
			zksaas.loadData();
		}catch(e){
			//zkui.framework.reloadGrid();	
		}
	}
};
zkui.framework.initPageNo=function(){
	$("input[id=pageNo]").val("1");
	$("span[id=count]").text("0");
	$("span[id=totalPage]").text("1");
	zkui.pre="p=1";
	zkui.oldPageNo=1;
	zkui.intPageNo=1;
};
zkui.framework.pageInit=function(){
	var numargs = arguments.length;
	if(numargs==1){
		var obj=arguments[0];
		total_p=obj.total||0;
		total_c=obj.records||0;
		if(typeof(obj.order)!="undefined"){
			order=obj.order||1;
			var strId=obj.field;
			var element;
			if(typeof obj.target!="undefined"){
				element=$(obj.target+" td[sortFiled="+strId+"]");
			}else
				element=$("#dataT td[sortFiled="+strId+"]");
			element.parent("tr").find("span").remove();
			var tmp='<span id="dataOrder" class=';
			if(order==1){tmp+='"uporder"';order=-1;
			}else{tmp+='"downorder"';order=1;}
			tmp+='></span>';
			element.html(element.text()+tmp);	
		}
	} else {
		total_p=arguments[0]||0;
		total_c=arguments[1]||0;
	}
	if(total_p==0&&total_c==0){
		//$("table[id=pagePanel]").hide();
		//$("table[id=pagePanel]").data("display",0);
	}else{
		//$("table[id=pagePanel]").show();
		//$("table[id=pagePanel]").data("display",1);
		$("span[id=totalPage]").text(total_p);
		$("span[id=count]").text(total_c);
		zkui.totalPage=total_p;
	}
};

zkui.common={
	gotosomewhere:function (url,action){
		var html="";
		var field={
			pin:{title:"pin",form:{inputID:"pin",verify:{}}},
			who:{title:"who",form:{inputID:"who",value:"employees",verify:{}}},
			loginnew:{title:"loginnew",form:{inputID:"loginnew",value:"new",verify:{}}},
			company:{title:"company",form:{inputID:"company",value:$.cookie("company"),verify:{}}}
		};
		var aobj=zkui.common.deepCopy(field);
		if(action=="manageToEmployee"){
			aobj.pin.form.value=$.cookie("pin");
		}else{
			delete aobj.pin;
			delete aobj.who;
			delete aobj.company;
		}
		
		var tmp=zkui.framework.createForm({
			tableId:"operForm",
			content:aobj,
			formID:"form_edit",
			action:url+"?action="+action,
			formTitle:"自动跳转"
		});
		$("#autosubmit").html(tmp);
		$("#form_edit").submit();
	},

   exit_confirm:function(o){
		var obj=$(o);
		bootbox.dialog({
			message: obj.attr("rel"),
			title: obj.attr("title"),
			className:"modal-scroll",
			onEscape: function(a) {return true;},			
			buttons: {
				canncel: {
					label: "取消",
					callback: function() {					
						return true;
					}
				},
				main: {
					label: "确定",
					className: "blue",
					callback: function() {
						window.location.href="/express/logout";						
					}
				}
			}
		});		
	},

	coolautosuggest:function(opt){
		try{opt.idField.select2("destroy");}catch(e){}
		if(typeof opt.allowClear=="undefined") opt.allowClear=true;
		var multiple;
		if(opt.multiple)
		multiple=true;
		else
		multiple=false;
		opt.idField.select2({
            placeholder: "工号姓名或汉语拼音",
			allowClear:opt.allowClear,
			multiple: multiple,
            minimumInputLength: 1,
            ajax: { 
                url: opt.url,
                dataType: 'json',
                data: function (term, page) {
                    return {
                        query: term
                    };
                },
                results: function (data, page) {
					for(var i in data){
						data[i].id=data[i].pin;	
					}
                    return {
                        results: data
                    };
                }
            },
			initSelection: function(element, callback) {
				var id=$(element).val();
				if (id!=="") {
					$.ajax("/express/emp/?branch=-1&pin="+id, {						
						dataType: "json"
					}).done(function(data) {data.rows[0].id=data.rows[0].pin;callback(data.rows[0]); });
				}
			},			
            formatResult: function(a){return a.pin+"&nbsp;&nbsp;"+a.name},
            formatSelection: function(o){if(opt.onSelected) opt.onSelected(o);return o.name}, 
            dropdownCssClass: "bigdrop", 
            escapeMarkup: function (m) {
                return m;
            } 
        });
	},
	createATree:function(opt,contain,myFn){
		var htmlTmp=[];
		var alt=opt.required?'alt="required"':"";
		opt.width=opt.width||null;
		opt.text=opt.text||"";
		opt.initValue=opt.initValue||"";
		opt.button=opt.button||"Type_arrow";
		opt.readOnly=opt.readOnly==true?'disabled="disabled"':"";
		var style=opt.width!=null?('style="width:'+opt.width+'px"'):"";
		htmlTmp.push('<input type="text" '+style+' '+alt+' id="'+opt.follow+'" readonly="" class="form-control" value="'+opt.text+'" '+opt.readOnly+'>');
		htmlTmp.push('<input type="hidden" name="'+opt.valueElem+'" id="'+opt.valueElem+'" value="'+opt.initValue+'">');
		//htmlTmp.push('<img width="18" height="20" id="'+opt.button+'" class="arrowimg" src="images/blank.gif" />');
		//htmlTmp.push('<span id="tip" name="easyTip">&nbsp;</span>');
		$("#"+contain).html(htmlTmp.join("\n"));
		if(typeof myFn=="undefined"&&opt.readOnly=="")
		zkui.common.showdeptree(opt);
		else if(typeof myFn=="function")
		myFn(opt);	
	},
	showComboxList:function(options){
		options.tipTitle=options.tipTitle||"";
		var tmpHead='<select name="'+options.name+'" id="autoselect" class="form-control">';
		var tmpEnd='</select>';
		var createSelect=function(objs){
			var html="";
			for(i in objs){
				var row=objs[i];
					if(row.length){
						for(var j=0;j<row.length;j++){
							if(typeof row[j][options.valField]!="undefined")
							html+='<option value="'+row[j][options.valField]+'">'+options.returnFn(row[j])+'</option>';
						}
					}else{
						if(typeof row[options.valField]!="undefined")
						html+='<option value="'+row[options.valField]+'">'+options.returnFn(row)+'</option>';							
					}
			}
			return html;
		};
		if(options.url)
		zkui.common.getAjaxInfo(options.url,
			function(list){
				var html=tmpHead;
				var objs;
				objs=zkui.common.evalData(list);
				html+=createSelect(objs);
				html+=tmpEnd;
				objs=null;
				options.callBack(html);
		});
		else{
			html+=createSelect(objs);
			html+=tmpEnd;
			objs=null;
			options.callBack(html);
		}
	},	
	showdeptree:function(opt){
		//opt.button=opt.button||"Type_arrow";
		
		var checkBox=false;
		opt.initValue=$("#"+opt.valueElem).val();
		var a=opt.initValue;
		if(opt.setting&&opt.setting.check)
			checkBox=true;
		opt.id="deptTree_common_tree";
		var closeTree=function(id){
			$("#menuContent").fadeOut("fast");
			$("#"+opt.id).empty();
			$(document).unbind("mousedown");
			if(typeof opt.callback!="undefined")
				opt.callback(id);
		};
		
		var setting = {
			check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all"
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "father_id",
					rootPId:null
				}
			},
			callback: {
				onClick: function(event, treeId, treeNode, clickFlag){
					var zTree = $.fn.zTree.getZTreeObj(opt.id);
					if(!treeNode.nocheck){
						if(!checkBox){
							$("#"+opt.father+" input[id="+opt.valueElem+"]").val(treeNode.id);
							$("#"+opt.father+" input[id="+opt.follow+"]").val(treeNode.name);
						} else{
							zTree.checkNode(treeNode,true,true,true);
						}
					}
					opt.initValue=treeNode.id;
					closeTree(treeNode.id);					
				},
				onCheck: function(event, treeId, treeNode, clickFlag){
					var id="",name="";
					var zTree = $.fn.zTree.getZTreeObj(opt.id);
					var nodes = zTree.getCheckedNodes(true);
					if(checkBox){
						for(var i=0;i<nodes.length;i++){
							if(nodes[i].father_id!=null){
								id+=nodes[i].id+(i==nodes.length-1?"":",");
								name+=nodes[i].name+",";
								if(i==nodes.length-1)name=name.substring(name.length-1).indexOf(",")!=-1?name.substring(0,name.length-1):name;
							}
						}
					}
					$("#"+opt.father+" input[id="+opt.valueElem+"]").val(checkBox?id:treeNode.id);
					$("#"+opt.father+" input[id="+opt.follow+"]").val(checkBox?name:treeNode.name);
					if(typeof opt.callback!="undefined")
						opt.callback(treeNode.id);
					opt.initValue=checkBox?id:treeNode.id;
					if(typeof opt.checked_close=="undefined")
					closeTree(treeNode.id);
				}
			}
		};
		setting = $.extend({},setting, opt.setting);
		
		$("#"+opt.father+" input[id="+opt.follow+"]").css("cursor","default");
		$("#"+opt.father+" input[id="+opt.follow+"]").click(function(){	
			
			var array=[];
			var nocheck=false;
			var abreak=false;
			opt.initValue=$("#"+opt.father+" input[id="+opt.valueElem+"]").val();
			zkui.common.getAjaxInfo(opt.url,function(msg){
				var zNodes1=zkui.common.evalData(msg);
				for(var j=0;j<zNodes1.rows.length;j++){
					var row=zNodes1.rows[j];
					if(typeof row.father_id=="undefined"){
						row.father_id="-1";
					}else{
						for(var k in zNodes1.rows){
							var listb=zNodes1.rows[k];
							if(row.father_id==listb.id){
								abreak=true;	
								break;
							}else{
								abreak=false;	
							}
						}
					}
					if(!abreak)
					row.father_id="-1";	
					array.push(row);
				}
				if(opt.noFather)
				nocheck=true;
				array.push({ id:"-1", name:"所有部门", open:true,nocheck:nocheck});
				$.fn.zTree.init($("#"+opt.id), setting, array);
				var zTree = $.fn.zTree.getZTreeObj(opt.id);
				var node="";
				if(opt.initValue.indexOf(",")!=-1){
					var atmp=opt.initValue.split(",");
					atmp.push(-1);
					for(var i=0;i<atmp.length;i++){
						node = zTree.getNodeByParam("id",atmp[i], null);
						zTree.checkNode(node, true, false);
						zTree.expandNode(node,true,false,true);
					}
				}else if(!checkBox){
				if(opt.initValue!=""){
				node = zTree.getNodeByParam("id",opt.initValue, null);	
				if(node==null)
				node = zTree.getNodeByParam("id",-1, null);	
				zTree.checkNode(node, true, checkBox, null);
				if(opt.initValue!=-1){
					zTree.selectNode(node, false);
				}}}
				var follow = $("#"+opt.father+" input[id="+opt.follow+"]");
				var followOffset = follow.offset();
				var zindex=$("div[class=aui_focus]").css("z-index");
				$("#menuContent").css("z-index",zindex+1);
				$("#menuContent").css({left:followOffset.left + "px", top:followOffset.top + follow.outerHeight() + "px"}).slideDown("fast");
				$(document).bind("mousedown", function(event){
					if (!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)){
						closeTree();
					}
				});
			});	
		});
	},
	
	showMsg:function(tmp,yfn,closeFn,time,icon){
		time=time||10;
		App.alert({type: 'danger', icon: 'warning', message:tmp, container:"", place: 'prepend',closeInSeconds:time});
		$("div.dataTables_processing").css("visibility","hidden");
	},
	p_lock_notice:function(msg,time,icon,follow){
		time=time||3;
		var title={"success":"成功","warning":"警告","error":"错误"};
		icon=icon||"success";
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"positionClass": "toast-bottom-right",
			"onclick": null,
			"showDuration": "1000",
			"hideDuration": "1000",
			"timeOut": time*1000,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
		toastr[icon](msg,title[icon]);
	},
	getAjaxInfo:function(url,fn,method,formData,asynch,dataType){
		var reloadSys=function(){window.location.reload();};
		method=method||"get";
		formData=formData||"";
		if(typeof(asynch)=="undefined")
		asynch=true;
		if($.browser.msie)
		CollectGarbage();
		if(url.indexOf(".html")!=-1)
		if(window.localStorage){
			try{localStorage.removeItem(url);}catch(e){}
			if(localStorage.getItem(url)!=null){fn(localStorage.getItem(url));return;}
		}
		zkui.ajaxGlobal=$.ajax({
			async:asynch,
			cache:false,
			type:method,
			url:url,
			data:formData,	
			dataType:'text',
			timeout:60000,
			success:function(msg,textStatus,R){
				zkui.ajaxCount=0;
				fn(msg);
			},
			complete:function(textStatus){
				if(textStatus.statusText=="timeout"){
					zkui.ajaxCount++;
					if(zkui.ajaxCount<3)
					zkui.common.getAjaxInfo(url,fn,method,formData,asynch);
					//else
					//zkui.common.showMsg("网络环境不稳定，系统正在重新加载该页面，请稍等！",reloadSys,reloadSys,5);
				}
			}
		});
	},
	evalData:function(a){
		if(typeof(a)=="object")
		return a;
		else{
		var list=null;
		try{list=jQuery.parseJSON(a);}catch(e){eval("list="+a);}
		return list;
		}
	},
	timeStr:function(k){
		this.time=new Date();
		with (this.time){
			var y=getFullYear();
			var m=getMonth()+1;
			var d=getDate();
			var h=getHours();
			var mm=getMinutes();
			var s=getSeconds();
		}
		if(d.toString().length<2)d="0"+d;
		if(m.toString().length<2)m="0"+m;
		if(h.toString().length<2)h="0"+h;
		if(mm.toString().length<2)mm="0"+mm;
		if(s.toString().length<2)s="0"+s;
		if(k==0)return y+"-"+m+"-"+d;
		if(k==1)return y+"-"+m;
		if(k==2)return y+"年"+m+"月"+d+"日&nbsp;"+h+":"+mm+":"+s;
		if(k==3)return d;
		if(k==4)return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;	
		if(k==5)return y+"-"+m+"-"+d+" "+h+":"+mm;	
	},
	getStrTime:function(s){var y=s.substring(0,4);var m=s.substring(5,7);var d=s.substring(8,10);return y+m+d;},
	getYearMonthDayNum:function(year,month){
		var dayNum=[31,28,31,30,31,30,31,31,30,31,30,31];    
		if(new Date(year,1,29).getDate()==29){    
			dayNum[1]=29;    
		}    
		return dayNum[month-1];
	},
	deepCopy:function(json){
		if(typeof json == 'number' || typeof json == 'string' || typeof json == 'boolean'){  
			return json;  
		}else if(typeof json == 'object'){  
			if(json instanceof Array){  
				var newArr = [], i, len = json.length;  
				for(i = 0; i < len; i++){  
					newArr[i] = arguments.callee(json[i]);  
				}  
				return newArr;  
			}else{  
				var newObj = {};  
				for(var name in json){  
					newObj[name] = arguments.callee(json[name]);  
				}  
				return newObj;  
			}  
		}  
	}

};
zkui.framework.detectM=function(){
	var url3="/express/lastactivity/"
	zkui.common.getAjaxInfo(url3,
		function(tmp){
			var msg=zkui.common.evalData(tmp);
			var style="";
			var notibarobj=$("#right_bar").find("li[id=header_notification_bar]");
			var devli=notibarobj.find("ul[id=notify]").find("li").eq(0);
			var devnotii=devli.find("a");
			if(typeof(msg.device.result)!='undefined'){				
				if(msg.result==0&&zkui.olock==0){
					zkui.olock=1;zkui.klock=zkui.clock=0;
					devnotii.html('<span class="label label-sm label-icon label-success">'+
					'<i class="fa fa-smile-o"></i></span>'+msg.device.message);
					devli.removeAttr("data-res");
				}else if(msg.result!=0&&zkui.clock==0){
					zkui.olock=zkui.klock=0;zkui.clock=1;	
					devnotii.html('<span class="label label-sm label-icon label-warning">'+
					'<i class="fa fa-warning"></i></span>'+msg.device.message);
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
				devnotii.html('<span class="label label-sm label-icon label-danger">'+
				'<i class="fa fa-warning"></i></span>您有'+j+'台设备没在线');
			}
			if(msg.warning>0){	
				notibarobj.find("ul[id=notify]").find("li").eq(2).attr("data-res","1").show().find("a").html('<span class="label label-sm label-icon label-danger">'+
				'<i class="fa fa-warning"></i></span>您有'+msg.warning+'位员工的信息需要同步');
				devli.attr("data-res","1");
			}else
				notibarobj.find("ul[id=notify]").find("li").eq(2).removeAttr("data-res").hide();
			zkui.empanalyse(msg);
		}
	);
	var a=setTimeout("zkui.framework.detectM()",1000*6*3);
}
zkui.empanalyse=function(obj){
	zkui.empanalyse.data=obj;
	var erro=0;
	erro+=obj["errors"];
	erro+=obj["trans"];
	erro+=obj["exceps"];			
	var notibar=$("#right_bar").find("li[id=header_notification_bar]");
	var notii=notibar.find("ul[id=notify]").find("li").eq(1).find("a");
	if(erro>0){
	notii.parent().attr("data-res","1");
	notii.html('<span class="label label-sm label-icon label-danger">'+
		'<i class="fa fa-warning"></i></span>您有'+erro+'条考勤异常待处理');
	}else
		notii.parent().removeAttr("data-res").hide();
	var notify_count=notibar.find("li[data-res]").find("span.label-danger");
	notibar.find("ul.notification").find("p").html('您有'+notify_count.length+'条通知');	
	notibar.find("a[id=notify_badge]").find("span.badge").html(notify_count.length);
	if(zkui.locker==0)
	if(notify_count.length>0){
		notibar.find("a[id=notify_badge]").pulsate({
			color: "#dd5131",
			repeat: 25,
			reach: 20,
			speed: 800
		});
	}
	zkui.locker=1;
}
zkui.dataFilter=function(){
	zkui.dataFormat=function(res){
		var data={};
		data.rows=[];
		for(var i=0;i<res.length;i++){
			if(i<res.length-1)
				data.rows.push(res[i]);
			else{
				data.records=res[i].total_num||1;
				data.total=1;
				data.page=1;
			}
		}
		return data;
	}	
	
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
			zkui.initLeftMenu();		
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
			zkui.leftMenuList=zkui.selfLeftList;
			zkui.initLeftMenu();
			zkui.dataFilter();
			zkui.pagerNoCount=15;
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
					zkui.initLeftMenu(zkui.permission_data);
					if(!App.nohome){
						zkui.handleAdress();
					}			
				});

			});				
		}
	}
}
zkui.leftMenuList={
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
			shortInfo:{url:"zk_setting/shortInfo.html",tag:"shortInfo",icon:"fa fa fa-envelope",name:"短消息设置"}
		}
		
	}				
};
zkui.selfLeftList={
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
			askfortran:{tag:"askfortran",url:"employee/askfortran.html",icon:"fa fa-sitemap",name:"补签卡申请"},
			transaction:{tag:"transaction",	url:"employee/transaction.html",icon:"fa fa-user",name:"考勤查询"}, 
			tranexception:{tag:"tranexception",	url:"employee/tranexception.html",icon:"fa fa-users",name:"考勤异常"},
			phoneexception:{tag:"phoneexception",url:"employee/phoneexception.html",icon:"fa fa-users",name:"短消息查询"}									
		}
	},
	askforexception:{
		name:"请假公出",
		tag:"askforexception",					
		icon:"fa fa-clock-o",
		content:{			
			askforexception:{tag:"askforexception",url:"employee/askforexception.html",icon:"fa fa-sitemap",name:"请假公出申请"},
			exception:{tag:"exception",	url:"employee/exception.html",icon:"fa fa-user",name:"请假公出查询"} 
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

zkui.initLeftMenu=function(obj){
	var tmp=[];
	var show=true;
	for(var i in zkui.leftMenuList){
		var row=zkui.leftMenuList[i]; 			
		if(i=="indexhome"){
			tmp.push('<li class="start active ">');
			tmp.push('<a tag="'+row.tag+'" href="'+row.url+'" class="'+row.aclass+'">');
			tmp.push('<i class="'+row.icon+'"></i>');
			tmp.push('<span class="title">');
			tmp.push(row.name);
			tmp.push('</span><span class="selected"></span>');
			tmp.push('</a>');
			tmp.push('</li>');
		}else{
			if(typeof obj!="undefined"){
				if(i in obj)
					show=true;
				else
					show=false;	
			}
			if(show){
			tmp.push('<li>');
			if(typeof row.content=="undefined"){
				tmp.push('<a tag="'+row.tag+'" datamodel="'+i+'/'+row.sontag+'" href="'+row.url+'" class="ajaxify">');
			}else{
				tmp.push('<a tag="'+row.tag+'" href="javascript:;">');
			}
			tmp.push('<i class="'+row.icon+'"></i>');
			tmp.push('<span class="title">');
			tmp.push(row.name);
			tmp.push('</span><span class="selected"></span>');
			if(typeof row.content!="undefined"){
				tmp.push('<span class="arrow ">');
				tmp.push('</span>');
				tmp.push('</a>');
				tmp.push('<ul class="sub-menu">');													
					for(var j in row.content){
						if(typeof obj!="undefined"){
							if(j in obj[i])
								show=true;
							else
								show=false;	
						}
						if(show){
						var row1=row.content[j];								
						tmp.push('<li>');
						tmp.push('<a datamodel="'+i+'/'+j+'" tag="'+row1.tag+'" href="'+row1.url+'" class="ajaxify">');
						tmp.push('<i class="'+row1.icon+'"></i>');
						tmp.push(row1.name);
						tmp.push('</a>');
						tmp.push('</li>');
						}
					}
				tmp.push('</ul>');
			}else
			tmp.push('</a>');
			tmp.push('</li>');
			}
		}
	}
	$(".sidebar-search-wrapper").after(tmp.join("\n"));
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
zkui.getPageNo=function(fn){
	zkui.common.getAjaxInfo("/express/setconf/",function(row){	
		row=zkui.common.evalData(row);											 
		if(row!=null){
			zkui.saas={};
			zkui.pagerNoCount=row.page_count;
			zkui.saas.info=row;
			row=null;
			fn();
		}
		//zkui.framework.initValidate("companyF");
	});	
};

zkui.dialog=function(opt){
	var tmp="";
	if(opt.warning) tmp='<i class="fa fa-warning"></i>';
	if(zkui.dialog.locker==0){
	zkui.dialog.locker=1;
	bootbox.dialog({
		message:tmp+opt.html,
		title: opt.title,
		className:"modal-scroll",
		onEscape: function(a) {
			zkui.dialog.locker=0;
			if(opt.closeFn) opt.closeFn();
			$("div.dataTables_processing").css("visibility","hidden");
			return true;
		},			
		buttons: {
			main: {
				label: "确定",
				className:opt.warning?"red":"blue",
				callback: function() {
					zkui.dialog.locker=0;
					if(opt.yFn) opt.yFn();	
					return true;						
				}
			}
		}
	});
	if(opt.initFn) opt.initFn();
	}
}
zkui.dialog.locker=0;
zkui.ajaxSetup=function(){
	var dialogMsg="";	
	var reLogin=function(){window.location.href="/express/new/login.html";};
	$.ajaxSetup({
		error:function(jqXHR,textStatus,errorThrown){
		},
		statusCode: {
			404: function(){
				dialogMsg="没有该请求，请重试！";
				zkui.dialog({
					html:dialogMsg,
					title:"提示"
				});
			},
			500:function(){
				//dialogMsg="出现未知错误请联系开发人员";
				//zkui.dialog({
				//	html:dialogMsg,
				//	warning:true,
				//	title:"警告"
				//});
			},
			403:function(){
				dialogMsg="会话已超时，请重新登录！";
				zkui.dialog({
					html:dialogMsg,
					warning:true,
					title:"警告",
					initFn:function(){
						//window.setTimeout(reLogin,5000);	
					},
					yFn:reLogin,closeFn:reLogin
				});

			}
		}
	});
}
zkui.handleAdress=function(){
	var url=App.getUrl();
	if(url.indexOf("#")==-1){
		url="home";
	}else{
		if(url.indexOf("/")==-1){
			url=url.substring(1)	
		}else{
			url=url.substring(url.indexOf("/")+1);				
		}
	}
	var tag=$("ul.page-sidebar-menu").find("a[tag="+url+"]");
	if(tag.length==0){
		url="home"
		window.location="#home";
	}
	$("ul.page-sidebar-menu").find("a[tag="+url+"]").click();	
}
zkui.stopEnterkey=function(){
	$("div.bootbox-body input.form-control").live("keypress",function(e){	
		if(e.which==13)
		e.preventDefault();	
	});
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
	$("#right_bar").find("li[id=header_notification_bar]").find("ul[id=notify]").find("li").find("a").bind("click",function(e){
		window.location=$(this).attr("tag");
		zkui.handleAdress();	
	});
	zkui.initpermission();
	zkui.inituser();
	
});