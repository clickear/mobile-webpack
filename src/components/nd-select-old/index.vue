
<template>
  <div class="nd-cell" :class="{'weui_select_after':label, 'weui_cell_select':!displaymodel}">
    <div class="weui_cell_hd" v-if="label" :class="{'nd-cell-primary':displaymodel}">
      <label for="" class="nd-label" >{{label}}</label>
    </div>
    <div class=" nd-cell-primary nd-cell-body nd-select-container" v-if="!displaymodel" >
    	<div class="input-wrapper"   @click="toggleList($event)"  >
    		<input class="ui-text" 
                   type="text" 
                   :placeholder="placeholder" 
                   :readonly="true" 
                   :id="id"
                   :disabled="!enable"
                   :name="name"
                   v-show ="!isShowOption || !filter"
                   :value="text==''?placeholder:text" />
            <input class="ui-text form-filter" 
                   type="text"
                   v-show ="isShowOption"
                   ms-css-text-align="align"
                   ms-css-padding-left="label=='' ? 0 : labelwidth + 10"
                   v-if="filter"
                   @click="filterHander($event)"
                   v-model="filterText" />

    	</div>
    	<div class="dropdown-menu nd-select-list" v-if="data!=null" v-show="isShowOption">
			<ul>
                <li v-for="el in data"  :class="{'nd-selected': isSelected(el[valuekey])}">
                    <a hidefocus="none" href="javascript:void(0)" :name="el[valuekey]" @click="selectOne($event, el[valuekey])">{{el[textkey]}}{{el.othertext}}</a>
                    <span class="pull-right" v-if="multiple">&#xe605;</span>
                </li>
                <li v-if="data.length === 0">
                    <a href="javascript:void(0)" class="empty">
                        {{ emptymsg }}
                    </a>                  
                </li>
            </ul>
    	</div>
    </div>
    <div class="nd-cell-right" v-if="displaymodel">
      {{ text }}
      <input type="hidden" :id="id" :value="value">
    </div>
  </div>
</template>



<script>
function _interface(){}

export default{
	props: {
 		label: String,
        name: String,
        classname: String,
        placeholder: String,
        enable: {
        	type:Boolean,
        	default:true
        },
        multiple:{
			type: Boolean,
        	default: true
        },
        // 必填
        must: {
        	type:Boolean,
        	default:false
        },
        // 只读
        readonly: {
        	type:Boolean,
        	default:false
        },
        // 显示模式
        displaymodel: {
        	type: Boolean,
        	default:false
        },
        auto: {
        	type:Boolean,
        	default:true
        },
        filter: {
        	type: Boolean,
        	default:false
        },
        
        
        emptymsg: '没有可选择的数据',   // 数据为空的时候的选项


        //内部属性
        value: {
        	type:[String, Number, Array],
        	default:''
        },
        
        loadInfo: '',
        selectValue: '',
        filterText: '',

        //外部参数
        url: {
        	type:String,
        	default:''
        },
        method: 'GET',
        param: {},
        data: [],
        valuekey: {
        	type:String,
        	default:'value'
        }, 
        textkey: {
        	type:String,
        	default:'text'
        },
        // 已经选中的值
        selectItem: {
        	type:[Array,String],
        	default:function(){return []}
        },
        loadEvent: _interface,
        selectEvent: _interface,
        changeEvent: _interface,
	    direction: String,
	    options: {
	      type: Array,
	      required: false
	    },
	    config:{
	    	type:Object,
	    	default:function(){return {}}
	    }
	},
	data(){
		return{
			text: '',
        	key: '',
        	validInfo: '',
        	isLoading:false,
        	isShowOption:false,
        	setDefaultValue:_interface
		}
	},
	created(){
		Object.assign(this,this.config);
		let vm = this;
		const options = Object.assign({},this);

		for (let key in vm.selectItem) {
          if (Object.prototype.hasOwnProperty.call(vm.selectItem, key)) {
            vm.selectItem[key] = vm.selectItem[key].toString();
          }
        }

		if(vm.url == ''){
			let selectItem = vm.selectItem || [];
			let data = vm.data || [];
			var texts = [], values = [];
            if (data.length > 0 && selectItem.length > 0) {
                for (var i = 0; i < data.length; i++) {
                	// todo 类型问题
                    if (selectItem.indexOf(data[i][options.valuekey]) != -1) {
                        texts.push(data[i][options.textkey]);

                        values.push(data[i][options.valuekey]);
                    }
                }
                vm.value = values.join(',');
                vm.text = texts.join(',');
            }
		}


		console.log('初始化成功selector '+vm.value + vm.text)
	},
	methods:{

		$trigger(ev, type, action){
			let vm = this;
			switch (type) {
                case 'loadEvent':
                    if (typeof vm.loadEvent == 'function') {
                        vm.loadEvent(ev, vm, action);
                    }
                    break;
                case 'changeEvent':
                    if (typeof vm.changeEvent == 'function') {
                        vm.changeEvent(ev, vm, action);
                    }
                    break;
                case 'selectEvent':
                    if (typeof vm.selectEvent == 'function') {
                        vm.selectEvent(ev, vm, action);
                    }
                    break;
                default: break;
            }
		},
		validValue(){
			let vm = this;
			if (vm.must === true) {
			    if (vm.getValue() == '') {
			        vm.isValid = false;
			        // todo 
			        // vm.validInfo = i18nJson.unselected;
			        vm.validInfo = '未选择';
			    } else {
			        vm.validInfo = '';
			        vm.isValid = true;
			    }
			}
		},
		isSelected(val){
			let vm = this;
			let flag = false;
            for (var i = 0; i < vm.selectItem.length ; i++) {
                if (vm.selectItem[i] == val) {
                    flag = true;
                    break;
                }
            }
            return flag;
		},
		toggleList(ev){
			let vm = this;
			if (vm.enable&&vm.readonly!=true) {
			    if (vm.isShowOption) {
			        vm.isShowOption = false;
			    } else {
			        vm.isShowOption = true;
			        // todo 
			        vm.filterText = '过滤';

			        if (!vm.auto) {
			            vm.reloadData();
			        }else{
			            //vm._fixedDirect();
			        }
			    }
			}
			ev.stopPropagation();  //w3c
			if(ev && ev.stopPropagation){
			  ev.stopPropagation();  //w3c
			}else{
			  window.event.cancelBubble=true; //IE
			}
		},
		selectOne(ev, val){
			let vm = this;
			val = val.toString();
            var selected = false;
            if (!vm.multiple) {
                if (vm.selectItem.length >= 1) {
                    vm.selectItem = [];
                    vm.selectItem.push(val);
                } else {
                	vm.selectItem[0] = val;
                    // vm.selectItem.set(0, val);
                }

                vm.isShowOption = false;
                selected = true;
            } else {
                var removed = false;
                for (var i = 0; i < vm.selectItem.length ; i++) {
                    if (vm.selectItem[i] == val) {
                       // vm.selectItem.removeAt(i);
                        vm.selectItem.splice(i,1);
                        removed = true; break;
                    }
                }
                if (!removed) {
                    vm.selectItem.push(val);
                    selected = true;
                }
                // 如果为多选，取消冒泡
                ev.stopPropagation()
            }

            vm.value = '';
            
            vm._buildSelected();
            
            if (vm.validInfo != '') {
                vm.validValue(null);
            }

            if (selected) {
                vm.selectValue = val;
                vm.$trigger(ev, 'selectEvent', 'select');
            }

            vm.$trigger(ev, 'changeEvent', 'select');
    
           //stopBubble(ev);
		},
		setDisplaymodel  (model) {
            this.displaymodel = model;
        },
        setData(data){
        	this.data = data;
        	this.selectItem = [];
        	this._buildSelected();
        },
        getValue(){
        	return this.value;
        },

        getText(){
        	return this.text;
        },

        setValue(val){
        	let vm = this;
        	if (val === null || val === '') {
                vm.selectItem = [];
                vm.value = val;
                vm._buildSelected();
                vm.$trigger({}, 'changeEvent', 'set-value');
            } else {
                if (!vm.auto && vm.data.length == 0) {
                    vm.reloadData();
                }
                vm.value = val;
                var arr = val.toString().split(',');
                // todo 
                vm.selectItem = []; 
                vm.selectItem = arr;
                vm._buildSelected();
                vm.$trigger({}, 'changeEvent', 'set-value');

                // if (vm.selectItem.sort().toString() != arr.sort().toString()) {
                //     vm.selectItem.removeAll();
                //     vm.selectItem.pushArray(arr);
                //     vm._buildSelected();
                //     vm.$trigger({}, 'changeEvent', 'set-value');
                // }
            }
        },

        removeData(){
        	let vm = this;
			vm.data = [];
			vm.selectItem = [];
			vm._buildSelected();
			// todo 
			// vm.loadInfo = i18nJson.no_data;
        },

		reloadData(){
			let vm = this;
			vm.auto = true;
            if (vm.url != '') {
                var param = {};
                if (p && typeof p == 'object') {
                    for (var item in p) {
                            param[item] = p[item];
                    }
                }
                // todo 
                // vm.loadInfo = i18nJson.loading_data + '..';
                vm.isLoading = true;

                $.ajax({
                    type: vm.method,
                    url: vm.url,
                    data: param,
                    success: function (data, status, xhr) {
                        if (typeof vm.parseData == 'function') {
                            vm.data = vm.parseData(data);
                        }
                        else {
                            vm.data = data;
                        }
                        if (vm.data.length > 0) {
                            vm._buildSelected();
                            vm.$trigger(data, 'loadEvent', 'load');
                        } else {
                            vm.loadInfo = i18nJson.no_data;
                        }

                        if(vm.setDefaultValue && vm.setDefaultValue instanceof Function) {
                            vm.setDefaultValue(vm, 'select');
                        }

                        vm.isLoading = false;
                        // vm._fixedDirect();
                    },
                    error: function (data) {
                        vm.loadInfo = data.status + '[' + data.statusText + ']';
                        vm.isLoading = false;
                    }
                });
            }
            
		},

		// 同步数据 根据vlue 和 selectItem text
		_buildSelected(){
			let vm = this;
			var texts = [], values = [];

            if (vm.value != '') {
                vm.selectItem = [];

                if (vm.value.toString().indexOf(',')>0) {
                    var valArray = vm.value.split(',');
                    for (var i = 0; i < valArray.length; i++) {
                        vm.selectItem.push(valArray[i]);
                    }
                }else{
                    vm.selectItem.push(vm.value);
                }
            }

            var selectItem = [];
            for (var i = 0; i < vm.selectItem.length; i++) {
                selectItem.push(vm.selectItem[i].toString());
            }

            for (var i = 0; i < vm.data.length; i++) {
                if (selectItem.indexOf(vm.data[i][vm.valuekey].toString()) != -1) {
                    texts.push(vm.data[i][vm.textkey]);
                    values.push(vm.data[i][vm.valuekey]);
                }
            }

            vm.value = values.length > 0 ? values.join(',') : '';
            vm.text = texts.length > 0 ? texts.join(',') : '';
		}

	},
	mounted(){
		let vm = this;
        Vue.nextTick( ()=>{
    		if(vm.setDefaultValue && vm.setDefaultValue instanceof Function) {
                vm.setDefaultValue(vm, 'select');
            }    

    		if (vm.auto == true || vm.displaymodel == true || vm.value!='' || vm.selectItem.length>0) {
               // vm.reloadData(vm.param.$data);
            }

            if (vm.value !== '' && vm.data.length !== 0) {
                vm._buildSelected();
            }
            this.blurHandler = document.body.addEventListener('click', function(e){
        	   if ((e.target.tagName == 'INPUT' && e.target.id == vm.id) || (e.target.tagName == 'I' && e.target.id == vm.id + "_icon")) {
                    return;
                }
               vm.isShowOption = false;
            },false);
        });
	},
	destory(){
		document.body.removeEventListener('click', function(){},false)
	}
}


</script>

<style lang="css">
	.nd-cell {
		background-color: #fff;
		margin-bottom: 23px;
    	border-bottom: 1px solid #eee;
		padding: 0px 15px;
	    position: relative; 
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    font-size: 17px;
	}

	.nd-cell-primary {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}

	.nd-label {
		font-size:15px;
	    color: #000;
	    display: block;
	    width: 105px;
	    word-wrap: break-word;
	    word-break: break-all;
	}

	.nd-select {
		-webkit-appearance: none;
	    border: 0;
	    outline: 0;
	    background-color: transparent;
	    width: 100%;
	    font-size: inherit;
	    height: 44px;
	    line-height: 44px;
	    position: relative;
	    z-index: 1;
	    padding-left: 15px;
	}

	.nd-cell-body:after {
		content: " ";
	    display: inline-block;
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	    height: 6px;
	    width: 6px;
	    border-width: 2px 2px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    position: relative;
	    top: -2px;
	    position: absolute;
	    top: 50%;
	    right: 15px;
    	margin-top: -3px;
	}

	.nd-cell-right {
	    text-align: right;
	    color: #999999;
	}

.nd-select-container{
	position:relative;
	padding:4px;
}

.nd-select-container.displaymodel .control-label {
  position: static;
  display: inline-block;
}
.nd-select-container .ui-text {
  cursor: pointer;
  font-size:15px;
  line-height:15px;
  width:100%;
  padding-right: 30px;
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: none;
}
.nd-select-container .control-content .iconfont {
  position: absolute;
  right: 5px;
  top: 0px;
}
.nd-select-container .nd-select-trigger {
  margin-top: -27px;
  margin-right: 2px;
  cursor: pointer;
  font-style: normal;
}
.nd-select-container .input-wrapper {
  position: relative;
}
.nd-select-container .nd-select-list {
  width: 95%;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;

  min-width: 100px;
  margin: 2px 0 0;
  float: left;
  text-align: left;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #ddd;
}
.nd-select-container .dropup {
  top: auto;
  bottom: 100%;
}
.nd-select-container .nd-select-list li:nth-of-type(1) {
  border-top: 0;
}
.nd-select-container .nd-select-list li {
  border-top: 1px #ddd solid;
}
.nd-select-container .nd-select-list li a {
  text-decoration: none;
  display: block;
  padding: 8px 20px;
  height: 40px;
  line-height: 20px;
  clear: both;
  font-weight: 400;
  color: #333;
  white-space: nowrap;
}
.nd-select-container .nd-select-list li a.empty {
  color: #F75858;
  font-size: 13px;
  line-height: 24px;
}
.nd-select-container .nd-select-list li a:hover {
  background: #F5F5F5;
}
.nd-select-container .nd-select-list li span {
  display: none;
  font-family: iconfont !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: .2px;
  -moz-osx-font-smoothing: grayscale;
}
.nd-select-container .nd-select-list li.nd-selected span {
  display: block;
  float: right;
  margin-top: -37px;
  margin-right: 8px;
  color: #5ab8f6;
  font-size: 18px;
}
.nd-select-container .nd-selected a:link {
  color: #009ee8;
}
.nd-select-container .nd-select-loadinfo {
  font-size: 14px;
  padding-left: 10px;
  height: 22px;
  line-height: 22px;
  font-style: normal;
}
.nd-select-container .displaymodel {
  display: inline-block;
}
.nd-select-container .edit {
  display: none;
  color: #59baf5;
  font-size: 12px;
}
.nd-select-container .edit:hover {
  color: #FF6C00;
}
.nd-select-container:hover .edit {
  display: inline;
  cursor: pointer;
}
.nd-select-container .edit:before {
  content: "\e616";
  font-size: 12px;
  padding-right: 5px;
}
.ui-select .selected-label:after {
  font-family: iconfont !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: .2px;
  -moz-osx-font-smoothing: grayscale;
}

</style>


