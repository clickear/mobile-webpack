import FormOperator from '../page/formoperator.js'

window.cloundOfficeApp = {};
window.imgProgressAry = [];
window.Global = {};
window.testDebugData = {};
window.initStep = 0;
window.initData = {};
window.initStepBack = 0;
window.SetFormAndNodeStateHtml = SetFormAndNodeStateHtml;
window.SetFormAndNodeStateHtmlCall = SetFormAndNodeStateHtmlCall;
window.DoSetFormAndNodeStateHtml = DoSetFormAndNodeStateHtml;
window.setInnerHTML = setInnerHTML;
//部分全局怎么暴露问题
var isDebug = false;

if (navigator.platform.toLowerCase() == "win32")
    isDebug = true;
else
    isDebug = true;

testDebugData = {
    isDebug: isDebug,
    userId: 910172,
    comId: 1023,
    pageCOde:  3231,
    pKey: 0,
    hostUrl: "http://testwork.nd",
    svouchertype:'7'
}

// 请假单  1885  1663
// 外出单  1319 201
// 出差单  1316 252
// 报销单  1317 276
// 3186
/**
 * 获取表单内容及流程信息并解析整个表单
 */
function SetFormAndNodeStateHtml() {
    if (getCurrentPageCode() != "") {
        document.getElementById("txtFormINSCode").value = getCurrentPkey();
        document.getElementById("txtFormCode").value = getCurrentPageCode();
        document.getElementById("txtCurrUserId").value = getCurrentUserID();
        document.getElementById('txtCurrCompanyId').value = getCurrentCompanyid();
        document.getElementById('txtRequireType').value = getRequireType();

        Global = Global || {};
        Global.PageCode = getCurrentPageCode();
        Global.Pkey = getCurrentPkey();

        //todo
        Global.sVoucherType = getSVoucherType() || 7;
        try {
            sys_getHostUrl(function(hostUrl) {
               // if (!hostUrl) alert('返回host地址有误，默认使用testyunoa');
                hostUrl = hostUrl || 'http://testyunoa.99.com';
                if (testDebugData && testDebugData.isDebug) {
                    hostUrl = testDebugData.hostUrl;
                }
                var ishttps = 'https:' == document.location.protocol ? true : false;
                if (ishttps) {
                    hostUrl = hostUrl.replace('http:', 'https:');
                }
                Global.HostUrl = hostUrl;
                document.getElementById('HostUrl').value = Global.HostUrl;
                DoSetFormAndNodeStateHtml(document.getElementById("txtFormCode").value, document.getElementById("txtFormINSCode").value, "", document.getElementById('txtRequireType').value);
            });
        } catch (e) {
            alert('返回host地址有误，默认使用work');
            Global.HostUrl = 'http://testyunoa.99.com';
            document.getElementById('HostUrl').value = Global.HostUrl;
            DoSetFormAndNodeStateHtml(document.getElementById("txtFormCode").value, document.getElementById("txtFormINSCode").value, "", document.getElementById('txtRequireType').value);
        }
    } else {
        alert('传入参数不合理');
        sendRequestGlobal("SOPMethod", "getInitData", "", "getInitDataCallBack");
    }

}


function initVue(extendconfig){
    Global.startRender = new Date();
    var initVueModel = {
        el:'#cloundOfficeApp',
        data:{
            FlowState:initData.FlowState, 
            ApproverState:initData.ApproverState,
            ViewType:initData.ViewType,
            Enable:!!initData.Enable,

            sPersonCode : initData.sPersonCode || 0,
            sPersonName : initData.sPersonName || '',

            ApproverList: initData.approvalRecord || [], 


            IsEdit : initData.IsEdit ,        // 编辑状态，还是查看状态
            FormName: initData.FormName || '表单',              // 表单名称
            IsAutoFlow :  initData.IsAutoFlow, // 是否自由流程， 1是
            sAbstract : '',   

                                                   //摘要
            uploadSoundArr : initData.uploadSoundArr || [],       // 录音上传地址
            uploadPicArr : initData.uploadPicArr || [],         // 图片上传地址
            fixSendPersonArr : initData.fixSendPersonArr || [],     // 申请时抄送人
            fixNextPersonArr : initData.fixNextPersonArr || [],      // 申请时下一个审批人
            approverUploadSound:initData.approverUploadSound || [],     // 同意拒绝时录音
            approverSendPerson:initData.approverSendPerson || [],

            approverNextPerson:initData.approverNextPerson || [],
            delSendPersonArr:initData.delSendPersonArr || [],

            showPhotoPicker:false,
            submitApprovalState:0,
            sRemark:'', //审批或者驳回意见
            step:0,
        },
        methods:{
            getFormData(){
                var data = {};
                for (var k in this.$refs) {
                    var comp = this.$refs[k];
                    if (comp.name != undefined && comp.name != '' && comp.getValue != undefined) {
                        data[comp.name] = comp.getValue();
                    }
                }
                return data;
            },
            formCheck(){
            }
        },ready(){
            Global.endRender = new Date();
            console.log('渲染时间:'+ (new Date() - Global.startRender))
            console.log('总共时间:'+ (new Date() - Global.startTime))
            
            this.$on('FORWARD:OVERALL', function (data) {
                this.$broadcast(data.event, data.data);
            });
        },
        store:store
    };
    jQuery.extend(initVueModel.data, extendconfig);
    window.cloundOfficeApp = new Vue(initVueModel);
}


/**
 * 获取模版函数
 * @param {Long} pageCode     表单编号pageCode
 * @param {Long} pKey         表单peky值
 * @param {Function} callfunction 回调函数
 * @param {Long} change       操作类型 
 */
function DoSetFormAndNodeStateHtml(pageCode, pKey, callfunction, change) {
    cloundOfficeApp = {};
    initData = {};
    resetPage();
    document.getElementById("txtFormINSCode").value = pKey;
    document.getElementById("txtFormCode").value = pageCode;
    var FormObj = {};
    FormObj.PageCode = pageCode;
    FormObj.Pkey = pKey ? pKey : 0;
    FormObj.RequireType = change ? change : 0;
    FormObj.sVersion = "2.0";
    document.getElementById('txtRequireType').value = FormObj.RequireType;
    // 自定义单据
    if(Global.sVoucherType > 6 ){

        var html = '<nd-form :fixnextpersonarr.sync=\"fixNextPersonArr\" :fixsendpersonarr.sync=\"fixSendPersonArr\" :approveruploadsound.sync = \"approverUploadSound\":approvernextperson.sync = \"approverNextPerson\":approversendperson.sync = \"approverSendPerson\":delsendpersonarr.sync = \"delSendPersonArr\":uploadsoundarr.sync=\"uploadSoundArr\":showphotos.sync=\"showPhotoPicker\" :uploadpicarr.sync=\"uploadPicArr\":formname = \"FormName\":isedit = \"IsEdit\":flowstate = \"FlowState\":viewtype=\"ViewType\":approvalstate=\"ApproverState\":enable=\"Enable\":isautoflow = \"IsAutoFlow\":sremark.sync=\"sRemark\":approvalrecord = \"ApproverList\":spersoncode=\"sPersonCode\":spersonname=\"sPersonName\":step.sync=\"step\"><span style=\"color:#FF9900;\">空白的段落s2<span style=\"font-size:9px;\"><span style=\"font-size:18px;\"></span></span>3</span><nd-textbox id=\"fc3e0c9d\" name=\"fc3e0c9d\" v-ref:\"fc3e0c9d\" width=\"100%\" :must=\"true\" :readonly=\"false\" :displaymodel=\"false\" label=\"文本输入组件\" placeholder=\"占位符合\" :multiple=\"true\" :lettercount=\"true\" valid=\"name\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-voice id=\"dd28809b\" name=\"dd28809b\" v-ref:\"dd28809b\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"默认值\" value = \"\" ></nd-voice><nd-separation title=\"上单刀锋\" textalgin=\"center\" borderstyle=\"solid\" bordercolor=\"#333\"></nd-separation><nd-textbox id=\"017a94d0\" name=\"017a94d0\" v-ref:\"017a94d0\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"数字输入组件\" placeholder=\"默认显示\" :multiple=\"false\" :lettercount=\"true\" valid=\"number\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-radiogroup id=\"bce38d14\" name=\"bce38d14\" v-ref:\"bce38d14\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"单选\" :config=\"nd_bce38d14_cfg\" value = \"\" ></nd-radiogroup><nd-select id=\"a940c5da\" name=\"a940c5da\" v-ref:\"a940c5da\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"下拉\" :config=\"nd_a940c5da_cfg\" valuekey=\"value\" textkey=\"text\" value = \"\" ></nd-select><nd-textbox id=\"h0c6e46a\" name=\"h0c6e46a\" v-ref:\"h0c6e46a\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"手机号码\" classname=\"double-line\" :multiple=\"false\" :lettercount=\"true\" valid=\"mobile\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-uploader id=\"a1e3b328\" name=\"a1e3b328\" v-ref:\"a1e3b328\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"上传文件\" value = \"\" ></nd-uploader><nd-textbox id=\"564fa4b\" name=\"564fa4b\" v-ref:\"564fa4b\" width=\"100%\" :must=\"true\" :readonly=\"false\" :displaymodel=\"false\" label=\"电话号码\" classname=\"double-line\" defaultvalue=\"1586005991\" :multiple=\"false\" :lettercount=\"true\" valid=\"mobile\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-textbox id=\"94d3bb7\" name=\"94d3bb7\" v-ref:\"94d3bb7\" width=\"100%\" :must=\"false\" :readonly=\"false\" :displaymodel=\"false\" label=\"邮箱\" classname=\"double-line\" :multiple=\"false\" :lettercount=\"true\" valid=\"email\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-textbox id=\"a768d92a\" name=\"a768d92a\" v-ref:\"a768d92a\" width=\"100%\" :must=\"true\" :readonly=\"false\" :displaymodel=\"false\" label=\"金额\" placeholder=\"请输入\" classname=\"double-line\" :multiple=\"false\" :lettercount=\"true\" valid=\"money\" unit=\"人名币\" :height=\"100\" :maxlen=\"999\" value = \"\" ></nd-textbox><nd-memberpicker id=\"e9484b5a\" name=\"e9484b5a\" v-ref:\"e9484b5a\" width=\"100%\" :must=\"true\" :readonly=\"false\" :displaymodel=\"false\" label=\"人员选择\" :config=\"nd_e9484b5a_cfg\" :multiple=\"true\" state=\"1\" value = \"\" ></nd-memberpicker><nd-checkboxgroup id=\"0576a48f\" name=\"0576a48f\" v-ref:\"0576a48f\" width=\"100%\" :must=\"true\" :readonly=\"false\" :displaymodel=\"false\" label=\"多选\" :config=\"nd_0576a48f_cfg\" value = \"\" ></nd-checkboxgroup></nd-form>'
        var extend = JSON.parse("{\"nd_bce38d14_cfg\":{\"radios\":[{\"label\":\"选项1\",\"value\":1},{\"label\":\"选项2\",\"value\":2}]},\"nd_a940c5da_cfg\":{\"data\":[{\"text\":\"选项1\",\"value\":1},{\"text\":\"选项2\",\"value\":2}]},\"nd_e9484b5a_cfg\":{\"usertemplate\":\"Template.memberpicker1\"},\"nd_0576a48f_cfg\":{\"checkboxes\":[{\"label\":\"选项1\",\"value\":1},{\"label\":\"选项2\",\"value\":2}]}}");

        Global.endTime = new Date();
        console.log('加载文件时间:' + (Global.endTime - Global.startTime))
        // setInnerHTML(document.getElementById("cloundOfficeApp"), html);
        // initVue(extend);

        FormOperator.sys_GetFormRenderTemplate(Global.PageCode,FormObj.Pkey, FormObj.RequireType,function(result){
            Global.endRequest = new Date();
            console.log('网络请求时间'+ (Global.endRequest - Global.endTime))
          //  setInnerHTML(document.getElementById("cloundOfficeApp"), result.Data.esopTemplate.Html);
            SetFormAndNodeStateHtmlCall(result.Data.formResult);
            var vueModel = JSON.parse(result.Data.esopTemplate.Javascript);
            initVue(vueModel);
        })
    // 系统单据，并且非开发模式
    }else if(typeof dev == 'undefined'){
        // 先获取数据
        // NDMobile_Ajax.GetFormData(FormObj, SetFormAndNodeStateHtmlCall);
        FormOperator.sys_GetFormDataAjax(FormObj, SetFormAndNodeStateHtmlCall);
        sys_getFormHtml(FormObj, function(formTmepStr) {
            if (formTmepStr) {
                setInnerHTML(document.getElementById("divTaskFormHtml"), formTmepStr);
                jQuery('#fixheader').remove();
                jQuery('.ui-cover-loadding').show();
                // SetFormAndNodeStateHtmlCall(formTmepStr);
            } else {

            }
        }) 
    }else{
    	// 开发模式
    	FormOperator.sys_GetFormDataAjax(FormObj, SetFormAndNodeStateHtmlCall);
        if(typeof dev_set_formtemplate == 'function'){
            dev_set_formtemplate( Global.sVoucherType , FormObj);
        }

    }
}

/**
 * 获取模版回调函数 
 * @param {[type]} result        [description]
 * @param {[type]} textStatus    [description]
 * @param {[type]} jqXHR         [description]
 * @param {[type]} initLocalHtml [description]
 */
function SetFormAndNodeStateHtmlCall(result, textStatus, jqXHR, initLocalHtml) {
    if (result && result.IsSucess) {
        //是否保存在本来当中,默认是重新进行保存
        // if(!initLocalHtml){
        //     if(FormObj.PageCode != "" && (FormObj.Pkey=="" || FormObj.Pkey == 0)){
        //             localforage.setItem('getHtml_'+FormObj.PageCode+"_"+Global.Version, result, function(err, result1) { 
        //         //  alert('setItem:'+JSON.stringify(result1)) 
        //         }); 
        //     }        
        // }

        //无权限查看
        if (result.ViewType == "4") {
            var m_NoPermission = {};
            m_NoPermission.formInstanceId = result.FormInstanceId;
            m_NoPermission.LflowState = result.FlowState;
            sys_formNoPermission(m_NoPermission);
        }

        //返回值进行设置。
        document.getElementById("txtbFlow").value = result.IsFlow ? "1" : "0";
        document.getElementById("txtbNode").value = result.IsNode ? "1" : "0";
        document.getElementById("txtsTabCode").value = result.TabCode;
        document.getElementById("txtViewType").value = result.ViewType;
        document.getElementById("txtFormDataCode").value = result.FormDataCode;
        document.getElementById("txtFormINSCode").value = result.Pkey;
        document.getElementById("txtFormCode").value = result.PageCode;
        jQuery.extend(Global, result);
        Global.ViewType = result.ViewType ? result.ViewType : 0;

        initData = initData || {};
        var m_FormDataJson = result.FormDataJson;
        if (m_FormDataJson) {
            //JSON.parse(result.FormDataJson)[0]
            try {
                initData = JSON.parse(result.FormDataJson)[0]

                for (var minitData in initData) {
                    if (initData.hasOwnProperty(minitData)) {
                        if (typeof minitData == 'string') {
                            try {
                                initData[minitData] = JSON.parse(initData[minitData]);
                            } catch (e) {
                                //initData[minitData] = ;
                            }
                        }
                    }
                }

            } catch (e) {
                initData = {};
            }
        }

        if (result.ApproverState) {
            initData.ApproverState = result.ApproverState;
        }

        if (result.UploadSoundArr) {
            initData.uploadSoundArr = result.UploadSoundArr;
        }

        if (result.UploadPicArr) {
            initData.uploadPicArr = result.UploadPicArr;
        }
        if (result.ApproverList) {
            initData.approvalRecord = result.ApproverList;
        }

        if (result.FixSendPersonArr) {
            initData.fixSendPersonArr = result.FixSendPersonArr;
        }

        if (result.FixNextPersonArr) {
            initData.fixNextPersonArr = result.FixNextPersonArr;
        }

        if (result.FormAuxiliaryStatisticalList) {
            initData.FormAuxiliaryStatisticalList = result.FormAuxiliaryStatisticalList;
        }

        //命名转换
        if (result.ApproverState) {
            initData.ApprovalState = result.ApproverState;
        }

        initData.ViewType = result.ViewType;
        initData.isAutoFLow = initData.IsAutoFLow = result.IsAutoFlow ? 1 : 0;

        initData.Enable = result.Enable ? 1 : 0;
        initData.FlowState = result.FlowState;

        initData.FormName = result.FormName;
        initData.IsEdit = result.IsEdit;


        try {
            if (document.getElementById('txtRequireType') && (document.getElementById('txtRequireType').value == "2" || document.getElementById('txtRequireType').value == "3")) {
                initData.HasData = true;
                initData.step = initStepBack;
            }
        } catch (e) {
            initData.HasData = false;
        }
        //  initData = {};
        cloundOfficeApp = cloundOfficeApp || {};
        jQuery.extend(cloundOfficeApp, initData);
        jQuery('.ui-cover-loadding').hide();
    } else {
        //alert(result.Msg);
    }
}


/**
 * 跨浏览器的设置 innerHTML 方法 允许插入的 HTML 代码中包含 script 和 style
 * @param {Dom} el       对象
 * @param {String} htmlCode html代码
 */
function setInnerHTML(el, htmlCode) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) {
        htmlCode = '<div style="display:none">for IE</div>' + htmlCode;
        htmlCode = htmlCode.replace(/<script([^>]*)>/gi, '<script$1 defer>');
        el.innerHTML = htmlCode;
        el.removeChild(el.firstChild);
    } else {
        var el_next = el.nextSibling;
        var el_parent = el.parentNode;
        el_parent.removeChild(el);
        el.innerHTML = htmlCode;
        if (el_next) {
            el_parent.insertBefore(el, el_next)
        } else {
            el_parent.appendChild(el);
        }
        var scripts = el.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var script = document.createElement("script");
            script.innerHTML = scripts[i].innerHTML;
            el_parent.appendChild(script);
        }
    }
}


/**
 * 取得QueryString中的各个参数
 * @param  {String} p_sQueryString query串 如 ?comId=100&userId=12#pagecode=1 可以&,#分隔
 * @param  {String} p_sParam       参数 如 获取comId
 * @return {String}                值 如 100
 */
function getQueryValue(p_sQueryString, p_sParam) {
    p_sQueryString = p_sQueryString.toLocaleLowerCase();
    p_sParam = p_sParam.toLocaleLowerCase();
    if (p_sQueryString == "")
        return "";
    p_sQueryString = p_sQueryString.replace(/&amp;/g, "&");
    p_sQueryString = p_sQueryString.replace(/#/g, "&");

    var m_sQueryString = p_sQueryString + "&";
    m_sQueryString = m_sQueryString.replace("?", "&");
    if (m_sQueryString.indexOf(p_sParam) > -1) {
        var m_lStar = m_sQueryString.indexOf("=", m_sQueryString.indexOf("&" + p_sParam)) + 1;
        var m_lEnd = m_sQueryString.indexOf("&", m_lStar);
        var m_sValue = m_sQueryString.substring(m_lStar, parseInt(m_lEnd));
        return m_sValue;
    } else
        return "";
}

/**
 * 获取当前用户ID
 * @return {Long} 用户Id
 */
function getCurrentUserID() {
    if (typeof(testDebugData) != 'undefined' && testDebugData.isDebug) {
        return testDebugData.userId;
    }
    return getQueryValue(window.location.href, "userid");
}

/**
 * 获取当前单据号
 * @return {Long} 单据号
 */
function getCurrentPageCode() {
    if(testDebugData.isDebug){
        return testDebugData.pageCOde;
    }
    return getQueryValue(window.location.href, "pagecode");
}

/**
 * 获取当前表单pkey值
 * @return {Long} pkey值
 */
function getCurrentPkey() {
    if (typeof(testDebugData) != 'undefined' && testDebugData.isDebug) {
        return testDebugData.pKey;
    }
    return getQueryValue(window.location.href, "pkey");
}

/**
 * 获取当前公司号 orgId
 * @return {Long} 公司号
 */
function getCurrentCompanyid() {
    if (typeof(testDebugData) != 'undefined' && testDebugData.isDebug) {
        return testDebugData.comId;
    }
    return getQueryValue(window.location.href, "companyid");
}

/**
 * 获取表单操作类型
 * @return {long} [description]
 */
function getRequireType() {
    return getQueryValue(window.location.href, "requiretype");
}

/**
 * 获取表单操作类型
 * @return {long} [description]
 */
function getSVoucherType() {
	if (typeof(testDebugData) != 'undefined' && testDebugData.isDebug) {
        return testDebugData.svouchertype;
    }
    return getQueryValue(window.location.href, "svouchertype");
}

/**
 * 重载页面
 * @return {[type]} [description]
 */
function resetPage() {
    document.getElementById("txtsTabCode").value = "";
    document.getElementById("txtbFlow").value = "";
    document.getElementById("txtbNode").value = "";
    //document.getElementById("divTaskFormHtml").innerHTML = "";
}

