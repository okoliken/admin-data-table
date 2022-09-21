import Vue from 'vue'

Vue.filter('numberFormat', function(value) {
    let val = value || 0
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  })
  
  Vue.filter('formatPrice', function(value) {
    let val = (value / 1).toFixed(2).replace(',', '.') || '0'
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  })
  