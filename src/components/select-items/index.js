import selectItems from './items.vue';

/**
 * 此方法提供基本的消息提示框，和确认框。 会在使用时自动挂载在$Items中。
 */

let selectItemsInstance;
let key = 1;

/**
 * 创建vue实例 当初次使用时，插入body节点，并且独立使用vue初始化
 * @return {[type]} [description]
 */
function newInstance(){
    const div = document.createElement('div');
    div.innerHTML = `<select-items></select-items>`;
    document.body.appendChild(div);

    const vueInstance = new Vue({
        el: div,
        data: {},
        components: {selectItems}
    });
    const componentInstance = vueInstance.$children[0]
    window.componentInstance = componentInstance;
    return {
        showItems (data, selectValue, onClose) {
            componentInstance.showItems(data, selectValue,onClose);
        },
        setOption(opt){
            componentInstance.setOption(opt);
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
function getSelectItemsInstance () {
    selectItemsInstance = selectItemsInstance || newInstance()
    return selectItemsInstance;
}


export default {
    showItems (data, selectValue, onClose) {
        return getSelectItemsInstance().showItems(data,selectValue,onClose);
    },setOption(opt){
        return getSelectItemsInstance().setOption(opt);
    },
    getSelectItemsInstance(){
    	return getSelectItemsInstance();
    }
}