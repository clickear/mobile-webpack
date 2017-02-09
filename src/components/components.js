
// 系统基础组件
import ximg from 'components/ximg';
import inputKeyword from 'components/input-keyword';
import dragMemberpicker from 'components/drag-memberpicker'
import audioPlayer from 'components/audio-player';
import photoSlide from 'components/photo-slide';
import photoswipeGallery from 'components/photoswipe-gallery';
import receiptStatus from 'components/receipt-status';
import recordItems from 'components/record-items';
import detailOperation from 'components/detail-operation';
import approvalComponent from 'components/approval-component';
import uploadImages from 'components/upload-images';
import delfixsendComponent from 'components/delfixsend-component';
import billLink from 'components/bill-link';

// 消息组件
import PopMessageJS from 'components/pop';
// iVue message组件
import Message from 'components/message/index.js';
Vue.component('Message', Message);
// 原生替代，可考虑移除
import reminder from 'components/reminder-component/index.js';


import { editVueMixin, detailVueMixin } from '../mixins/_vue.mixins'


// 表单组件
import ndForm from 'components/nd-form'
import ndInput from 'components/nd-input'
import ndTextbox from 'components/nd-textbox'
import ndSelect from 'components/nd-select'
import ndSelectOld from 'components/nd-select-old'
import ndCheckbox from 'components/nd-checkbox'
import ndRadiogroup from 'components/nd-radiogroup'
import ndDatepicker from 'components/nd-datepicker'
import ndMemberpicker from 'components/nd-memberpicker'
import ndDeptpicker from 'components/nd-deptpicker'

import sortable from '../directives/vue-sortable'
import calcInput from '../directives/calcInput'
import inputTimeformat from '../directives/inputTimeformat'


const ndDirectives = {
    sortable,
    calcInput,
    inputTimeformat,
}

const ndComponents = 
{
    // 头像
    ximg,
    inputKeyword,
    fixMemberpicker: dragMemberpicker,
    dragMemberpicker,
    audioPlayer,
    photoSlide,
    photoswipeGallery,
    receiptStatus,
    recordItems,
    detailOperation,
    approvalComponent,
    uploadImages,
    delfixsendComponent,
    billLink,
    // 表单组件
    ndForm,
    ndInput,
    ndTextbox,
    ndSelect,
    ndSelectOld,
    ndCheckbox,
    ndRadiogroup,
    ndDatepicker,
    ndMemberpicker,
    ndDeptpicker
}

Object.keys(ndComponents).forEach((key) => {
    Vue.component(key, ndComponents[key])
});

Object.keys(ndDirectives).forEach((key) => {
    Vue.directive(key, ndDirectives[key])
});

Vue.prototype.$Message = Message;
Vue.prototype.$Pop = PopMessageJS;


window.editVueMixin = editVueMixin;
window.detailVueMixin = detailVueMixin;

window.getViewModelData = getViewModelData;
window.hadDataChange = hadDataChange;
window.deepDif = deepDif;
window.PrgressBar = PrgressBar;

function getViewModelData(vm) {
    return JSON.parse(JSON.stringify(vm.$data));
}

/* 表单状态 */

function hadDataChange(app) {
    console.log(JSON.stringify(app))
    console.log(JSON.stringify(originData))
    for (var i in originData) {
        if (originData[i] && originData[i].type) {
            var s = moment(app[i]).format('X');
            var t = moment(originData[i].value).format('X');
            if (s !== t) {
                return false
            }
        } else {
            var s = deepDif(originData[i], app[i]);
            if (!s) {
                return false;
            }
        }
    }
    return true;
}

function deepDif(x, y) {
    if (Object.prototype.toString.call(x) == "[object Object]" || Object.prototype.toString.call(x) == "[object Array]") {
        for (var i in x) {
            var s = deepDif(x[i], y[i]);
            if (!s) {
                return false
            }
        }
    } else {
        if (JSON.stringify(x) !== JSON.stringify(y)) {
            return false
        }
    }
    return true;
}





//图片上传进度模拟数据
window.configStep = [{
        stage: 20, //进度分段
        speed: 0.2 //进度所有时间比重
    }, {
        stage: 40,
        speed: 0.4
    }, {
        stage: 50,
        speed: 0.1
    }, {
        stage: 80,
        speed: 0.2
    }, {
        stage: 98,
        speed: 0.1
    }]
    //图片上传模拟实例{domObj:进度条ID,imgSize:图片大小,imgURl:图片地址}
function PrgressBar(domObj, imgSize, imgUrl) {
    if (!imgSize) {
        imgSize = 500;
    }
    var self = this;
    self.level = 0; /* 进度百分比 */
    self.levelSpeed = []; /* 每加1%进度所要时间 */
    self.levelStep = []; /* 模拟进度改变分段 */
    self.fileSize = imgSize; /* 图片大小 */
    self.netSpeed = 100; /* 模拟网速 */
    self.mockSpeed = self.fileSize / self.netSpeed * 1000; /* 进度所要总时间 */
    self.refreshBar = function() {
        setTimeout(function() {
            domObj.style.display = 'block';
            domObj.nextSibling.innerHTML = '<em class="progress-txt">图片上传中</em><em class="progress-num">' + self.level + '%</em>';
            domObj.nextSibling.style.display = 'block';
            domObj.style.width = self.level + "%";
            if (self.level >= self.levelStep[0]) {
                self.levelSpeed.shift();
                self.levelStep.shift();
            }
            self.level++;
            if (self.levelSpeed.length) {
                self.refreshBar();
            }
        }, self.levelSpeed[0])

    }
    self.removeBar = function() {
        domObj.style.display = 'none';
        domObj.nextSibling.style.display = 'none';
    }
    self.setBar = function(num) {
        self.refreshBar = function() {};
        domObj.style.display = 'block';
        domObj.nextSibling.style.display = 'block';
        domObj.style.width = num + "%";
        domObj.nextSibling.innerHTML = '<em class="progress-txt">图片上传中</em><em class="progress-num">' + num + '%</em>';
    }
    self.turnError = function() {
        domObj.nextSibling.innerHTML = '<em class="progress-txt">失败</em><em class="progress-num">点击重试</em>';
        domObj.nextSibling.style.display = 'block';
    }
    for (var i = 0, len = configStep.length; i < len; i++) {
        var dStage = 0;
        if (i == 0) {
            dStage = configStep[i].stage;
        } else {
            dStage = configStep[i].stage - configStep[i - 1].stage;
        }
        self.levelSpeed[i] = configStep[i].speed * self.mockSpeed / dStage;
        self.levelStep[i] = configStep[i].stage;
    }
    self.refreshBar();
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