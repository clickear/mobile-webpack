




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
 * 获取人员字符串 如果是数组，则以，隔开，如果是字符串直接返回
 * @param  {[Array,String]} people_id [人员列表，数组或者,隔开。用于原生使用]
 * @return {[type]}           [description]
 */
function getPersonNameString(people_id){
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



window.becomeAvatarSrc = becomeAvatarSrc;
window.FE_Util = FE_Util;
window.setCheckPop = setCheckPop;

module.exports = {
	receiptStatusCfg:receiptStatusCfg,
	becomeAvatarSrc:becomeAvatarSrc,
	friendlyFormatDate:friendlyFormatDate,
    FE_Util:FE_Util,
    setCheckPop:setCheckPop,
    getPersonCodeString:getPersonCodeString,
    getPersonNameString:getPersonNameString

} 