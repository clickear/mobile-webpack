/* 创建表单编辑抄送人 */

<template>
     <div >
        <div v-sortable:fixMembers="{animation: 150,forceFallback: false, filter: '.ignore', draggable : '.avatar',handle:'.avatar',disabled:!allowedit,onEnd:onEnd}" style="display:inline">
               <div class="avatar"  v-for="row in items" name="{{row.code}}" :class="getIgnores($index)"  >
                  <ximg :xsrc="getSrc(row.code)"></ximg>
                  <span class="name">{{ row.name }}</span>
                  <ins v-if="allowedit" class="icon-del" @click="del($index)"></ins>
               </div>
        </div>
       <a v-if="allowedit" class="fn-btn-add" href="javascript:;" @click="add"></a>
    </div>
</template>

<script>
export default {
    props:{
        items:{type:Array,default:function(){return [{name:'测试',code:111},{name:'测试1',code:222}]}},
        allowedit:{type:[String,Number,Boolean],default:function(){return false}},
        apply:[String,Number,Boolean]
    },
    data:function(){
        return{
                defaultSortable: {}
            }
    },
    watch:{
        'allowedit':function(val,oldVal){
            this.defaultSortable && this.defaultSortable.option && this.defaultSortable.option("disabled", !val);
        }
    },
    ready:function(){
        var that = this;
        if(this.apply){
            //这里注意，只能初始化一次。如果初始化多次。会出错。
            var drags = document.getElementById('fixMembers');
            this.defaultSortable = Sortable.create(drags, {
            animation: 150,
            forceFallback: false,
            disabled:!this.allowedit,
            ghostClass : 'ghost',
            filter: ".ignore",
            draggable : '.avatar',
            onEnd : function(evt){
                    

                    return false;


                }
            });
        }
    },
    methods : {
        add : function(){
            console.log('add')
            this.$dispatch('add');
        },
        del : function(i){
            if(this.allowedit){
                this.items.splice(i, 1);
                this.$dispatch('del', i, 'edit');
            }
        },
        getSrc : function(code){
            return becomeAvatarSrc(code);
        },
        getIgnores : function(i){
            // console.log(i)
            if(i > 0 && i < this.items.length-1){
                if(this.items[i - 1].code == this.items[i + 1].code){
                    return 'ignore';
                }else{
                    return '';
                }
            }else{
                return '';
            }
        },onEnd:function (index){
            this.$dispatch('draggable-end',index);
            debugger;
                return true;  
        },draggableend:function(){
            return  true;
        }
    },evnets:{
        'draggable-end':function(){
            debugger;
            return true;
        }
    } 
}

function becomeAvatarSrc(code){
    return ( (Global.HostUrl) + '/officephoto/' + code + '/80');
}

</script>













