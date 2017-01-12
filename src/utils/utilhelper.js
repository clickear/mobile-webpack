

window.becomeAvatarSrc = becomeAvatarSrc;


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


module.exports = {
	receiptStatusCfg:receiptStatusCfg,
	becomeAvatarSrc:becomeAvatarSrc,
	friendlyFormatDate:friendlyFormatDate,

} 