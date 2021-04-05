<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <div class="intro-copy" v-html="copy" />
    <slot/>
    <div class="video-wrapper">
      <video 
        v-if="type === '.mp4'"
        playsinline 
        muted 
        autoplay
        loop 
        :src="video"
      />
      <img v-else :src="video">
    </div>
  </section>
</template>

<script>
export default {
  name: 'intro',
  props: {
    video: {
      type: String
    },
    loaded: {
      type: Boolean
    },
    copy: {
      type: String
    }
  },
  data() {
    return {
      type: null
    }
  },
  mounted() {
    this.type = this.getFileType(this.video)
  },
  methods: {
    getFileType(file) {
      return file.split('.').pop();
    }
  },
  computed: {
    isLoaded() {
      console.log(this.loaded)
      return this.loaded
    }
  }
}
</script>

<style lang="scss">
  .intro-copy {
    position: fixed;
    z-index: 10000;
    width: 70%;
    top: 5vmin;
    left: 10vmin;
    * {
      color: var(--white);
      font-size: 6vmin;
      line-height: 1.2;
    }
  }
</style>