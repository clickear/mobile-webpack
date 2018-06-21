
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

// items组件
import selectItems from 'components/select-items'

// 原生替代，可考虑移除
import reminder from 'components/reminder-component/index.js';

import draggable from 'vuedraggable'
import { editVueMixin, detailVueMixin } from '../mixins/_vue.mixins';
 
import ndForm from 'components/nd-form'
import ndTextbox from 'components/nd-textbox'
import ndSelect from 'components/nd-select'
import ndSelectOld from 'components/nd-select-old'
import ndCheckbox from 'components/nd-checkbox'
import ndRadiogroup from 'components/nd-radiogroup'
import ndCheckboxgroup from 'components/nd-checkboxgroup'
import ndMemberpicker from 'components/nd-memberpicker'
import ndDeptpicker from 'components/nd-deptpicker'
import ndSeparation from 'components/nd-separation'
import ndVoice from 'components/nd-voice'
import ndUploader from 'components/nd-uploader'   

import ndCalculator from 'components/nd-calculator';
import ndEvaluate from 'components/nd-evaluate';
import ndDetailtable from 'components/nd-detailtable';
import ndDatepicker from 'components/nd-datepicker';
import ndDatezone from 'components/nd-datezone';

import sortable from '../directives/vue-sortable'
import calcInput from '../directives/calcInput'
import inputTimeformat from '../directives/inputTimeformat'
import focus from '../directives/focus'

import lazy from '../directives/lazy'
import Vuex from 'vuex'

window.Vuex = Vuex;
Vue.use(lazy);


const ndDirectives = {
    sortable,
    calcInput,
    inputTimeformat,
    focus
};

const ndComponents = {
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
    ndTextbox,
    ndSelect,
    ndSelectOld,
    ndCheckbox,
    ndRadiogroup,
    ndCheckboxgroup,
    ndDatepicker,
    ndDatezone,
    ndMemberpicker,
    ndDeptpicker,
    ndSeparation,
    ndVoice,
    ndEvaluate,
    ndDetailtable,
    ndCalculator,
    ndUploader,
    draggable
};

Object.keys(ndComponents).forEach((key) => {
    Vue.component(key, ndComponents[key])
});

Object.keys(ndDirectives).forEach((key) => {
    Vue.directive(key, ndDirectives[key])
});

Vue.prototype.$Pop = PopMessageJS;
Vue.prototype.$Items = selectItems;

window.editVueMixin = editVueMixin;
window.detailVueMixin = detailVueMixin;

window.getViewModelData = getViewModelData;
window.hadDataChange = hadDataChange;
window.deepDif = deepDif;

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

Global.startTime = new Date();
console.log('初始化时间'+ new Date())

/**
 * 格式化文件大小，输入字符串
 * @param  {Array}  value) 
 * @return {[type]}        [description]
 */
Vue.filter('formatFileSize', function (size) {
    var unit;

    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    while ( (unit = units.shift()) && size > 1024 ) {
        size = size / 1024;
    }

    return (unit === 'B' ? size : size.toFixed(2 )) +
            unit;
})
