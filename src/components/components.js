// photoswipe 配置
import photoswipedefault from '../lib/photoswipe/photoswipe-ui-default.js'
import ximg from 'components/ximg/index.js';
import input from 'components/input-keyword/index.js';
import fix from 'components/fix-memberpicker/index.js';
import audio from 'components/audio-player/index.js';
import photo from 'components/photo-slide/index.js';
import photoswipegalery from 'components/photoswipe-gallery/index.js';
import receipt from 'components/receipt-status/index.js';
import record from 'components/record-items/index.js';
import detail from 'components/detail-operation/index.js';
import approval from 'components/approval-component/index.js';
import reminder from 'components/reminder-component/index.js';
import upload from 'components/upload-images/index.js';
import delfixsend from 'components/delfixsend-component/index.js';
import popmessage from 'components/pop-massege/index.js';
import popchecked from 'components/pop-checked/index.js';
import billlink from 'components/bill-link/index.js';
import {
    editVueMixin,
    detailVueMixin
} from '../mixins/_vue.mixins'

window.editVueMixin = editVueMixin;
window.detailVueMixin = detailVueMixin;

window.getViewModelData = getViewModelData;
window.setCheckPop = setCheckPop;
window.setMsgkPop = setMsgkPop;
window.hadDataChange = hadDataChange;
window.deepDif = deepDif;
window.becomeAvatarSrc = becomeAvatarSrc;
window.lookPersonInfo = lookPersonInfo;
window.PrgressBar = PrgressBar;


function getViewModelData( vm ){
    console.log(vm)
    return JSON.parse(JSON.stringify(vm.$data));
}

/* 表单状态 */
window.receiptStatusCfg = {
    1:{
        action:'progress',
        name: '正在审批中'
    },
    2:{
        action:'success',
        name: '通过'
    },
    3:{
        action:'reject',
        name: '拒绝'
    },
    4:{
        action:'progress',
        name: '未开始'
    },
    5:{
        action:'revoke',
        name: '已撤销'
    },
    6:{
        action:'no-exist',
        name: '不存在'
    },
    7:{
        action: 'done',
        name: '已审'
    },
    8:{
        action: 'waiting',
        name: '待审'
    }
}

function setCheckPop(obj){
    var vn = cloundOfficeApp;
    var txt;
    if(!obj.content){
        obj.content = '';
    }
    if(!obj.title){
        obj.title = '';
    }
    if(!obj.confirmTxt){
        txt = "确定";
    }else{
        txt = obj.confirmTxt;
    }
    vn.checkContent = obj.content;
    vn.checkTitle = obj.title;
    vn.checkConfirmTxt = txt;
    initConfirmPop(function(){
        obj.confirm();
    });
    vn.showCheckPop();
}

function setMsgkPop(obj){
    var vn = cloundOfficeApp;
    if(!obj.content){
        obj.content = '';
    }
    if(!obj.type){
        obj.type = '';
    }
    vn.massegeText = obj.content;
    vn.massegeType = obj.type;
    vn.showMassegePop();
}


function hadDataChange(app){
    console.log(JSON.stringify(app))
    console.log(JSON.stringify(originData))
    for(var i in originData){
        if(originData[i] && originData[i].type){
            var s = moment(app[i]).format('X');
            var t = moment(originData[i].value).format('X');
            if(s !== t){
                return false
            }
        }else{
            var s = deepDif(originData[i], app[i]);
            if(!s){
                return false;
            }
        }
    }
    return true;
}

function deepDif(x, y){
    if(Object.prototype.toString.call(x) == "[object Object]" || Object.prototype.toString.call(x) == "[object Array]"){
        for(var i in x){
            var s = deepDif(x[i], y[i]);
            if(!s){
                return false
            }
        }
    }else{
        if(JSON.stringify(x) !== JSON.stringify(y)){
            return false
        }
    }
    return true;
}



function becomeAvatarSrc(code){
    return ( (Global.HostUrl||'') + '/officephoto/' + code + '/80');
}

function lookPersonInfo(code){
    return sys_lookPerson(code);
}

//图片上传进度模拟数据
window.configStep = [
    {
        stage : 20,//进度分段
        speed : 0.2//进度所有时间比重
    },
    {
        stage : 40,
        speed : 0.4
    },
    {
        stage : 50,
        speed : 0.1
    },
    {
        stage : 80,
        speed : 0.2
    },
    {
        stage : 98,
        speed : 0.1
    }
]
//图片上传模拟实例{domObj:进度条ID,imgSize:图片大小,imgURl:图片地址}
function PrgressBar(domObj,imgSize,imgUrl){
    if(!imgSize){
        imgSize = 500;
    }
    var self = this;
    self.level = 0; /* 进度百分比 */
    self.levelSpeed = []; /* 每加1%进度所要时间 */
    self.levelStep = []; /* 模拟进度改变分段 */
    self.fileSize = imgSize; /* 图片大小 */
    self.netSpeed = 100; /* 模拟网速 */
    self.mockSpeed = self.fileSize / self.netSpeed * 1000; /* 进度所要总时间 */
    self.refreshBar = function(){
        setTimeout(function(){
            domObj.style.display = 'block';
            domObj.nextSibling.innerHTML = '<em class="progress-txt">图片上传中</em><em class="progress-num">'+ self.level +'%</em>';
            domObj.nextSibling.style.display = 'block';
            domObj.style.width = self.level + "%";
            if(self.level >= self.levelStep[0]){
                self.levelSpeed.shift();
                self.levelStep.shift();
            }
            self.level++;
            if(self.levelSpeed.length){
                self.refreshBar();
            }
        }, self.levelSpeed[0])

    }
    self.removeBar = function(){
        domObj.style.display = 'none';
        domObj.nextSibling.style.display = 'none';
    }
    self.setBar = function(num){
        self.refreshBar = function(){};
        domObj.style.display = 'block';
        domObj.nextSibling.style.display = 'block';
        domObj.style.width = num + "%";
        domObj.nextSibling.innerHTML = '<em class="progress-txt">图片上传中</em><em class="progress-num">'+ num+'%</em>';
    }
    self.turnError = function(){
        domObj.nextSibling.innerHTML = '<em class="progress-txt">失败</em><em class="progress-num">点击重试</em>';
        domObj.nextSibling.style.display = 'block';
    }
    for(var i =0 , len = configStep.length; i < len; i++){
        var dStage = 0;
        if(i == 0){
            dStage = configStep[i].stage;
        }else{
            dStage = configStep[i].stage - configStep[i - 1].stage;
        }
        self.levelSpeed[i] = configStep[i].speed * self.mockSpeed / dStage;
        self.levelStep[i] = configStep[i].stage;
    }
    self.refreshBar();
}




Vue.directive('calc-input', {
    bind: function() {
        var me = this;
        me.evt = function(e) {
            var val = me.el.value;
            var maxlengt = me.el.getAttribute('length')
            if (val.length > maxlengt) {
                val = val.substr(0, maxlengt)
            }
            me.el.value = val;
            // Prevent falling in undefined value 
            return val;
        };

        // Add a Event listener
        me.el.addEventListener('input', me.evt, false);
    },

    unbind: function() {
        var me = this;
        // Remove The listener
        me.el.removeEventListener('input', me.evt, false);
    }
});

Vue.directive('input-timeformat', {
    bind: function() {
        var me = this;
        me.evt = function(e) {
            var val = me.el.value;
            var returnStr = "";
            var intSize = me.el.getAttribute('intSize')
            var floatSize = me.el.getAttribute('floatSize')
            var isFormat = me.el.getAttribute('isFormat') == "true";
            var returnStr = FE_Util.formatNumber({
                val: val,
                intSize: intSize,
                floatSize: floatSize,
                isFormat: isFormat
            });

            me.el.value = returnStr;
            // Prevent falling in undefined value
            return returnStr;
        };


        me.blurEvt = function(e) {
            var val = me.el.value;
            var floatSize = me.el.getAttribute('floatSize')
            floatSize = floatSize || 1;
            me.el.value = val * Math.pow(10, floatSize) / Math.pow(10, floatSize);
            return val * 1;
        };

        me.focusEvt = function(e) {
            var val = me.el.value;
            if (val == "0") {
                me.el.value = '';
            }
            return me.el.value;
        }

        // Add a Event listener
        me.el.addEventListener('input', me.evt, false);
        me.el.addEventListener('blur', me.blurEvt, false);
        me.el.addEventListener('focus', me.focusEvt, false);
    },

    unbind: function() {
        var me = this;
        // Remove The listener
        me.el.removeEventListener('input', me.evt, false);
        me.el.removeEventListener('blur', me.blurEvt, false);
        me.el.removeEventListener('focus', me.focusEvt, false);
    }
});

var FE_Util = {
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
    /* filter */
Vue.filter('onlyNumber', {
    // model -> view
    // 在更新 `<input>` 元素之前格式化值
    read: function(val, t) {
        var s = 1;
        if (t) {
            s = parseInt(t)
        }
        return parseFloat(val.toFixed(s))
    },
    // view -> model
    // 在写回数据之前格式化值
    write: function(val, oldVal, t) {
        var number = +val.replace(/[^\d.]/g, '');
        var len = 1;
        if (t) {
            len = t;
        }
        return isNaN(number) ? 0 : parseFloat(number.toFixed(len));
    }
});

Vue.filter('timeStepFilter', {
    // model -> view
    // 在更新 `<input>` 元素之前格式化值
    read: function(val) {
        var s = Math.floor(val);
        if (val * 10 == s * 10) {
            return val
        }
        return (s * 10 + 5) / 10;
    },

    // view -> model
    // 在写回数据之前格式化值
    write: function(val, oldVal) {
        var number = +val.replace(/[^\d.]/g, '')
        return isNaN(number) ? 0 : parseFloat(number.toFixed(1))
    }
});