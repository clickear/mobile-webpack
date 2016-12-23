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

