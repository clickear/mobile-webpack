window.imgProgressAry = {};

/**
 * 用于提交表单
 * @param  {Function} callback 回调函数
 * @return {[type]}            无
 */
function sys_formfirstcommit(callback) {
    //增加判断是否有未上传完的图片
    if (imgProgressAry) {
        for (var key in imgProgressAry) {
            if (imgProgressAry.hasOwnProperty(key)) {
                var imgProgress = imgProgressAry[key];
                if (imgProgress && imgProgress.status && imgProgress.status != 'uploadSuccess') {
                    sys_setMsgkPop("附件正在上传，请等待上传完成后再提交表单", "warn");
                    return;
                }
            }
        }
    }
    // 提交之前，android清理资源
    try {
        sys_recycle();
    } catch (e) {

    }
    submitSure(1, "", callback);
}


/**
 * 点击修改操作   
 * @return {[type]} todo DoSetFormAndNodeStateHtml     
 */
function sys_formChangeSubmit() {

    var func = 'DoSetFormAndNodeStateHtml(' + document.getElementById("txtFormCode").value + ',' + document.getElementById("txtFormINSCode").value + ',"",3);'
    window.setTimeout(func, 100);
}


/**
 * 审批人审批操作 first 2 同意 3 拒绝
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
function sys_approval(callback) {
    var first = 2;
    if (cloundOfficeApp.submitApprovalState == 2) first = 3; //拒绝
    if (cloundOfficeApp.submitApprovalState == 1) first = 2;
    // 提交之前，android清理资源
    try {
        sys_recycle();
    } catch (e) {

    }
    submitSure(first, cloundOfficeApp.sRemark, callback);
}

/**
 * 作废按钮
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
function sys_formFlowRemove(callback) {
    try {
        sys_setConfirmPop('撤消后已审的环节将作废，是否确认撤销本单？', function() {
            submitSure(4, cloundOfficeApp.sRemark, callback);
        });
    } catch (e) {
        alert(e)
    }

}

var sys_isFormCommiting = false;

/**
 * 提交总函数
 * @param  {Number}   first    类型 1 提交 2 审批 3拒绝 4作废
 * @param  {[type]}   remark   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function submitSure(first, remark, callback) {
    if (sys_isFormCommiting)
        return;
    var m_bnode = document.getElementById("txtbNode").value == "1" ? true : false;
    var _objBtn = event.srcElement;
    _objBtn.disabled = true;
    setTimeout(function() {
        var json;
        var subJson = "";
        var uploadJson = "";
        var sendJson = "";
        var userid = document.getElementById("txtCurrUserId").value;
        var dept = document.getElementById("txtCurrDeptCode").value;
        var pkey = document.getElementById("txtFormINSCode").value;
        var formDataCode = document.getElementById("txtFormDataCode").value;
        var pageCode = document.getElementById("txtFormCode").value;

        if (!m_bnode) {
            var Form = {};
            Form.LFormDataId = Global.FormDataCode;
            Form.LPkey = pkey;
            Form.First = first;
            Form.Remark = remark;
            Form.LPageCode = pageCode;
            Form.sPersonCode = userid;
            Form.NextApproPerson = Global.NextApproPerson ? Global.NextApproPerson : "";

            Form.SAbstract = cloundOfficeApp.sAbstract;

            Form.uploadSoundArr = cloundOfficeApp.uploadSoundArr;

            Form.uploadPicArr = cloundOfficeApp.uploadPicArr;

            Form.NodeCode = Global.EnableNodeCode;

            //抄送人
            Form.FixSendPersonArr = cloundOfficeApp.fixSendPersonArr;
            //审批人
            Form.FixNextApprover = cloundOfficeApp.fixNextPersonArr;

            Form.ApproverNextPerson = cloundOfficeApp.approverNextPerson;

            Form.ApproverSendPerson = cloundOfficeApp.approverSendPerson;

            Form.approverUploadSound = cloundOfficeApp.approverUploadSound;

            Form.testJson = JSON.stringify(getViewModelData(cloundOfficeApp));
            //   Dialog.showWaiting('正在提交，请稍候...');
            NDMobile_Ajax.DoFlowNodeSave(Form, DoFlowSave_CallBack, DoFlowSave_ErrorCallBack);
            sys_isFormCommiting = true;

            function DoFlowSave_CallBack(m_result) {
                sys_isFormCommiting = false;
                Global.PageCode = m_result.PageCode;
                Global.Pkey = m_result.Pkey;
                document.getElementById("txtFormINSCode").value = m_result.Pkey;
                document.getElementById("txtFormCode").value = m_result.PageCode;
                if (m_result && m_result.IsSucess) {
                    if (callback && typeof callback == "function") {
                        callback();
                    }
                    var func = 'DoSetFormAndNodeStateHtml(' + m_result.PageCode + ',' + m_result.Pkey + ');'
                    window.setTimeout(func, 100);
                } else {
                    //alert(m_result.Msg);
                    sys_setMsgkPop(m_result.Msg, "warn");
                }
            }

            function DoFlowSave_ErrorCallBack(jqXHR, textStatus, errorThrown) {
                sys_isFormCommiting = false;
                sys_setMsgkPop("网络异常，表单提交失败！", "warn");
                //setMsgkPop({"content": "网络异常，表单提交失败！", "type" : 'warn'})
            }
        } else {
            //分布式表单

        }
    }, 1);
}


/**
 * 删除抄送人
 * @param  {Arrary} delSendPersonArr 要删除的抄送人列表 [{name:'',code:''}]
 * @return {[type]}                  [description]
 */
function sys_DeleteSendPersons(delSendPersonArr) {
    var Form = [];
    for (var i = 0; i < delSendPersonArr.length; i++) {
        Form.push(delSendPersonArr[i].code);
    }
    var parmar = 'formInstanceId=' + Global.FormInstanceId;
    NDMobile_Ajax.DeleteSendPersons(Form, parmar, function(result) {
        if (result) {

        }
    });
}

/**
 * 增加抄送人
 * @param  {Arrary} sendPersonArr 要添加的抄送人数组 [{name:'',code:''}]
 * @return {[type]}               [description]
 */
function sys_AddSendPersons(sendPersonArr) {
    var Form = [];
    for (var i = 0; i < sendPersonArr.length; i++) {
        Form.push({
            AutoCode: 0,
            pageCodeId: Global.PageCode,
            lPkey: Global.Pkey,
            formInstanceId: Global.FormInstanceId,
            sIPersonCode: sendPersonArr[i].code
        });
    }
    NDMobile_Ajax.AddSendPersons(Form, function(result) {
        if (result) {

        }
    });
}

/**
 * 获取表单报销列表
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
function sys_GetFormTrips(callback) {
    var test = 'personCode=' + (Global.FromPersonCode ? Global.FromPersonCode : '') + '&claimId=' + (Global.Pkey ? Global.Pkey : '');
    NDMobile_Ajax.GetFormTrips('', test, function(result) {
        if (typeof callback == "function") {
            callback(result);
        }
    });
}

/**
 * 根据添加获取报销单列表
 * @param  {[type]}   place    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function sys_GetFormTripsByPerson(place, callback) {
    var test = 'personCode=' + (Global.FromPersonCode ? Global.FromPersonCode : '') + '&place=' + (place ? place : "");
    NDMobile_Ajax.GetFormTripsByPerson('', test, function(result) {
        if (typeof callback == "function") {
            callback(result);
        }
    });
}

/**
 * 获取统计详情
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
function sys_GetFormAuxiliaryStatistical(callback) {
    var Form = {};
    Form.PageCode = Global.PageCode;
    Form.PKey = Global.Pkey;
    NDMobile_Ajax.GetFormAuxiliaryStatistical(Form, function(result) {
        if (typeof callback == "function") {
            callback(result);
        }
    })
}

/**
 * [sys_MapFormTripToClaim description]
 * @param  {Arrary} billArr [description]
 * @return {[type]}         [description]
 */
function sys_MapFormTripToClaim(billArr) {
    var Form = [];
    if (billArr) {
        for (var i = 0; i < billArr.length; i++) {
            var tempObj = {};
            tempObj.claimId = Global.Pkey;
            tempObj.tripId = billArr[i].AutoCode;
            tempObj.pageCodeId = Global.PageCode;
            Form.push(tempObj);
        }
    } else {
        return true;
    }

    NDMobile_Ajax.MapFormTripToClaim(Form, function(result) {
        if (typeof callback == "function") {
            callback(result);
        }
    })
}