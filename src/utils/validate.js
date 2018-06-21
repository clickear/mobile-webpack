
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

 if(/Android [4-6]/.test(navigator.appVersion)) {
     window.addEventListener("resize", function() {
         if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
             window.setTimeout(function() {
                 document.activeElement.scrollIntoViewIfNeeded();
             },0);
         }
     })
 }



/**
 * 模拟ScrollIntoViewIfNedd事件，该事件在android触发不稳定。
 */

if (!Element.prototype.mockScrollIntoView) {
  Element.prototype.mockScrollIntoView = function (centerIfNeeded) {
    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
    var parent = getParent(this),
        parentComputedStyle = window.getComputedStyle(parent, null),
        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
        overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
        alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
    }

    if ((overLeft || overRight) && centerIfNeeded) {
      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
    }

    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
      this.scrollIntoView(alignWithTop);
    }
  };
}


// where
function getParent(el) {
    var parent = el.parentNode;

    if (parent === document) {
        return window;
   } else if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
        return parent;
    } else {
        return getParent(parent);
    }
}




Date.prototype.format = function ( fmt ) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;
}

/**
 * 移除右端空格
 * @@return { string }
 */     
Date.prototype.addDays = function ( d ) {
    this.setDate(this.getDate() + d);
};

/**
 * 移除右端空格
 * @@return { string }
 */     
Date.prototype.addWeeks = function ( w ) {
    this.addDays(w * 7);
};

/**
 * 移除右端空格
 * @@return { string }
 */     
Date.prototype.addMonths = function ( m ) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);

    if (this.getDate() < d)
        this.setDate(0);
};

/**
 * 移除右端空格
 * @@return { string }
 */     
Date.prototype.addYears = function ( y ) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);

    if (m < this.getMonth()) {
        this.setDate(0);
    }
};

/**
 * 移除右端空格
 * @@return { string }
 */     
Date.prototype.toRecentMonth = function( num ) {
    var m = this.getMonth();

    if(num > 0) {
        num -= 1;
    } else {
        num += 1;
    }

    this.setMonth(m + num);
    this.setDate(1);
    
    return 
};



export default function validate(val, valids, message, vm){
    var info = '', reg = null, flag = true, validArr = valids.split(',');
        if (val != '') {
            for (var i = 0; i < validArr.length; i++) {
                var valid = validArr[i];

                switch (valid) {
                    case 'number':
                        reg = /^((-?((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2})))|(-?[1-9][0-9]*))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入数字');                    
                        break;
                    case '+number':
                        reg = /^((((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2})))|([1-9][0-9]*))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的正数');                    
                        break;
                    case '-number':
                        reg = /^(((-((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))))|(-[1-9][0-9]*))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的负数');                    
                        break;                                                
                    case 'int':
                        reg = /^-?[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的整数');
                        break;
                    case '+int':
                        reg = /^[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的正整数');
                        break;
                    case '-int':
                        reg = /^-[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的负整数');
                        break;
                    case 'float':
                        reg = /^(-?((0\.)|([1-9][0-9]*\.)))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的浮点数');
                        break;
                    case '+float':
                        reg = /^((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的正浮点数');
                        break;
                    case '-float':
                        reg = /^(-(((0\.)|([1-9][0-9]*\.))))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的负浮点数');
                        break;
                    case 'ip':
                        reg = /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])$/;
                        info = reg.test(val) ? '' : (message ? message : 'IP地址有误');
                        break;
                    case 'email':
                        reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/;
                        info = reg.test(val) ? '' : (message ? message : '电子邮件地址有误');
                        break;
                    case 'phone':
                        reg = /^(\d{3,4}-)?\d{7,8}$/;
                        info = reg.test(val) ? '' : (message ? message : '电话号码格式有误');
                        break;
                    case 'mobile':
                        reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                        info = reg.test(val) ? '' : (message ? message : '手机号错误');
                        break;
                    case 'phone|mobile':
                        reg = /(^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$|^(\d{3,4}-)?\d{7,8}$)/;
                        info = reg.test(val) ? '' : (message ? message : '号码格式有误');
                        break;
                    case 'name':
                        reg = /^([\u4e00-\u9fa5]|[a-zA-Z])((([\u4e00-\u9fa5]|[a-zA-Z])*[\.]{0,1}([\u4e00-\u9fa5]|[a-zA-Z]))*)$/;
                        info = reg.test(val) ? '' : (message ? message : '姓名格式不正确，仅支持中文、英文、和空格');
                        break;
                    case 'noSpecial':
                        reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)((([\u4e00-\u9fa5]|[a-zA-Z]|\d)*[\.]{0,1}([\u4e00-\u9fa5]|[a-zA-Z]|\d))*)$/;
                        info = reg.test(val) ? '' : (message ? message :'姓名格式不正确，仅支持中文、英文、和空格');
                        break;
                    case 'num&letters':
                        reg = /^((\d|\w)*)$/;
                        info = reg.test(val) ? '' : '只允许输入数字或者字符';
                        break;                        
                    case 'money':
                        reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的金额，如11.00');
                        break;
                    case 'url':
                        reg = /^(http:\/\/)?(\w+\.){1,3}(((com|org|net|mil|edu|gov)(\.(uk|jp|cn|hk))?)|ca|io|cc|in|au|co\.cc|co\.in|uk|jp|cn|hk)((\/|\?)[\w-\/?%&=]*)?$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的网址');
                        break;    
                    case 'postcode':
                        reg = /^[1-9][0-9]{5}$/;
                        info = reg.test(val) ? '' : (message ? message : '请输入正确的邮政编码');
                        break;                                              
                    default:
                        var reg = new RegExp(valid);
                        var content = vm.label || vm.title;

                        info = reg.test(val) ? '' : ( message ? message : content + ('输入错误'));
                        break;
                }
            }
        }

        return info;
}