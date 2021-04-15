import Vue from 'vue';

export default Vue.component('dissolve', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'dissolve',
        mode: 'in-out'
      },
      on: {
        beforeEnter: function (el) {},
        afterEnter: function (el) {}
      }
    }
    return createElement('transition', data, context.children)
  }
})