/* 拖拽控件 */

<template>
     <div  >
        <draggable :list="items"  :move="checkMove" :options="option" @end="onEnd" style="display:inline">
               <div class="avatar"  v-for="(row,index) in items" :name="row.code" :class="getIgnores(index)"  >
                  <ximg :xsrc="getSrc(row.code)"></ximg>
                  <span class="name">{{ row.name }}</span>
                  <ins v-if="allowedit" class="icon-del" @click="del(index)"></ins>
               </div>
        </draggable>
       <a v-if="allowedit" class="fn-btn-add" href="javascript:;" @click="add"></a>
    </div >
</template>

<script>
export default {
    props:{
        items:{type:Array,default:function(){return []}},
        allowedit:{type:[String,Number,Boolean],default:function(){return false}},
        dragable:[String,Number,Boolean],
        controltype:{
            type:String,
            default:''
        }
    },
    computed: {
        option() {
            return {
                animation: 150,
                forceFallback: false,
                filter: '.gnore',
                draggable:'.avatar',
                disabled:this.dragable,
                onEnd:this.onEnd,
                onMove:this.onMove,
                dragable:this.dragable
            }
        }
    },
    watch:{
    },
    created(){
        // this.myList = this.items.$model;
    },
    methods : {
        add : function(){
            // 抄送人控件
            if(this.controltype == 'sendcontrol'){
                this.$store.dispatch('editAddSendPerson');
            }else{
                //固定审批人
                this.$store.dispatch('editAddApplyPerson');               
            }
        },
        del : function(i){
            if(this.allowedit){   
                if(this.controltype == 'sendcontrol'){
                    this.$store.dispatch('editDelSendPerson', i, 'edit');
                }else{
                    this.$store.dispatch('editDelApplyPerson', i, 'edit');
                }        
            }
        },
        getSrc : function(code){
            return UtilHelper.becomeAvatarSrc(code);
        },
        getIgnores : function(i){
            // console.log(i)
            // if(i > 0 && i < this.items.length-1){
            //     if(this.items[i - 1].code == this.items[i + 1].code){
            //         return 'ignore';
            //     }else{
            //         return '';
            //     }
            // }else{
            //     return '';
            // }
        },onEnd:function (event){
            debugger;

            // this.$store.dispatch('dragApplyEnd', event);
            var newValue = this.items[event.newIndex];
            var oldValue = this.items[event.oldIndex];
            var newIndex = event.newIndex;
            var oldIndex = event.oldIndex;
            // 临时数组，进行比较相邻
            let tempCompare = [].concat(this.items);
            tempCompare.splice(event.oldIndex,1);
            oldValue = Object.assign({}, oldValue)    
            tempCompare.splice(event.newIndex,0,oldValue)
            for(var i =0; i < tempCompare.length; i++){
                if(i<tempCompare.length-1){
                    if(tempCompare[i].code == tempCompare[i+1].code){
                        Vue.set(this.items, newIndex, newValue);
                        Vue.set(this.items, oldIndex, oldValue);
                        return false;
                    } 
                }
            }

            this.items.splice(event.oldIndex,1);
            oldValue = Object.assign({}, oldValue)    
            this.items.splice(event.newIndex,0,oldValue)
            
            
            return false;
        },checkMove(){
            return true;
        }
    },
    computed: {
        myList: {
            get() {

                 return this.$store.state.form.fixNextPersonArr
            },
            set(value) {
                debugger;
                // this.$store.commit('updateList', value)
            }
        }
    }
}

</script>
