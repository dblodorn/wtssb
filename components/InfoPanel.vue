<template>
  <section id="info-wrapper" class="pad-single y-pad-top inner-page">
    <article>
      <div class="about" v-html="copy"></div>
      <div class="colophon" v-html="colophon"></div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    copy: {
      type: String
    },
    colophon: {
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
      line-height: 1.3;
    }
    .about * {
      font-size: 2.25vmin;
    }
    .colophon * {
      font-size: 1.85vmin;
    }
    a {
      text-decoration: underline!important;
      color: var(--chat-orange)!important;
    }
    article {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 140rem;
      padding-top: 5vmin;
      padding-bottom: 10vmin;
      padding-left: 10vmin;
      grid-gap: 7vmin;
    }
  }
</style>