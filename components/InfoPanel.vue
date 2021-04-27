<template>
  <section id="info-wrapper" class="pad-single y-pad-top inner-page">
    
  </section>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    copy: {
      type: String
    },
    closeHandler: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      type: null
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
  #info-wrapper {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--black);
    * {
      color: var(--white)!important;
      font-family: var(--cirka);
      font-weight: 300;
      font-size: 4vmin;
      line-height: 1.2;
    }
  }
</style>