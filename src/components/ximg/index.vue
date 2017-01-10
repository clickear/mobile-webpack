<template>
<img :src="defaultsrc">
</template>

<script >

export default{
    props:{
        'xsrc':'',
        'dsrc':''
    },
    data(){
        return{
            defaultsrc: this.dsrc || './static/img/mobile/ava120.png'
        }
    },
    created(){
        var that = this;
        var img = new Image();
        img.onload = function(){
            that.$el.src = that.xsrc;
        }
        img.src = that.xsrc;
    },
    watch:{
        'xsrc':function(val,oldVal){
            var that = this;
            var img = new Image();

            img.onload = function(){
                that.defaultsrc = that.xsrc;
            }
            img.src = that.xsrc;
        }
    }
}
</script>


