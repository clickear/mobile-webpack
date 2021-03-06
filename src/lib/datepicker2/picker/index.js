import tools from '../common/tools';

import Scroller from '../scroller';
import pickerTemplate from './picker.html';

let pickerRender = tools.tmpl(pickerTemplate);
/**
 * Picker 选择组件
 * @class
 * @options: {
        id: {string} 容器id
        cols: {array} 选择数组
        enable: {boolean} 是否可用
        onChange：{function} 关闭窗口回调
        defaultvalue: {array} 默认值
   }
 */
class Picker {
    /**
     * @constructor
     * @param {object} 配置对象     
     */    
    constructor (options) {
        if (typeof options.container === 'string') {
            this.container = $('#' + options.container);
        } else {
            this.container = options.container;
        }

        this.onChange = options.onChange;
        this.cols = options.cols;

        this.value = options.defaultvalue || [];
        this.scrollers = [];

        this.init();
    }

    /**
     * 初始化
     * @returns none
     */
    init () {
        this.container.html(this.render({
            cols: this.cols
        }));

        this.initScroller();
        this.setValue();
    }

    /**
     * 初始化旋转木马
     * @returns none
     */
    initScroller () {
        let self = this;
        let cols = this.container.find('.ui-picker-items-col');

        this.scrollers = [];

        cols.each(function (i, ele) {
            let container = $(ele);
            let wrapper = container.find('.ui-picker-items-col-wrapper');

            let options = {
                snap: '.ui-picker-item',
                container: container[0],
                wrapper: wrapper[0],
                onChange: function (data) {
                    self.value[i] = data.value;
                    self._onChange();
                }
            };

            
            self.scrollers.push(new Scroller(options));
        });       
    }

    /**
     * 值改变
     * @returns none
     */
    _onChange () {
        let transiting = false;

        for (var i = this.scrollers.length - 1; i >= 0; i--) {
            if (this.scrollers[i].transiting) {
                transiting = true;
            }
        }

        if (!transiting) {
            this.onChange(this.value);
        }
    }

    /**
     * 设置值
     * @param {array|undefined} 值数组
     * @returns none
     */
    setValue (valArr) {
        this.value = valArr || this.value;
        
        if (this.value.length) {
            for (let i = this.value.length - 1; i >= 0; i --) {
                let val = this.value[i];

                if (this.cols[i]) {
                    let rows = this.cols[i].rows;
                    let _i = false;

                    for (let j = rows.length - 1; j >= 0; j --) {
                        let row = rows[j];

                        if (row.value == val) {
                            _i = j;
                            break;
                        }
                    }

                    if (_i !== false) {
                        this.scrollers[i].scrollTo(_i);
                    }
                }
            }
        } else {

            for (var i = this.cols.length - 1; i >= 0; i--) {
                let col = this.cols[i];
                let rows = col.rows;
                
                if (rows.length) {
                    this.value[i] = rows[0].value;
                    this.scrollers[i].scrollTo(0);
                }
            }
        }
    }

    /**
     * 根据新的列数据模型重绘
     * @param {array} 列
     * @returns none
     */
    setCols (cols) {
        this.cols = cols;

        this.container.html(this.render({
            cols: this.cols
        }));

        this.initScroller();    
    }

    /**
     * 获取值
     * @returns {array} 值数组，次序对应列
     */
    getValue () {
        return this.value;
    }

    /**
     * 渲染函数
     * @param {object} 数据
     * @returns none
     */
    render (data) {
        return pickerRender(data);
    } 
}

export default Picker;