<template>
    <div class="nd-edit-content" >
      <div class="nd-txt-title" >{{label}}<span v-show="must" style="color:red"> (必填) </span></div>
        <div class="nd-txt-con">
       		<div v-for="(item,index) in items" class="file-list">
       			<dl style="height:60px;position:relative;">
	       			<dt style="float:left;height: 50px;display:width:50px; inline;clear: both;">
	       				<!--img style="width:50px;height:50px;" -->
	       				<div class="pic">
						    <span class="img-span">
							    <em class="img-box" :style="{ backgroundImage: getBackground(item)}"></em>
								    <ins class="progress" id="ssssss2" v-show="item.state !=undefined && item.state !='uploadSuccess'"  :style="{width:item.progress+'%'}"></ins>
								    <em class="img-progress-box" v-if="item.state " ><em class="progress-txt"></em>
								    <em class="progress-num" v-show="item.state !=undefined && item.state !='uploadSuccess'" >{{(item.progress || 0)}}%</em>
							    </em>
						    </span>
						</div>
	       			</dt>
	       			<dd style="margin-left:60px"> 
	       				{{item.fileName}}
	       				{{item.state}}
	       				{{item.progress}}
	       			</dd>
	       			<dd style="position:absolute;top:0px;right:60px;" @click="delFile(index)" v-show="!displaymodel" >关闭</dd>
	       			<dd style="margin-left:60px">
	       				<span style="color:green">{{ item.fileSize | formatFileSize }}</span>
	       			</dd>
       			</dl>
       		</div>
       		<a class="fn-btn-add" href="javascript:;" @click="uploadFile" v-show="!displaymodel" ></a>
        </div>
      </dvi>
    </div>
</template>


<script >

/**
 * items 结构体 [{}]
 * {
 * 		componentName:''
 * 		state:'',
 * 		progress:'',
 * 		fileSize:'',
 * 		fileType:'',
 * 		fileName:'',
 * 		progress:0
 * 		key:'', 唯一值,
 * 		src:'',
 * 		w:'',
 * 		h:'',
 * 		time:''
 * 		
 * }
 */

export default {
	props:{
		name: String,
		displaymodel: {
			type: Boolean,
			default: true
		},
		label: {
			type: String
		},
		value: {
			type: [String,Array],
			default: function () {return []}
		},
		items: {
            type: Array,
            default: function () {return []}
        },
        must: {
        	type:Boolean,
        	default:false
        }
	},
	data () {
		return {
			compType: 'uploader',
			cacheFile: {},
            isValid:true,
            // 出错信息提示
            validInfo:''
		}
	},

	created(){
        Object.assign(this,this.config);
        let vm = this;

        // 查看模式
        if( vm.displaymodel && this.value){
            UtilHelper.getUploadByFileGUid(this.value,function(personArr){
                vm.items = [].concat(personArr);
            });
        }

        if(UtilHelper.isArrar()){
        	vm.items = vm.value;
        }
    },
	methods:{
		getBackground(item){
			var src = item.src;
			var fileName = item.fileName
			var fileType = /\.([^.]+)$/.exec(fileName) ? RegExp.$1 :'';
			if(fileType && fileType.indexOf('|jpg|png|jpemg')){
				if(src != undefined && /^http/.test(src)){
					src = src.replace('(', '\\(');
		            src = src.replace(')', '\\)');
		            return "url(" + src + "&size=80)";
				}
			}
			if(item.state && item.state != 'uploadSuccess'){
				return '';
			}
			console.log(fileType)
			return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACj0lEQVRIx7WXTUhVQRSAv/N6RRC1kBJqUVQUVLSsJCpapjhFoP0tplKpRbUIpEVt+8Ek+qEIiRaNBZVF0Ki1rE1o4bIyoo0EioIFRVii02LmwWXw/el9Z3OYc87cb2buPXPOFVISZdwQ0AdY4LnV8qdQvKQIdonhD+Am0Ga1TKQCVsYtA24DO4Fmq+VVsG8B9gCHgQ0h/BNwzGr5MCewMq4BuANUB9Ow1bIiiskACrgEbAImgSar5WHZ4MQuD8Q+q0XyzFkAXANOA1PAUavlUcngGXZZEjgx/xzQBkwAO6yWAYBMkUlPgK580FLEarkK3AUWAg+UcfOLgmc62gKLfKeMu6CMWzqDuxX4gn/nJwFEGVcL3AeWx8cXpUi+HcWx40CL1fIiWlg9PseHgDWZGDoHqQdeA1VAlzLuYOTvAQaBlcDuTEpQrJYeq6UWOA/MA+4p46oTfgc8DcO6Yu94Ngu4Eo50MXAqcr8NuiZ1cJDrQe+L7INBr60U+H3QGyP7WNBVlQLn5F8+R6XAW4P+GtlzOT5eKfDZoF9G9lzV+pY6WBnXiq9Ov/B3fFJ2Bd2XBYZJIZeVcXXAGXxNngZOWC2jCX8GOBKGvRmgBRhJYbM9AToONFotjyP/fmAd/sp8k7VaetPYMdAPdAMdVstY0qGMWwRcDsN2q2UqW+Rhz4CGUqhWS00B9y1gPfAR6IAi6WS1NOJL4yizFGVcO9AE/MV3IZNFwQHeBWzGNwTlAJco4zrxtXga3xgO5PzlNnuN+N4rV3VGrJblUUwWOARcBFbhm71mq6UzGTeb9rY6wLfjU6Y32LcBe/Ht7eoQ/hk4brX0x8+pVEP/E7hBgYa+2FddjnzH/8J0439hfhcK/g8CIdSYKIeLHwAAAABJRU5ErkJggg==)'
		},
		/**
		 * 上传文件方法 
		 * 调用原生方法： componentName(组件名称) + multiple(多选)
		 *  webapp  --> 调用uploadFile 
		 *  native  --> 开始上传文件
		 *  		--> 开始返回上传进度  调用upLoadStateCallback 返回进度信息
		 *  		--> 上传结束后，调用 上传结束回调方法
		 *  webapp  --> 调用回调方法，更新组件的数据 
		 * @return {[type]} [description]
		 */
		uploadFile(){
		    var vm = this;
            var fileOption = {};
            var sFileKey = UtilHelper.getGUID().replace(',','@');
            fileOption.componentName = this.name;
            fileOption.sFileKey = sFileKey;

            fileOption.src = 'http://cs.101.com/v0.1/static/cscommon/avatar/199186/199186.jpg?size=80';
            fileOption.fileName = '文档图片.jpg';
            fileOption.fileSize = 10000;

            sys_uploadFile(fileOption, function (objType) {
           		var isExist = false;
           		console.log('上传文件回调。');
           		let fileArr = vm.items;
				for(var i=0 ; i<fileArr.length; i++) {
                    if(fileArr[i].key && fileArr[i].key == objType.key) {
                        var sFileGuid = fileArr.sFileGuid || UtilHelper.getGUID().replace(',','@');
        				let newItem = (Object.assign({}, objType, { state:'uploadSuccess',bComponent: true, sFileGuid:sFileGuid, lType:2})) 
        	 			Vue.set(vm.items, i, newItem);
                        vm.cacheFile[objType.key] = newItem;
                        isExist = true;
                        break;
                    }
                }

	            // 如果startUpload未开始调用，而上传结束就开始调用时，直接插入
	            
	     //        if(!isExist){
	 				// var sFileGuid = UtilHelper.getGUID().replace(',','@');
	     //    		let newItem = (Object.assign({}, objType, { state:'uploadSuccess',bComponent: true, sFileGuid:sFileGuid, lType:2})) 
	     //    	 	vm.items.push(newItem);
	     //            vm.cacheFile[objType.key] = newItem;
	     //        }
            })
		},
		/**
		 * 删除操作 删除时，需要将cacheFile中的key删除
		 * @param  {LONG} index 在数组中的位置
		 * @return {[type]}       [description]
		 */
		delFile (index) {
			var key = this.items[index].key;
			try{
				sys_stopUploadFile(this.name, key);
			}catch(e){
				
			}
			delete this.cacheFile[key];
			this.items.splice(index, 1);
		},
		/**
		 * 获取值，用于存储在数据库的该字段的值
		 * @return {String} sFileGuid 以,隔开
		 */
		getValue () {
			let guidArr = [];
			for(let i in this.items ){
				if ( this.items[i].sFileGuid){
					guidArr.push(this.items[i].sFileGuid);
				}
			}
			return guidArr.join(',');
		},
		/**
		 * 获取数据，用于表单附件提交
		 * @return {[type]} [description]
		 */
		getData () {
			return this.items;
		},
		/**
		 * 正在上传的，校验不通过
		 * @param  {Boolean} checkModel 校验模式
		 * @return {[type]}            [description]
		 */
		validValue(checkModel){
            let vm = this;
            for(var key in vm.items){
            	if(vm.items[key] && vm.items[key].state && vm.items[key].state != 'uploadSuccess'){
            		return false;
            	}
            }
            return true;
        },
	},
	events:{
		/**
		 * 进度条回调，由原生调用方法。由根组件广播事件，进行调用
		 * @param  {[type]} objType [description]
		 * @return {[type]}         [description]
		 */
		uploadProgress(objType){
			if(objType && objType.componentName == this.name ){
				switch(objType.state){
					case "startUpload":{
						if (this.cacheFile[objType.key] == undefined) {
							this.cacheFile[objType.key] = objType;
							this.items.push(objType);
						}
						break;
					}
					case "uploadFail":
					case "uploading": {
						let fileArr = this.items;
						// 未上传完成
						if (this.cacheFile[objType.key] && this.cacheFile[objType.key].state != 'uploadSuccess'){
							for(var i=0 ; i<fileArr.length; i++) {
                                if(fileArr[i].key == objType.key) {
                                	let newItem = (Object.assign({}, this.cacheFile[objType.key], {state:objType.state, progress:objType.progress})) 
                                    Vue.set(fileArr, i, newItem);
                                    this.cacheFile[objType.key] = newItem;
                                    break;
                                }
                            }
						}
						break;
					}
				}
			}
		}
	}
}

</script>

<style type="text/css">
.img-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
}

.img-span {
	 position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 0 6px 6px 0;
    text-align: center;
}

.img-progress-box{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 30%;
    text-decoration: none;
}
</style>