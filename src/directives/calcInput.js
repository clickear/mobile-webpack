/** 提供给系统表单使用 */
export default {
    bind: function() {
        var me = this;
        me.evt = function(e) {
            var val = me.el.value;
            var maxlengt = me.el.getAttribute('length')
            if (val.length > maxlengt) {
                val = val.substr(0, maxlengt)
            }
            me.el.value = val;
            return val;
        };
        // Add a Event listener
        me.el.addEventListener('input', me.evt, false);
    },

    unbind: function() {
        var me = this;
        // Remove The listener
        me.el.removeEventListener('input', me.evt, false);
    }
}

