

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
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_positive_number);                    
                        break;
                    case '-number':
                        reg = /^(((-((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))))|(-[1-9][0-9]*))$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_negative_number);                    
                        break;                                                
                    case 'int':
                        reg = /^-?[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_integer);
                        break;
                    case '+int':
                        reg = /^[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_positive_integer);
                        break;
                    case '-int':
                        reg = /^-[1-9][0-9]*$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_negative_integer);
                        break;
                    case 'float':
                        reg = /^(-?((0\.)|([1-9][0-9]*\.)))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_float);
                        break;
                    case '+float':
                        reg = /^((0\.)|([1-9][0-9]*\.))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_positive_float);
                        break;
                    case '-float':
                        reg = /^(-(((0\.)|([1-9][0-9]*\.))))(([0-9]*[1-9]{1})|(0{1,2}))$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_negative_float);
                        break;
                    case 'ip':
                        reg = /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.ip_address_error);
                        break;
                    case 'email':
                        reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.email_address_error);
                        break;
                    case 'phone':
                        reg = /^(\d{3,4}-)?\d{7,8}$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.telephone_number_format_error);
                        break;
                    case 'mobile':
                        reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.phone_number_format_error);
                        break;
                    case 'phone|mobile':
                        reg = /(^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$|^(\d{3,4}-)?\d{7,8}$)/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.number_format_error);
                        break;
                    case 'name':
                        reg = /^([\u4e00-\u9fa5]|[a-zA-Z])((([\u4e00-\u9fa5]|[a-zA-Z])*[\.]{0,1}([\u4e00-\u9fa5]|[a-zA-Z]))*)$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.name_format_error);
                        break;
                    case 'noSpecial':
                        reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)((([\u4e00-\u9fa5]|[a-zA-Z]|\d)*[\.]{0,1}([\u4e00-\u9fa5]|[a-zA-Z]|\d))*)$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.name_format_error);
                        break;
                    case 'num&letters':
                        reg = /^((\d|\w)*)$/;
                        info = reg.test(val) ? '' : '只允许输入数字或者字符';
                        break;                        
                    case 'money':
                        reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_amount);
                        break;
                    case 'url':
                        reg = /^(http:\/\/)?(\w+\.){1,3}(((com|org|net|mil|edu|gov)(\.(uk|jp|cn|hk))?)|ca|io|cc|in|au|co\.cc|co\.in|uk|jp|cn|hk)((\/|\?)[\w-\/?%&=]*)?$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_url);
                        break;    
                    case 'postcode':
                        reg = /^[1-9][0-9]{5}$/;
                        info = reg.test(val) ? '' : (message ? message : i18nJson.please_enter_the_correct_zip_code);
                        break;                                              
                    default:
                        var reg = new RegExp(valid);
                        var content = vm.label || vm.title;

                        info = reg.test(val) ? '' : ( message ? message : content + i18nJson.input_error);
                        break;
                }
            }
        }
        return info;
}