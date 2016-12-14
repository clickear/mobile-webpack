import App from './App'
import moment from 'moment'
import $ from 'expose?$!jquery'

Vue.component('app-component', App);

console.log($('#cloundOfficeApp').html())
/* eslint-disable no-new */
window.cloundOffice22 = new Vue({
  el: '#cloundOfficeApp'
})

