# mobile-webpack

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests 
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
## TODO

+ fix-component 修改未更新
+ 抄送人


# 待修改部分

## 暴露全局变量

+ vue 	Vue Vue类库文件
+ jquery jQuery $  jquery类库文件
+ moment moment 时间类库文件
+ photoswipe PhotoSwipe 图片滑动文件
+ ../src/lib/datepicker/scripts/datepicker  CarouselDatepicker 时间控件




## common包含文件:

+ 'vue',
+ 'jquery',
+ 'moment',
+ 'jqueryui',
+ 'photoswipe',
+ 'src/lib/photoswipe/photoswipe-ui-default.js',
+ 'src/style/common'


## 缺少库
lazy-load


## components 
> 组件说明： 部分组件来源于iview 

### 组件公共方法
	+ getValue();	// 获取值，用于保存在数据库中
	+ setValue(val);	// 设置值
	+ setDisplaymodel(model) //设置显示模式
	+ validValue(checkModel) // 用于校验 特别说明：checkModel 校验模式 当为true值，仅仅是为了验证是否可以校验通过,，而不需要显示错误提示框。为了提交按钮置灰功能的实现.返回值: boolean

### 组件公共属性
	// 传递属性
	+ label 
	+ value
	+ defaultvalue
	+ id
	+ name
	+ classname
	+ placeholder
	+ displaymodel
	+ multiple 
	+ must
	+ valid  // 校验规则

	//自有属性
	+ isValid //校验是否通过
	+ validInfo // 错误提示信息


### pop 弹出框组件
> pop组件，分为2种，popMessage(消息提示框) 和popCheck (confirm提示框，有确定，取消按钮)。pop组件挂载在Vue.prototype.$Pop。也就是说所有Vue的实例都可以调用，即this.$pop.popMessage 可获取popMessage对象。

+ popMessage:
	提供方法：
	+  *成功提示框* success (content, duration, onClose) ：content 内容 ，duration 延迟多久后消息提示框消失(以秒为单位，可填小数) onClose 关闭回调函数
	+  *提醒提示框* warning (content, duration, onClose) ：content 内容 ，duration 延迟多久后消息提示框消失(以秒为单位，可填小数) onClose 关闭回调函数
	+  *关闭* close()

+ popCheck:
	提供方法：
	+ *显示* show(content, title, onClose, confirmtxt = '确定') : content 内容， title 标题 onClose 关闭回调函数 confirmtxt 确定按钮文字 默认确定
	+ *关闭* close()

+ 例子: 在组件的methonds方法中，可直接使用this.$Pop.popCheck.show('内容','标题'，function(){})

### message 提示语组件(来源于iview)
> 组件说明：该组件，来源于iview，具体使用可参考官方文档。该组件，也是挂载在Vue.prototype.$Message中。并且，用自己的Vue中。

+ Message
	+ info
	+ warning
	+ error


+ TextBox
	+ 组件名称： ndtextbox
	+ 属性说明:
	
		```
		//  <ndtextbox id="username" v-ref:username name="username" label="姓名" :must="false" :readonly="false"></ndtextbox>
		label: '',    // 标签名称
		value: '',  // 控件值
		name: '',
		id:'', 
		classname: '', 
		placeholder: '', 
		//  align: '', 
		displaymodel: false,   //显示模式
		multiple: false,        // 是否多行文本  input textarea 切换
		lettercount: true,      // 输入字数统计，仅对多行文本有效  
		unit: '',               // 单位
		valid: '',            
		max: '',
		min: '',
		maxlen: 999,            // 最大长度
		//   labelwidth: 120,     // 仅仅对pc端有效 
		//   width: '100%',        // 仅仅对pc端有效 
		//   height: 100,            // 文本框高度，仅对多行文本有效 
		must: false,            // 也可为数字 代表必须的长度(会将覆盖length)
		readonly: false,
		// caertPosition: 0, 
		focalize: false,        // 焦点控制
		compType: 'textbox',
		title: '',              // 标题
		```        


		+ 事件
		> 通过，配置vm下的config的属性将会被复制到vm上。可以直接获取相应的值。
		    +  事件:
		         + clickEvent: 点击事件
		         + inputvent： input事件
		         + focusEvent: 获取焦点事件
		         + blurEvent：blur 事件
+ radiogroup 
    + 组件名称：radiogroup
    + 组件属性:

| 组件属性 | 组件类型 | 组件名称
| :------ | :------ | : ------        
| label   |   string | 字段名称
| name | string | 字段name 一般与id 一致
| radios | [] | 数据
| must | boolean | 是否必填
| displaymodel | boolean | 显示模式
| config | object | 配置数据
| value | string | 组件值，以,隔开
> 数据说明:
```
// 例子数据
radio_cfg:{
             radios: [
                          {
                            label: '小学', value: '1',
                            checkEvent: function (ev, vm, radio) {
                                console.log('小学radio checked:');
                                console.log(vm.getData().label);
                            },
                            changeEvent: function (ev, vm, radio) {
                                console.log('小学radio changed:' + vm.value);
                            }
                        },
                        { label: '初中',  value: '2' },
                        { label: '高中', value: '3' },
                        { label: '大学', enable: false, value: '4' }
                        ]
}
// 对象属性说明
| label | 选项名称 
| value | 选项值
| enable | 是否可选
| checkEvnet | 选中事件
| changeEvent | 值变化事件
```

    + 组件主要方法
        + getData
        + getValue
        + setValue
    
+ checkboxgroup (与radiogroup 基本一致)
    + 组件名称：checkboxgroup 
    + 组件属性:

| 组件属性 | 组件类型 | 组件名称
| :------ | :------ | : ------        
| label   |   string | 字段名称
| name | string | 字段name 一般与id 一致
| cheboxes| [] | 数据
| must | boolean | 是否必填
| displaymodel | boolean | 显示模式
| config | object | 配置数据
| value | string | 组件值，以,隔开
> 数据说明:
```
// 例子数据
radio_cfg:{
             cheboxes: [
                          {
                            label: '小学', value: '1',
                            checkEvent: function (ev, vm, radio) {
                                console.log('小学radio checked:');
                                console.log(vm.getData().label);
                            },
                            changeEvent: function (ev, vm, radio) {
                                console.log('小学radio changed:' + vm.value);
                            }
                        },
                        { label: '初中',  value: '2' },
                        { label: '高中', value: '3' },
                        { label: '大学', enable: false, value: '4' }
                        ]
}
// 对象属性说明
| label | 选项名称 
| value | 选项值
| enable | 是否可选
| checkEvnet | 选中事件
| changeEvent | 值变化事件

```
    + 组件主要方法
        + getData
        + getValue
        + setValue


# 注意点：
+ .layout-bd 去除z-index,为了显示ndselect的fix-header
+ fix-member 替换为drag-memberpickear
+ audioPlayer date format
+ UtilHelper, SopNative 提取
+ 弹出框控件未检查
+ billLink 未验证

# 后期验证注意点
+ 单行文本输入框，默认字数上限20个字，是否右配置设置
+ 数字输入组件 未进行位数校验
+ 金额组件		未进行位数校验
+ 金额组件		检验规则可能不对。默认是小数点后2位
+ 多选框		显示问题  …… 和 
+ 人员组件		折叠功能
+ 各组件		详情页面 必填不显示
+ 部门控件		
+ defaultvalue 	问题

+ 

