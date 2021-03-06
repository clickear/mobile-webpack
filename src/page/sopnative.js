// 暴露到windows方法

import FormOperator from '../page/formoperator.js'

module.exports = {
    // 录音
    record: sys_record,
    // 录音播放
    recordPlay: sys_recordPlay,
    // 人员选择
    getSelectPerson: sys_getSelectPerson,
    // 人员多选
    getSelectMultiplePerson: sys_getSelectMultiplePerson,
    // 获取图片
    getImage: sys_getImage,
    // 选择相册
    choosePhoto: sys_choosePhoto,
    // 拍照
    takePhoto: sys_takePhoto,
    // 关闭
    closeActivity: sys_closeActivity,
    // 回收资源
    recycle: sys_recycle,
    // 催审
    urge: sys_urge,
    // 获取hosturlget
    getHostUrl: sys_getHostUrl,
    // 获取模版信息
    getFormHtml: sys_getFormHtml,
    // 查看人员信息
    lookPerson :sys_lookPerson,
    // 没权限查看
    formNoPermission:sys_formNoPermission,

    returnBack: returnBack,
    setMsgkPop:sys_setMsgkPop,
    setConfirmPop: sys_setConfirmPop,

    lookPersonInfo:lookPersonInfo,
    // 获取部门
    getSelectDepartment:sys_getSelectDepartment,
    // 上传控件
    uploadFile: sys_uploadFile,
    stopUploadFile: sys_stopUploadFile
}


// 这部分为原生调用的方法，必须挂载在window上
window.recordCallBack = recordCallBack;
window.recordPlayCallBack = recordPlayCallBack;
window.selectPersonCallBack = selectPersonCallBack;
window.selectMultiplePersonCallBack = selectMultiplePersonCallBack;
window.getImageCallBack = getImageCallBack;
window.choosePhotoCallBack = choosePhotoCallBack;
window.takePhotoCallBack = takePhotoCallBack;
window.urgeCallBack = urgeCallBack;
window.upLoadStateCallback = upLoadStateCallback;
window.getHostUrlCallBack = getHostUrlCallBack;
window.getFormHtmlCallBack = getFormHtmlCallBack;
window.selectDepartmentCallBack = selectDepartmentCallBack;
window.uploadFileCallBack = uploadFileCallBack;


window.sys_record = sys_record;
window.sys_recordPlay = sys_recordPlay;
window.sys_getSelectPerson = sys_getSelectPerson;
window.sys_getSelectMultiplePerson = sys_getSelectMultiplePerson;
window.sys_getImage = sys_getImage;
window.sys_choosePhoto = sys_choosePhoto;
window.sys_takePhoto = sys_takePhoto;
window.sys_closeActivity = sys_closeActivity;
window.sys_recycle = sys_recycle;
window.sys_urge = sys_urge;
window.sys_getHostUrl = sys_getHostUrl;
window.sys_getFormHtml = sys_getFormHtml;
window.sys_lookPerson = sys_lookPerson;
window.sys_formNoPermission = sys_formNoPermission;
window.sys_getSelectDepartment = sys_getSelectDepartment;
window.sys_uploadFile = sys_uploadFile;
window.sys_stopUploadFile = sys_stopUploadFile;

window.sys_setConfirmPop = sys_setConfirmPop;
window.sys_setMsgkPop = sys_setMsgkPop;
window.returnBack = returnBack;

window.lookPersonInfo = lookPersonInfo;


var sys_Control = {
  record: function() {},
  recordPlay: {},
  getSelectPerson: function() {},
  getImage: function() {},
  choosePhoto: function() {},
  takePhoto: function() {},
  selectMultiplePerson: function() {},
  urge: function() {},
  getHostUrl: function() {},
  getFormHtml: function() {}
};

/**
 * 图片加载进度条回调函数
 * @param  {Object} data {fileType:'jgp,mp3',state:'startUpload,uploading,uploadSuccess,uploadFail',key:'文件src，即唯一值'}
 * @return {[type]}      [description]
 */
function upLoadStateCallback(data) {
  console.log('上传进度条' +data);
  var upLoadState = JSON.parse(data);

  // 组件形式
  if(upLoadState && upLoadState.componentName){
    upLoadState.progress = upLoadState.process;
    cloundOfficeApp && cloundOfficeApp.$broadcast && cloundOfficeApp.$broadcast('uploadProgress',upLoadState);
  }

  if(upLoadState && !upLoadState.componentName){
    if(typeof sys_Control["choosePhoto"] == 'function'){
      sys_Control["choosePhoto"](upLoadState)
    }
  }
}

/**
 * 录音 
 * @param  {[type]} funCallBack [description]
 * @return {[type]}             [description]
 */
function sys_record(funCallBack) {
  sys_Control["record"] = funCallBack;
  sendRequestGlobal("SOPMethod", "record", "", "recordCallBack");
}

/**
 * 录音回调（原生调用方法）
 * @param  {Object} data {}
 * @return {[type]}      [description]
 */
function recordCallBack(data) {
  if (data) {
    var recordValue = JSON.parse(data);
    var returnValue = [];
    if (recordValue) {
      returnValue.push(recordValue);
    }
    if (typeof sys_Control["record"] == 'function') {
      sys_Control["record"](returnValue);
    }
  }
}

/**
 * 语言播放
 * @param  {String} src         播放源地址
 * @param  {Function} funCallBack 回调函数（原生回调函数）
 * @return {[type]}             [description]
 */
function sys_recordPlay(src, funCallBack) {
  sys_Control["recordPlay"].src = funCallBack;
  sendRequestGlobal("SOPMethod", "recordPlay", src, "recordPlayCallBack");
}

//{src:'',status:'play'}
/**
 * 播放录音(原生调用方法)
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
function recordPlayCallBack(data) {
  var recordStatus = JSON.parse(data);
  if (typeof sys_Control["recordPlay"].src == 'function') {
    sys_Control["recordPlay"].src(recordStatus);
  }
}

/**
 * 人员单选控件
 * @param  {Function} funCallBack 回调函数
 * @return {[type]}             [description]
 */
function sys_getSelectPerson(funCallBack) {
  sys_Control["selectPerson"] = funCallBack;
  sendRequestGlobal("SOPMethod", "selectPerson", "", "selectPersonCallBack");
}

/**
 * 人员单据控件(原生调用方法) 
 * @param  {Array} src [SPersonName:'姓名',PersonId:'工号']
 * @return {[type]}     [description] todo
 */
function selectPersonCallBack(src) {
  var personCallBack = JSON.parse(src);
  if (personCallBack) {
    var returnValue = [];
    for (var i = 0; i < personCallBack.length; i++) {
      var tempValue = {};
      tempValue.name = (personCallBack[i].PersonId == Global.CurrentPerson.code ? "我" : personCallBack[i].SPersonName);
      tempValue.code = personCallBack[i].PersonId;
      returnValue.push(tempValue);
    }
    if (typeof sys_Control["selectPerson"] == 'function') {
      sys_Control["selectPerson"](returnValue);
    }
  }
}


function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

function isString(o){
  return Object.prototype.toString.call(o) === '[object String]';
}

/**
 * 获取人员字符串 如果是数组，则以，隔开，如果是字符串直接返回
 * @param  {[Array,String]} people_id [人员列表，数组或者,隔开。用于原生使用]
 * @return {[type]}           [description]
 */
function getPersonCodeString(people_id){
  var personArr = [];
  if(isArray(people_id)){
    if (people_id) {
      for (var i = 0; i < people_id.length; i++) {
        personArr.push(people_id[i].code);
      }
    }
    return personArr.join(',');
  }else if(isString(people_id)){
    return person_id;
  }else{
    return "";
  }
}

/**
 * 人员多选控件
 * @param  {Arrary} include_org_people_id 已经选中人员列表  [name:'姓名',code:'工号']   传给原生时，以,隔开 
 * @param  {Arrary} exclude_org_people_id 不可选择人员列表  [name:'姓名',code:'工号']   传给原生时，以,隔开
 * @param  {回调函数} funCallBack           [description]
 * @return {[type]}                       [description]
 */
function sys_getSelectMultiplePerson(include_org_people_id, exclude_org_people_id, funCallBack) {
  var m_selectPerson = {};

  m_selectPerson.include_org_people_id = getPersonCodeString(include_org_people_id);
  m_selectPerson.exclude_org_people_id = getPersonCodeString(exclude_org_people_id);

  sys_Control["selectMultiplePerson"] = funCallBack;
  m_selectPerson = JSON.stringify(m_selectPerson);
  sendRequestGlobal("SOPMethod", "selectMultiplePerson", m_selectPerson, "selectMultiplePersonCallBack");
}

/**
 * 人员多选控件回调 (原生调用方法)  
 * @param  {Arrary} data [SPersonName:'姓名',PersonId:'工号'] todo
 * @return {[type]}      [description]
 */
function selectMultiplePersonCallBack(data) {
  var personCallBack = JSON.parse(data);
  if (personCallBack) {
    var returnValue = [];
    for (var i = 0; i < personCallBack.length; i++) {
      var tempValue = {};
      tempValue.code = personCallBack[i].PersonId;
      tempValue.name = (personCallBack[i].PersonId == Global.CurrentPerson.code ? "我" : personCallBack[i].SPersonName);
      returnValue.push(tempValue);
    }
    if (typeof sys_Control["selectMultiplePerson"] == 'function') {
      sys_Control["selectMultiplePerson"](returnValue);
    }
  }
}

/**
 * 获取部门信息
 * @param  {[type]} include_org_dept_id 已经选中部门  
 * @param  {[type]} exclude_org_dept_id 禁止选中部门
 * @param  {[type]} multiple            是否多选
 * @param  {[type]} funCallBack         [回调函数]
 * @return {[type]}                     [description]
 */
function sys_getSelectDepartment(include_org_dept_id, exclude_org_dept_id, multiple, funCallBack){
  var m_selectDept = {};

  m_selectDept.include_org_dept_id = getPersonCodeString(include_org_dept_id);
  m_selectDept.exclude_org_dept_id = getPersonCodeString(exclude_org_dept_id);
  m_selectDept.multiple = !!!multiple;
  sys_Control["selectDepartment"] = funCallBack;
  m_selectDept = JSON.stringify(m_selectDept);
  sendRequestGlobal("SOPMethod", "selectDepartment", m_selectDept, "selectDepartmentCallBack");
}

/**
 * 获取部门回调
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function selectDepartmentCallBack(data){
  console.log('选择部门回调'+data)
  var deptCallBack = JSON.parse(data);
  if (deptCallBack) {
    var returnValue = [];
    for (var i = 0; i < deptCallBack.length; i++) {
      var tempValue = {};
      tempValue.code = deptCallBack[i].DepId;
      tempValue.name = deptCallBack[i].SDepName;
      returnValue.push(tempValue);
    }
    if (typeof sys_Control["selectDepartment"] == 'function') {
      sys_Control["selectDepartment"](returnValue);
    }
  }
}

/**
 * 获取图片 
 * @param  {Function} funCallBack 回调函数
 * @return {[type]}             [description]
 */
function sys_getImage(funCallBack) {
  sys_Control["getImage"] = funCallBack;
  sendRequestGlobal("SOPMethod", "getImage", "", "getImageCallBack");
}

/**
 * 获取图片回调（原生调用方法）
 * @param  {String} src 图片地址
 * @return {[type]}     [description]
 */
function getImageCallBack(src) {
  if (typeof sys_Control["getImage"] == 'function') {
    sys_Control["getImage"](src);
  }
}

/**
 * 选择照片
 * @param  {Function} funCallBack 选择照片函数
 * @param  {Funtion} endCallBack 结束方法回调
 * @return {[type]}             [description]
 */
function sys_choosePhoto(funCallBack, endCallBack) {
  sys_Control["choosePhoto"] = funCallBack;
  sys_Control["choosePhotoEndCallBack"] = endCallBack;
  sendRequestGlobal("SOPMethod", "choosePhoto", "", "choosePhotoCallBack");
}

/**
 * 选择照片(原生调用方法)
 * @param  {Object} data 数据
 * @return {[type]}      [description]
 */
function choosePhotoCallBack(data) {
  var photoValue = JSON.parse(data);
  if (photoValue) {
    var returnValue = [];
    returnValue.push(photoValue);
    sys_Control["choosePhotoEndCallBack"](returnValue);
  }
}

/**
 * 拍照
 * @param  {Fcuntion} funCallBack 拍照
 * @param  {Function} endCallBack 拍照上传完成回调函数
 * @return {[type]}             [description]
 */
function sys_takePhoto(funCallBack, endCallBack) {
  sys_Control["takePhoto"] = funCallBack;
  sys_Control["takePhotoEndCallBack"] = endCallBack;
  sendRequestGlobal("SOPMethod", "takePhoto", "", "takePhotoCallBack");
}

/**
 * 拍照回调(原生调用方法) 
 * @param  {Object} data 数据
 * @return {[type]}      [description]
 */
function takePhotoCallBack(data) {
  var returnValue = [];
  var photoValue = JSON.parse(data);
  if (photoValue) {
    returnValue.push(photoValue);
    sys_Control["takePhotoEndCallBack"](returnValue);
  }
}

/**
 * 上传控件 
 * @param  {Object}   fileOption 传递文件参数
 * @param  {Function} callback   上传成功回调方法 {componentName:'组件名称',multiple:'是否多选 boolean'}
 * @return {[type]}              [description]
 */
function sys_uploadFile(fileOption, callback) {
  sys_Control["uploadFileCallBack"] = callback;
  sendRequestGlobal("SOPMethod", "uploadFile", JSON.stringify(fileOption), "uploadFileCallBack");
}

/**
 * 上传完成回调 由原生调用
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function uploadFileCallBack(data) {
  console.log('上传完成sopnative回调'+data)
  var fileValue = JSON.parse(data);
  if(fileValue){
     sys_Control["uploadFileCallBack"](fileValue);
  }
}

/**
 * 停止上传文件
 * @param  {String} componentName 组件名称
 * @param  {String} key           组件key值，即唯一值
 * @return {null}               无返回值
 */
function sys_stopUploadFile(componentName, key) {
  var fileOption = {};
  fileOption.componentName = componentName;
  fileOption.key = key;
  sendRequestGlobal("SOPMethod", "stopUploadFile", JSON.stringify(fileOption), "stopUploadFileCallBack");
}

/**
 * 关闭页面
 * @return {[type]} [description]
 */
function sys_closeActivity() {
  sendRequestGlobal("SOPMethod", "closeActivity", "", "");
}

/**
 * 回收清理资源，比如暂停播放录音等。
 * @return {[type]} [description]
 */
function sys_recycle() {
  sendRequestGlobal("SOPMethod", "recycle", "", "");
}

/**
 * 催审页面 进入原生界面
 * @param  {Long} personId    用户Id
 * @param  {String} personName  用户姓名
 * @param  {Function} funCallBack 回调函数
 * @return {[type]}             [description]
 */
function sys_urge(personId, personName, funCallBack) {
  var urgePerson = {};
  var tempStr = '';
  sys_Control["urge"] = funCallBack;
  if (personId) {
    urgePerson.LPerson = personId;
    urgePerson.LPersonName = personName;
    urgePerson.LFormInstanceId = Global.FormInstanceId;
    tempStr = JSON.stringify(urgePerson);
  }
  if (tempStr) {
    sendRequestGlobal("SOPMethod", "urge", tempStr, "urgeCallBack");
  }
}

/**
 * 催审页面回调（原生调用方法）
 * @return {[type]} [description]
 */
function urgeCallBack() {
  if (typeof sys_Control["urge"] == 'function') {
    sys_Control["urge"]();
  }
}

/**
 * 获取host地址
 * @param  {Function} funCallBack 回调方法
 * @return {[type]}             [description]
 */
function sys_getHostUrl(funCallBack) {
  sys_Control["getHostUrl"] = funCallBack;
  sendRequestGlobal("SOPMethod", "getHostUrl", "", "getHostUrlCallBack");
}

/**
 * 获取host地址（原生调用方法）
 * @param  {String} HostUrl host地址，用于请求api
 * @return {[type]}         [description]
 */
function getHostUrlCallBack(HostUrl) {
  if (typeof sys_Control["getHostUrl"] == 'function') {
    sys_Control["getHostUrl"](HostUrl);
  }
}

/**
 * 获取表单模版
 * @param  {Object} formObj          {pageCode:'',type:1}  type 1表示EditHtml, 2表示DetailHtml 3表示 HeadHtml
 * @param  {@functio} getFormHtmlCallBack 回调
 * @return {[type]}                     [description]
 */
function sys_getFormHtml(formObj, getFormHtmlCallBack) {
  sys_Control["getFormHtmlCallBack"] = getFormHtmlCallBack;
  var tempStr = '';
  //tempStr = JSON.stringify(formObj);
  var tempObj = {};
  tempObj.pageCode = formObj.PageCode;
  tempObj.type = 0;

  // 申请节点
  if (formObj.Pkey == "" || formObj.Pkey == "0") {
    tempObj.type = 1;
  } else {
    tempObj.type = 2;
  }

  if (formObj.RequireType == 2 || formObj.RequireType == 3) {
    tempObj.type = 1;
  } else if (formObj.RequireType == -1) {
    tempObj.type = 3;
  }
  tempObj = JSON.stringify(tempObj);
  if (getDevices() == "win32" || getDevices() == "win64") {
    FormOperator.sys_GetFormAndNodeStateHtml(formObj, function(result, textStatus, jqXHR, initLocalHtml) {
      if (result && result.IsSucess) {
        getFormHtmlCallBack(result.FormHtml);
      }
    });
    // NDMobile_Ajax.GetFormAndNodeStateHtml(formObj, function(result, textStatus, jqXHR, initLocalHtml) {
    //   if (result && result.IsSucess) {
    //     getFormHtmlCallBack(result.FormHtml);
    //   }
    // });
  }
  sendRequestGlobal("SOPMethod", "getFormHtml", tempObj, "getFormHtmlCallBack");
}

/**
 * 获取模版回调（原生调用方法）
 * @param  {Sring} formTempStr 模版
 * @return {[type]}             [description]
 */
function getFormHtmlCallBack(formTempStr) {
  if (typeof sys_Control["getFormHtmlCallBack"] == 'function') {
    sys_Control["getFormHtmlCallBack"](formTempStr);
  }
}

/**
 * 弹出框
 * @param  {String}   content  内容
 * @param  {Function} callback 回调方法
 * @return {[type]}            [description]
 */
function sys_setConfirmPop(content, callback) {
  try {
    // setCheckPop({
    //   content: '<p class="mb10 tc">' + content + '</p>',
    //   confirm: function() {
    //     callback();
    //   }
    // });

    cloundOfficeApp.$Pop.popCheck.show('<p class="mb10 tc">'+content+'</p>','',callback);

  } catch (e) {
    // alert(e)
  }
}

/**
 * Android 返回按钮 操作方法
 * @return {[type]} [description]
 */
function returnBack() {
  if (Global && Global.isDetail) {
    sys_closeActivity();
  } else {
    try {
      // setCheckPop({
      //   content: '<p class="mb10 tc">已经输入数据，取消后将无法保存，确认关闭？</p>',
      //   confirm: function() {
      //     sys_closeActivity();
      //   }
      // });

      sys_setConfirmPop("已经输入数据，取消后将无法保存，确认关闭？",function(){
        sys_closeActivity();
      })

    } catch (e) {
      sys_closeActivity();
    }
  }
}

/**
 * 查看人员
 * @param  {Long} personId 用户ID
 * @return {[type]}          [description]
 */
function sys_lookPerson(personId) {
  sendRequestGlobal("SOPMethod", "lookPerson", personId, "lookPersonCallBack");
}


let lookPersonInfoFlag = true;
function lookPersonInfo(code) {
    if(lookPersonInfoFlag){
        lookPersonInfoFlag = false;
        setTimeout(function(){lookPersonInfoFlag = true;},1000);
        return sys_lookPerson(code);
    }else{
        console.log('1秒之内只能点击1次')
    }
};



/**
 * 弹出框
 * @param  {String} content 内容
 * @param  {String} type    类型
 * @return {[type]}         [description]
 */
function sys_setMsgkPop(content, type) {
  try {
    // var typeAttr = type || '';
    // setMsgkPop({
    //   "content": content,
    //   "type": typeAttr
    // })

    if(type == 'warn'){
      cloundOfficeApp.$Pop.popMessage.warning(content);
    }else{
      cloundOfficeApp.$Pop.popMessage.success(content);
    }

  } catch (e) {
    alert(content);
    sys_closeActivity();
  }

}

/**
 * 无权限查看表单
 * @param  {Object} formNoPermission 数据
 * @return {[type]}                  [description]
 */
function sys_formNoPermission(formNoPermission) {
  var tempStr = JSON.stringify(formNoPermission);
  sendRequestGlobal("SOPMethod", "formNoPermission", tempStr, "formNoPermissionCallBack");
}


var JSBridge = {};
//iOS or Android
JSBridge.platform = "Android"

var testSrc = 0;

/**
 * 方法请求，用于与原生通信
 * @param  {String}   module   模块名称 如 SOPMethod
 * @param  {String}   method   调用方法 如 formNoPermission
 * @param  {String}   para     参数值   
 * @param  {Function} callback 回调方法
 * @return {[type]}            [description]
 */
JSBridge.sendRequest = function(module, method, para, callback) {
  if (this.platform == "iOS") {
    window.location.href = "objc:" + module + ":" + method + ":" + para + ":" + callback;
  } else if (this.platform == "Android") {
    window[module][method](para, callback);
  } else if (this.platform == "win32" || this.platform == "win64") {
    console.log('调用原生方法：'+ method +'(' + para +')')
    if("selectMultiplePersonCallBack" == callback){
      var person = '[{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":900847,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"多选控件1","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"},{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":910172,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"多选控件2","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"}]';
      selectMultiplePersonCallBack(person);
    }
    else if ("selectPersonCallBack" == callback) {
      var person = '[{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":900847,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"单选人员","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"},{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":910172,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"单选组件","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"},{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":2,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"2组","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"},{"DAddTime":"/Date(1451040536000+0800)/","DByDate":"/Date(959788800000+0800)/","LCharge":"0","LDepCode":0,"LFlag":1,"LState":1,"LUcPeocode":0,"LUserRight":0,"PersonId":1,"SByDate":"2000-06-01","SFirstSpell":"w","SPersonName":"单选组件123","SSpell1":"wf","SSpell2":"wf","SYgMobile":"18986096035"}]';
      selectPersonCallBack(person);
    } else if ("takePhotoCallBack" == callback) {
      testSrc ++;
      var src = "ssssss" + testSrc;
      var obj = {};
      obj.key = src;
      obj.src = 'http://cs.101.com/v0.1/static/cscommon/avatar/199186/199186.jpg?size=80';
      obj.fileName = 'ÎÄ¼þÃû'
      obj.time = '100';
      obj.date = "/Date(959788800000+0800)/";
      takePhotoCallBack(JSON.stringify(obj));
    } else if ("choosePhotoCallBack" == callback) {
      testSrc++;

      var src = "ssssss" + testSrc;

      var obj = {};
      obj.key = src;
      obj.src = 'http://cs.101.com/v0.1/static/cscommon/avatar/199186/199186.jpg?size=80';
      obj.fileName = 'ÎÄ¼þÃû'
      obj.time = '100';
      obj.fileSize=212086;
      obj.date = "/Date(959788800000+0800)/";

      choosePhotoCallBack(JSON.stringify(obj));
    } else if ("recordCallBack" == callback) {
      testSrc++;
      var src = "ssssss" + testSrc;
      var obj = {};
      obj.src = src;
      obj.fileName = '测试文件名'
      obj.time = '100';
      obj.date = "2016/1/14 9:0";
      obj.fileSize=212086;
      recordCallBack(JSON.stringify(obj));
    } else if ("getHostUrlCallBack" == callback) {
      getHostUrlCallBack();
    } else if ("getFormHtmlCallBack" == callback) {
      para = JSON.parse(para);
      if (para.type == 3)
        return "";
      //getFormHtmlCallBack(t.FormHtml);


      // NDMobile_Ajax.GetFormAndNodeStateHtml(para,function(result,textStatus,jqXHR){
      //      if(result && result.IsSucess) {
      //       getFormHtmlCallBack(result.FormHtml);
      //      }
      // });  
    }else if(callback == "recordPlayCallBack"){
      var recordStatus = {};
      recordStatus.status = 'play';
      recordPlayCallBack(JSON.stringify(recordStatus));
    }else if(callback == "selectDepartmentCallBack") {
      var person = [{
      "DepId": 17133,
      "ComId": 1023,
      "LDepCode": null,
      "SDepName": "longgong淡",
      "LFDepCode": 0,
      "DAddTime": "\/Date(1477297348000+0800)\/",
      "LDepLeader": 910172,
      "LDepLeaderName": "Administrator",
      "SDepLeaderPic": null,
      "SDepPhone": null,
      "SPath": "17133|",
      "BDel": 0,
      "LUcDepCode": null,
      "LOrder": null,
      "SSpell1": "longgongdan",
      "SSpell2": "longgongd",
      "HasChildItem": 1,
      "SFDepName": null,
      "LCompanyOrgId": null,
      "ChildItems": null,
      "NCount": 0,
      "PCount": 1,
      "NeedSave": null,
      "dLastDate": "\/Date(1477626672000+0800)\/",
      "LFDepUcCode": null,
      "LUnitId": 481036342037,
      "isParent": false,
      "bAsynced": 0,
      "BIsCom": 1
                },
                {
                  "DepId": 17453,
                  "ComId": 1023,
                  "LDepCode": null,
                  "SDepName": "人事部",
                  "LFDepCode": 17133,
                  "DAddTime": "\/Date(1477535132000+0800)\/",
                  "LDepLeader": 910172,
                  "LDepLeaderName": "Administrator",
                  "SDepLeaderPic": null,
                  "SDepPhone": null,
                  "SPath": "17133|17453|",
                  "BDel": 0,
                  "LUcDepCode": null,
                  "LOrder": 5,
                  "SSpell1": "renshibu",
                  "SSpell2": "rsb",
                  "HasChildItem": 0,
                  "SFDepName": "longgong淡",
                  "LCompanyOrgId": null,
                  "ChildItems": null,
                  "NCount": 0,
                  "PCount": 0,
                  "NeedSave": null,
                  "dLastDate": "\/Date(1477547816000+0800)\/",
                  "LFDepUcCode": null,
                  "LUnitId": 481036342037,
                  "isParent": false,
                  "bAsynced": 1,
                  "BIsCom": 0
                },
                {
                  "DepId": 17454,
                  "ComId": 1023,
                  "LDepCode": null,
                  "SDepName": "教研部",
                  "LFDepCode": 17133,
                  "DAddTime": "\/Date(1477535132000+0800)\/",
                  "LDepLeader": 910172,
                  "LDepLeaderName": "Administrator",
                  "SDepLeaderPic": null,
                  "SDepPhone": null,
                  "SPath": "17133|17454|",
                  "BDel": 0,
                  "LUcDepCode": null,
                  "LOrder": 6,
                  "SSpell1": "jiaoyanbu",
                  "SSpell2": "jyb",
                  "HasChildItem": 0,
                  "SFDepName": "longgong淡",
                  "LCompanyOrgId": null,
                  "ChildItems": null,
                  "NCount": 0,
                  "PCount": 0,
                  "NeedSave": null,
                  "dLastDate": "\/Date(1477547816000+0800)\/",
                  "LFDepUcCode": null,
                  "LUnitId": 481036342037,
                  "isParent": false,
                  "bAsynced": 1,
                  "BIsCom": 0
                },
                {
                  "DepId": 17456,
                  "ComId": 1023,
                  "LDepCode": null,
                  "SDepName": "阿斯达",
                  "LFDepCode": 17133,
                  "DAddTime": "\/Date(1477324800000+0800)\/",
                  "LDepLeader": 0,
                  "LDepLeaderName": null,
                  "SDepLeaderPic": null,
                  "SDepPhone": null,
                  "SPath": "17133|17456|",
                  "BDel": 0,
                  "LUcDepCode": null,
                  "LOrder": 3,
                  "SSpell1": "asida",
                  "SSpell2": "asd",
                  "HasChildItem": 0,
                  "SFDepName": "longgong淡",
                  "LCompanyOrgId": null,
                  "ChildItems": null,
                  "NCount": 0,
                  "PCount": 0,
                  "NeedSave": null,
                  "dLastDate": "\/Date(1477547835000+0800)\/",
                  "LFDepUcCode": null,
                  "LUnitId": 481036342037,
                  "isParent": false,
                  "bAsynced": 1,
                  "BIsCom": 1
                }]
                person = JSON.stringify(person);
                  selectDepartmentCallBack(person);
    }else if(callback == "uploadFileCallBack"){
      var fielOption = JSON.parse(para);
       var file = {componentName:fielOption.componentName,state:'uploadSuccess',
        fileName:fielOption.fileName,fileSize:fielOption.fileSize,progress:100,key:fielOption.sFileKey,src:fielOption.src
        }
        setTimeout(function(){uploadFileCallBack(JSON.stringify(file));},5000)
      
    }



  }
}

/**
 * 方法请求，用于与原生通信
 * @param  {String}   module   模块名称 如 SOPMethod
 * @param  {String}   method   调用方法 如 formNoPermission
 * @param  {String}   para     参数值   
 * @param  {Function} callback 回调方法
 * @return {[type]}            [description]
 */
function sendRequestGlobal(module, method, para, callback) {
  JSBridge.platform = getDevices();
  JSBridge.sendRequest(module, method, para, callback);
};

function getDevices() {
  var browser = navigator.platform.toLowerCase();
  if (browser.indexOf("mac") >= 0) {
    return "iOS";
  } else if (browser.indexOf("ipad") >= 0) {
    return "iOS";
  } else if (browser.indexOf("iphone") >= 0) {
    return "iOS";
  } else if (browser.indexOf("itouch") >= 0) {
    return "iOS";
  } else if (browser.indexOf("ipod") >= 0) {
    return "iOS";
  } else if (browser.indexOf("win32") >= 0) {
    return "win32";
  } else if (browser.indexOf("win64") >= 0) {
    return "win64";
  } else {
    return "Android";
  }
  return "";
};