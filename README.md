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
	+ validValue(checkModel) // 用于校验 特别说明：checkModel 校验模式 当为true值，仅仅是为了验证是否可以校验通过，而不需要显示错误提示框。为了提交按钮置灰功能的实现

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
		     



# 注意点：
+ .layout-bd 去除z-index,为了显示ndselect的fix-header
+ fix-member 替换为drag-memberpickear
+ audioPlayer date format
+ UtilHelper, SopNative 提取
+ 弹出框控件未检查
+ billLink 未验证
