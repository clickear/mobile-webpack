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