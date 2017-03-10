
/**
 * 焦点控制
 */
export default {
  inserted: function(el, binding) {
    if (binding.value) {
      el.focus();
      console.log('test')
      
    }
    else el.blur();
  },
  componentUpdated: function(el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return;
      }
    }
    if (binding.value) {
    console.log('update')
      window.el = el;
      setTimeout(function(){ 
        //UtilHelper.mockScrollIntoView(el)
        el.scrollIntoViewIfNeeded();
      },1000)
      el.focus();
      // setTimeout(function(){ if(UtilHelper && UtilHelper.mockScrollIntoView) UtilHelper.mockScrollIntoView(el)},100)
    }
    else el.blur();
  }
};
