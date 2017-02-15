
<template>
  <div class="nd-cell" :class="{'weui_select_after':label, 'weui_cell_select':!displaymodel}" >
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
    	<div class="dropdown-menu nd-select-list" v-if="data!=null" v-show="false">
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
</template>



<script>

function _interface(){}

export default{
	props: {
        id:String,
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
        	default: false
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
        defaultvalue: {
            type:[Array,String],
            default:function(){return []}
        },
        
        emptymsg: '没有可选择的数据',   // 数据为空的时候的选项


        //内部属性
        value: {
        	type:[String, Number, Array],
        	default:''
        },
        
        width:[],
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
        if(vm.defaultvalue && vm.value ==''){
            vm.value = vm.defaultvalue;
            vm.selectItem = [];
        }
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
                    if (selectItem.indexOf(data[i][options.valuekey].toString()) != -1) {
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

		validValue(checkModel){
			let vm = this;
            let val = vm.getValue() || '';
			if (vm.must === true) {
                if(checkModel){
                    return (val ? false:true);
                }
			    if (val == '') {
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
                vm.$Items.setOption({  
                    multiple:true, 
                    label:vm.label, 
                    setValue:vm.setValue,
                    valuekey:vm.valuekey, 
                    textkey:vm.textkey
                });
		        vm.$Items.showItems(vm.data, vm.value);
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
                    // vm.selectItem.set(0, val);
                    vm.selectItem[0] = val;
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
	ready(){
		let vm = this;
		if(vm.setDefaultValue && vm.setDefaultValue instanceof Function) {
            vm.setDefaultValue(vm, 'select');
        }    

		if (vm.auto == true || vm.displaymodel == true || vm.value!='' || vm.selectItem.length>0) {
           // vm.reloadData(vm.param.$data);
        }

        if(vm.value !== '' && vm.data.length !== 0) {
            vm._buildSelected();
        }
        this.blurHandler = document.body.addEventListener('click', function(e){
    	   if ((e.target.tagName == 'INPUT' && e.target.id == vm.id) || (e.target.tagName == 'I' && e.target.id == vm.id + "_icon")) {
                return;
            }

           // vm.isShowOption = false;
        },false);

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

	.nd-ui-btm-modal{
		position: absolute;
    	z-index: 1000;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
	}

	.nd-ui-btm-modal:before {
    content: '';
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f3f4f8; }

    .nd-select-button{
    	display:block;
    	font-size: 17px;
    	text-align: center;
    }

</style>


