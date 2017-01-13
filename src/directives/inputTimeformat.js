export default{
    bind: function() {
            var me = this;
            me.evt = function(e) {
                var val = me.el.value;
                var returnStr = "";
                var intSize = me.el.getAttribute('intSize')
                var floatSize = me.el.getAttribute('floatSize')
                var isFormat = me.el.getAttribute('isFormat') == "true";
                var returnStr = UtilHelper.FE_Util.formatNumber({
                    val: val,
                    intSize: intSize,
                    floatSize: floatSize,
                    isFormat: isFormat
                });

                me.el.value = returnStr;
                // Prevent falling in undefined value
                return returnStr;
            };


            me.blurEvt = function(e) {
                var val = me.el.value;
                var floatSize = me.el.getAttribute('floatSize')
                floatSize = floatSize || 1;
                me.el.value = val * Math.pow(10, floatSize) / Math.pow(10, floatSize);
                return val * 1;
            };

            me.focusEvt = function(e) {
                var val = me.el.value;
                if (val == "0") {
                    me.el.value = '';
                }
                return me.el.value;
            }

            // Add a Event listener
            me.el.addEventListener('input', me.evt, false);
            me.el.addEventListener('blur', me.blurEvt, false);
            me.el.addEventListener('focus', me.focusEvt, false);
    },

    unbind: function() {
        var me = this;
        // Remove The listener
        me.el.removeEventListener('input', me.evt, false);
        me.el.removeEventListener('blur', me.blurEvt, false);
        me.el.removeEventListener('focus', me.focusEvt, false);
    }

   
}
