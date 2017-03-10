
window.dev = true;
window.open_system_form = open_system_form;
window.dev_set_formtemplate = dev_set_formtemplate;

Global = Global || {};
Global.HostUrl = 'http://testwork.nd/'


testDebugData = {
    isDebug: true,
    userId: 910172,
    comId: 1023,
    pageCOde:  1890,
    pKey: 0,
    hostUrl: "http://testwork.nd",
    svouchertype:'1'
}

// 请假单
var leaveEditHtml = require('./leave/edit.html')
var leaveDetailHtml = require('./leave/detail.html')

// 外出申请单
var gooutEditHtml = require('./goout/edit.html')
var gooutDetailHtml = require('./goout/detail.html')

// 出差单
var tripEditHtml = require('./trip/edit.html')
var tripDetailHtml = require('./trip/detail.html')

// 报销
var claimEditHtml = require('./claim/edit.html')
var claimDetailHtml = require('./claim/detail.html')

// 物品
var goodsEditHtml = require('./goods/edit.html')
var goodsDetailHtml = require('./goods/detail.html')

// 工作请求
var workEditHtml = require('./work/edit.html')
var workDetailHtml = require('./work/detail.html')


var FormTemplate = {
	"1": {
		Edit:leaveEditHtml,
		Detail:leaveDetailHtml
	},
	"2": {
		Edit:gooutEditHtml,
		Detail:gooutDetailHtml
	},
	"3": {
		Edit:tripEditHtml,
		Detail:tripDetailHtml
	},
	"4": {
		Edit:claimEditHtml,
		Detail:claimDetailHtml
	},
	"5": {
		Edit:goodsEditHtml,
		Detail:goodsDetailHtml
	},
	"6": {
		Edit:workEditHtml,
		Detail:workDetailHtml
	},
};



function open_system_form(pageCodeId, svouchertype){
	// 模版数据来源
	var source = document.getElementById('source').checked;
	if(source){
		testDebugData.pageCOde = pageCodeId;
		testDebugData.svouchertype = svouchertype;
		SetFormAndNodeStateHtml();
	}else{
		delete window.dev;
		testDebugData.pageCOde = pageCodeId;
		testDebugData.svouchertype = svouchertype;
		SetFormAndNodeStateHtml();
	}
}

function dev_set_formtemplate(svouchertype, formObj) {
	
	var isEdit = true;
	if (formObj.Pkey == "" || formObj.Pkey == "0" || formObj.RequireType == 2 || formObj.RequireType == 3) {
		isEdit = true;
	} else {
		isEdit = false;
	}
    svouchertype = svouchertype + '';
    var FormTemplateObj = FormTemplate[svouchertype];
    if(FormTemplateObj){
    	setInnerHTML(document.getElementById("divTaskFormHtml"), isEdit ? FormTemplateObj.Edit: FormTemplateObj.Detail);
    }
}

function getFormConfig(cretetype){
	sys_GetFormConfig(cretetype,function(data){
		data = data.Data;
		var liHtml = [];

		for(var i = 0; i < data.length; i++){
			let $li = ('<li><a href="javascript:;" onclick="open_system_form('+data[i].pageCodeId+','+data[i].sVoucherType +')"> <ins class="i0"></ins>'+data[i].sVoucherName+'</a></li>')
			liHtml.push($li);
		}
		$('#menu').html(liHtml.join(''));

	})
}




$('#formcreatetype').on('change',function(){
	var createType = document.getElementById('formcreatetype').checked;
	if(createType){
		getFormConfig(-1);
	}else{
		getFormConfig(0);
	}
})


getFormConfig(0);