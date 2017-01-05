
<template>
  <div class="nd-cell" :class="{'weui_select_after':label, 'weui_cell_select':!displaymodel}">
    <div class="weui_cell_hd" v-if="label" :class="{'nd-cell-primary':displaymodel}">
      <label for="" class="nd-label" >{{label}}</label>
    </div>
    <div class=" nd-cell-primary  nd-checkbox-container" v-if="!displaymodel" >

    <input class= "nd-switch" type="checkbox" :value="ischecked" @click="$onclick" :disable="!enable"/>

    <!--
	    <span class="ui-checkbox"
	    	:class="{'checked':ischecked,'disable': !enable}"
	          ms-click="$onclick()">
	       
	    </span>
	-->
    </div>
    <div class="nd-cell-right" v-else>
      {{ text }}
      <input type="hidden" :id="id" :value=":value">
    </div>
  </div>



</template>



<script>

	export default{
		props:{
			label: {
				type:String,
				default:''
			},
	        
	        enable: {
	        	type:Boolean,
	        	default:true
	        },
	        ischecked:{
	        	type:Boolean,
	        	default:false
	        },
	        //外部参数
	        //changeEvent: null,
	        //checkEvent: null,
		},
		methods:{
			$onclick(){
				let vm = this;
 				if (vm.ischecked) {
					if (typeof vm.checkEvent == 'function') {
					    vm.checkEvent(vm);
					}
				}
				if (typeof vm.changeEvent == 'function') {
					vm.changeEvent(vm);
				}
			}, 
			getValue(){
        		return this.ischecked;
        	},

		},
		created(){
			Object.assign(this,this.config);
		}
	}
	
</script>

<style>

.nd-checkbox-container{
	padding:4px;
    text-align: right;
}

.nd-switch{
	-webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background: #DFDFDF;
}

.nd-swith.checked{
    border-color: #04BE02;
    background-color: #04BE02;
}

.ui-checkbox:before{
	font-family: iconfont!important;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
}


.ui-checkbox{
	display: inline-block;
    cursor: pointer;
    color: #847171;
}



.nd-switch {
  appearance: none;
  position: relative;
  width: 52px;
  height: 32px;
  border: 1px solid #DFDFDF;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background: #DFDFDF;
}
.nd-switch:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background-color: #FDFDFD;
  transition: transform .3s;
}
.nd-switch:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform .3s;
}
.nd-switch:checked {
  border-color: #04BE02;
  background-color: #04BE02;
}
.nd-switch:checked:before {
  transform: scale(0);
}
.nd-switch:checked:after {
  transform: translateX(20px);
}


/*
.ui-checkbox:before {
	content: '\e634';
}

.ui-checkbox:before,
.ui-radio:before {
  font-size: 28px;
  color: #5ab8f6;
  margin-right: 2px;
  vertical-align: middle;
  height: 19px;
  line-height: 19px;
}
.ui-checkbox.checked:before {
  content: '\e636';
}


.nd-checkbox-checked:after{
	    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 16px;
    margin: auto 0;
    width: 21px;
    height: 21px;
    background-size: 100px;
    background-position: -30px -170px;
}*/

</style>

