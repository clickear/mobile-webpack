/* 音频播放 */

<template>
    <div>
        <div class="voice" v-for="row in items" @click="gotoPlay(row)" :class="status? status : 'stop'" :status="row.status">
            <span class="v1" v-html="getTime(row.time)"></span>
            <span class="v2" v-html="getDate(row.date)"></span>
            <ins v-if="allowedit" class="icon-del" @click="del"></ins>
        </div>
    </div>
</template>

<script >

export default{

    props:['items', 'allowedit', 'status'],
    methods:{
        gotoPlay(row){
            var selft = this;           
            SopNative.recordPlay(row.src,function(recordStatus){
                if(recordStatus){                   
                    if(recordStatus.status == 'play'){
                        selft.status = 'play'
                    }else
                    {
                        selft.status = 'stop';
                    }
                }
            });
        },
        getTime(t){
            var time = "";
            var minu = Math.floor(t/60) ;
            var secon = t%60;
            if(minu > 0){
                time = minu +'m'
            }
            time += (secon + 's');
            return time;
        },
        getDate(d){
             var date = "";
            var recordDate;
            if(d){
                recordDate = new Date(d);
            }else{
                recordDate = new Date();
            }
            date = recordDate.format("MM-dd");
            return date;
        },
        del(i){
            if(!this.allowedit){
                return
            }
            this.items.splice(i, 1);
        }
    }
}

</script>

