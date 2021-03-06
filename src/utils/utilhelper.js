import FormOperator from '../page/formoperator.js'


/**
 * 常量值
 * @type {Object}
 */
const receiptStatusCfg = {
    1: {
        action: 'progress',
        name: '正在审批中'
    },
    2: {
        action: 'success',
        name: '通过'
    },
    3: {
        action: 'reject',
        name: '拒绝'
    },
    4: {
        action: 'progress',
        name: '未开始'
    },
    5: {
        action: 'revoke',
        name: '已撤销'
    },
    6: {
        action: 'no-exist',
        name: '不存在'
    },
    7: {
        action: 'done',
        name: '已审'
    },
    8: {
        action: 'waiting',
        name: '待审'
    }
}

/**
 * 获取头像
 * @param  {Long} code 工号
 * @return {String}      图像地址
 */
function becomeAvatarSrc(code) {
    return ((Global.HostUrl || '') + '/officephoto/' + code + '/80');
}

/**
 * 格式化输出时间。如显示 14天前等
 * @return {[type]} [description]
 */
function friendlyFormatDate(completeTime){
	var result = completeTime;
	try{
		var dt = moment(completeTime, "HH:mm:ss YYYY-MM-DD");
	    if (moment().add(-5, "m").isBefore(dt)) {
	        result = "刚刚";
	    } else if (moment().add(-5, "m").isAfter(dt) && moment().add(-1, "h").isBefore(dt)) {
	        result = moment().diff(dt, "minutes") + "分钟前";
	    } else if (moment().add(-1, "h").isAfter(dt) && moment().add(-1, "d").isBefore(dt)) {
	        result = moment().diff(dt, "hours") + "小时前";
	    } else if (moment().add(-1, "d").isAfter(dt)) {
	        result = moment().diff(dt, "days") + "天前";
	    }
	} catch (e) { }
    return result;
}

const FE_Util = {
    formatNumber: function(opts) {
        var temp = opts.val.replace(/[^\d.]/g, '');
        var hasdot = new RegExp("\\.", "").test(temp);
        var strArr = temp.split('.'),
            intStr = strArr[0],
            floatStr = strArr[1] || '',
            returnStr = '';
        if (strArr.length > 2) {
            strArr.shift()
            floatStr = strArr.join('')
        }
        if (intStr.length > opts.intSize) {
            intStr = parseInt(intStr.toString().substr(0, opts.intSize))
        }
        if (floatStr.length > opts.floatSize) {
            floatStr = floatStr.toString().substr(0, opts.floatSize);
        }

        if (opts.isFormat) {
            if (floatStr.length > 0) {
                if (floatStr == "0") {
                    floatStr = 0;
                } else {
                    floatStr = 5
                }
            }
        }
        if (floatStr === "" && hasdot) {
            returnStr = intStr + '.';
        } else if (floatStr !== "") {
            returnStr = intStr + '.' + floatStr;;
        } else {
            returnStr = intStr;
        }

        return returnStr
    }
}


function setCheckPop(obj) {
    var vn = cloundOfficeApp;
    cloundOfficeApp.$Pop.popCheck.show(obj.content,(obj.title || ''),obj.confirm,(obj.confirmTxt || '确定'));
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
function getCodeString(people_id){
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
 * 获取人员字符串 如果是数组，则以，隔开，如果是字符串直接返回
 * @param  {[Array,String]} people_id [人员列表，数组或者,隔开。用于原生使用]
 * @return {[type]}           [description]
 */
function getNameString(people_id){
  var personArr = [];
  if(isArray(people_id)){
    if (people_id) {
      for (var i = 0; i < people_id.length; i++) {
        personArr.push(people_id[i].name);
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
 * 从接口中获取值，根据199186,950716获取到数组[{name:'',code:''},{name:'',code:''}]
 * @param  {[type]} personId [description]
 * @param  {Function} callback 回调函数
 * @return {[type]}          [description]
 */
function getPersonArrayByPersonId(personId,callback){
    FormOperator.sys_GetWGetDepMembers(personId,function(data){
        let resultArr = [];
        if(data && data.Code == 1){
            for(let i=0; i < data.Data.length; i++){
                resultArr.push({name:data.Data[i].SPersonName,code:data.Data[i].PersonId});
            }
        }
        if(callback && callback instanceof Function){
            callback(resultArr);
        }
    });
}


/**
 * 从接口中获取值，根据199186,950716获取到数组[{name:'',code:''},{name:'',code:''}]
 * @param  {[type]} depId 部门Id
 * @param  {Function} callback 回调函数
 * @return {[type]}          [description]
 */
function getDeptArrayByDepId(depId,callback){
    FormOperator.sys_GetWGetOrgDepts(depId,function(data){
        let resultArr = [];
        if(data && data.Code == 1){
            for(let i=0; i < data.Data.length; i++){
                resultArr.push({name:data.Data[i].SDepName,code:data.Data[i].DepId});
            }
        }
        if(callback && callback instanceof Function){
            callback(resultArr);
        }
    });
}

/**
 * 生成guid
 * @return {[type]} [description]
 */
function getGUID () {
	return Math.random().toString(36).substring(3,20);
}

/**
 * 根据guid获取上传文件列表
 * @param  {String}   guid     文件guid，以，隔开
 * @param  {Function} callback 回调
 * @return {[type]}            [description]
 */
function getUploadByFileGUid(guid, callback){
	FormOperator.sys_GetUploadByFileGUid(guid,callback);
}

/**
 * 模拟跳转到可见区域，经测试scrollIntoViewIfNeed失效。
 * @return {[type]} [description]
 */
function mockScrollIntoView(evemt) {
    // 该方法在prototype中加入
    evemt.mockScrollIntoView(true);
}

window.becomeAvatarSrc = becomeAvatarSrc;
window.FE_Util = FE_Util;
window.setCheckPop = setCheckPop;


module.exports = {
	receiptStatusCfg: receiptStatusCfg,
	becomeAvatarSrc: becomeAvatarSrc,
	friendlyFormatDate: friendlyFormatDate,
    FE_Util: FE_Util,
    setCheckPop: setCheckPop,
    getCodeString: getCodeString,
    getNameString: getNameString,
    getPersonArrayByPersonId: getPersonArrayByPersonId,
    getDeptArrayByDepId: getDeptArrayByDepId,
    getUploadByFileGUid: getUploadByFileGUid,
    getGUID: getGUID,
    isArrar: isArray,
    mockScrollIntoView: mockScrollIntoView
} 