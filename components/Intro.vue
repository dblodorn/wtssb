<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <div class="intro-copy text-shadow" v-html="copy" />
    <slot/>
    <div class="video-wrapper">
      <video 
        v-if="type === 'mp4'"
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
    console.log(this.type)
  },
  methods: {
    getFileType(file) {
      return file.split('.').pop();
    }
  },
  computed: {
    isLoaded() {
      return this.loaded
    }
  }
}
</script>

<style lang="scss">
  .intro-copy {
    position: fixed;
    z-index: 10000;
    width: 90vmin;
    top: 5vmin;
    left: 10vmin;
    * {
      color: var(--white);
      font-family: var(--cirka);
      font-weight: 300;
      font-size: 6vmin;
      line-height: 1.2;
    }
  }
</style>