/* 图片查看 */

<template>
    <div class="pic" :class="(items.length == 4 || items.length <= 2) && resize? 'fix' : ''">
        <span v-for="row in items"><em class="img-box" v-bind:style="{ backgroundImage: getBackground(row.src)}" @click="gotoPlay($index)"  track-by="src"></em>
        <ins id="{{row.key}}" class="progress"></ins>
        <em class="progress-box"><em class="progress-txt">图片上传中</em><em class="progress-num"></em></em>
        <ins v-if="allowedit" @click="del($index)" class="icon-del"></ins></span>
    </div>
</template>

<script>
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export default{
    props: ['items', 'allowedit', 'resize'],
     methods: {
        gotoPlay(i) {
            var items = this.items;
            initPhotoSwipe({
                index: i,
                items: items
            });
        },
        del(i) {
            if (!this.allowedit) {
                return
            }
            try {
                if (this.items[i] && this.items[i].key) {
                    window.imgProgressAry[this.items[i].key] = {};
                }
            } catch (e) {}
            this.items.splice(i, 1);
            // this.$dispatch('del', i);
        },
        getBackground(src) {
            src = src.replace('(', '\\(');
            src = src.replace(')', '\\)');
            return "url(" + src + "&size=80)";
        }
    }
}

function initPhotoSwipe(opt) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = opt.items;
    var options = {
        index: opt.index,
        galleryUID: 1
    };
    var gallery2 = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery2.listen('gettingData', function(index, item) {
        if (!item.w || item.w == 0) {
            item.w = 1600;
        }
        if (!item.h || item.h == 0) {
            item.h = 1600;
        }

    });
    gallery2.init();
}

</script>

