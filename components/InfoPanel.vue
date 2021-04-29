<template>
  <section id="info-wrapper" class="pad-single y-pad-top inner-page">
    <article v-html="copy"></article>
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
    height: 100vh;
    top: 0;
    left: 0;
    background: var(--black);
    overflow-y: scroll;
    * {
      color: var(--white)!important;
      font-family: var(--font-a);
      font-weight: 300;
      font-size: 1.85rem;
      line-height: 1.2;
    }
    article {
      columns: 2;
      max-width: 125rem;
      margin: 10rem auto 0;
    }
  }
</style>