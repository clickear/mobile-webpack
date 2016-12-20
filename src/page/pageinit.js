window.cloundOfficeApp = {};
window.imgProgressAry = [];
window.Global = {};
window.testDebugData = {};
window.initStep = 0;
window.initData = require('../mobile/leave/mock.json');
window.initStepBack = 0;
//部分全局怎么暴露问题
var isDebug = false;

if (navigator.platform.toLowerCase() == "win32")
    isDebug = true;
else
    isDebug = false;

var testDebugData = {
    isDebug: isDebug,
    userId: 900650,
    comId: 901,
    pageCOde: 1317,
    pKey: 276,
    hostUrl: "http://testyunoa.99.com"
}

// 请假单  10  1663
// 外出单  1319 201
// 出差单  1316 252
// 报销单  1317 276

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

        try {
            sys_getHostUrl(function(hostUrl) {
                if (!hostUrl) alert('返回host地址有误，默认使用testyunoa');
                //hostUrl = hostUrl || 'http://testyunoa.99.com';
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
    // 先获取数据
    NDMobile_Ajax.GetFormData(FormObj, SetFormAndNodeStateHtmlCall);
    sys_getFormHtml(FormObj, function(formTmepStr) {
        if (formTmepStr) {
            setInnerHTML(document.getElementById("divTaskFormHtml"), formTmepStr);
            jQuery('#fixheader').remove();
            jQuery('.ui-cover-loadding').show();
            // SetFormAndNodeStateHtmlCall(formTmepStr);
        } else {

        }
    })
}

var initStepBack = 1;

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
    return getQueryValue(window.location.href, "userid");
}

/**
 * 获取当前单据号
 * @return {Long} 单据号
 */
function getCurrentPageCode() {
    // if(testDebugData.isDebug){
    //     return testDebugData.pageCOde;
    // }
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
    return getQueryValue(window.location.href, "RequireType");
}

/**
 * 重载页面
 * @return {[type]} [description]
 */
function resetPage() {
    document.getElementById("txtsTabCode").value = "";
    document.getElementById("txtbFlow").value = "";
    document.getElementById("txtbNode").value = "";
    document.getElementById("divTaskFormHtml").innerHTML = "";
}

