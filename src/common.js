/**
 * 系统表单样式
 */
import './style/css/mobile.scss'
import './style/css/mobile_hack.css'

/**
 * 时间组件datepick 样式
 */
import './lib/datepicker/style/carousel.css'

/**
 * 新时间组件样式
 */
 
import './lib/datepicker2/datepicker.min.css'
/**
 * 样式处理 photoswipe
 */

import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

// import './lib/AreaPicker/css/areapick.css'
 
import './lib/AreaPicker/js/AreaPicker.js'

import './page/pageinit.js'
import './page/formoperator.js'

// js部分，会使用webpack将基本的打入common.js中

import store from './store'

window.store = store;