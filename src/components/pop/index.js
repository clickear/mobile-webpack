import PopMessage from './pop-message.vue';
import PopCheck from './pop-check.vue'

/**
 * 此方法提供基本的消息提示框，和确认框。 会在使用时自动挂载在$Pop中。
 */

let messageInstance;
let key = 1;

/**
 * 创建vue实例 当初次使用时，插入body节点，并且独立使用vue初始化
 * @return {[type]} [description]
 */
function newInstance(){
    const div = document.createElement('div');
    div.innerHTML = `<pop-message></pop-message> <pop-check></pop-check>`;
    document.body.appendChild(div);

    const vueInstance = new Vue({
        el: div,
        data: {},
        components: {PopMessage, PopCheck }
    });
    const popMessageNotice = vueInstance.$children[0]
    const popCheckNotice = vueInstance.$children[1]

    return {
        popMessageShow (content, duration, type, onClose) {
            popMessageNotice.show(content, duration, type, onClose);
        },
        popCheckShow(content, title, confirmtxt, onClose){
            popCheckNotice.show(content, title, confirmtxt, onClose);
        },
        popMessageClose () {
            popMessageNotice.close();
        },
        popCheckClose(){
            popCheckNotice.close();
        },
        component: vueInstance,
        destroy () {
            document.body.removeChild(div);
        }
    }
}

/**
 * 获取实例，由于整个文件为一个模块，故这里为闭包
 * @return {[type]} [description]
 */
function getMessageInstance () {
    messageInstance = messageInstance || newInstance()
    return messageInstance;
}

/**
 * 弹出框
 * @param  {String} content  提示内容
 * @param  {Number} duration 延迟关闭时间
 * @param  {String} type     图标显示类型
 * @param  {Function} onClose  回调函数
 * @return {[type]}          [description]
 */
function notice (content, duration = 2000, type, onClose) {
    if (!onClose) {
        onClose = function () {

        }
    }
    let instance = getMessageInstance();
    instance.popMessageShow(content, duration, type, onClose);
}

/**
 * 确定框
 * @param  {String} content    内容
 * @param  {String} title      标题
 * @param  {String} confirmtxt 确定按钮文字
 * @param  {Function} onClose  回调函数
 * @return {[type]}            [description]
 */
function check(content,title,confirmtxt, onClose){
    if (!onClose) {
        onClose = function () {}
    }
    let instance = getMessageInstance();
    instance.popCheckShow(content, title, confirmtxt, onClose);
}

export default {
    popMessage:{
        info (content, duration, onClose) {
            return notice(content, duration, 'info', onClose);
        },
        success (content, duration, onClose) {
            return notice(content, duration, 'success', onClose);
        },
        warning (content, duration, onClose) {
            return notice(content, duration, 'warn', onClose);
        },
        error (content, duration, onClose) {
            return notice(content, duration, 'error', onClose);
        },
        loading (content, duration, onClose) {
            return notice(content, duration, 'loading', onClose);
        },close(){
            return getMessageInstance().popMessageClose();
        }
    },
    popCheck:{
        show(content, title, confirmtxt = '确定', onClose){
            return check(content,title,confirmtxt, onClose);
        },close(){
            return getMessageInstance().popCheckClose();
        }
    }
}