
/* see the directions https://github.com/sagalbot/vue-sortable*/
/** see the sortable.js https://github.com/RubaXa/Sortable  */
import Sortable from 'sortablejs'


function sortable(newOption, oldOption) {
    newOption = newOption || {}
    // when it already register and update disabled
    if (oldOption && newOption != oldOption) {
      if (this.arg && this.vm.sortable[this.arg]) {
        this.vm.sortable[this.arg].option("disabled", !!newOption.disabled);
        return;
      }
    }
    if(!newOption.dragable){
      return;
    }
    var sortable = new Sortable(this.el, newOption)
    if (this.arg && !this.vm.sortable) {
      this.vm.sortable = {}
    }
    //  Throw an error if the given ID is not unique
    if (this.arg && this.vm.sortable[this.arg]) {
      console.warn('[vue-sortable] cannot set already defined sortable id: \'' + this.arg + '\'')
    } else if (this.arg) {
      this.vm.sortable[this.arg] = sortable
    }
  }


export default {
    inserted:function(el, binding){
        let option = binding.value;
        var sortable = new Sortable(el, option);
        el.sortable = sortable;

    },
    update:function(el, option){
        if( el.sortable && (option.value.disabled != option.oldValue.disabled)){
            // el.sortable.option('disabled', !! option.value.disabled);
        }
        
    }

}

// module.exports = sortable;