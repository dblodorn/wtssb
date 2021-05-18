<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <div 
      class="intro-copy text-shadow" 
      v-html="`<p>${copy}</p>`"
      ref="description"
    />
    <slot/>
    <div class="video-wrapper">
      <video
        playsinline 
        muted
        autoplay
        loop
        :poster="videoPoster"
        :src="video"
        @ended="endedHandler"
      />
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
    videoPoster: {
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
    this.$nextTick(() => {
      this.textRoll(this.$refs.description)
    })
  },
  methods: {
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },
    endedHandler() {
      console.log('video ended')
    },
    textRoll(array) {
      this.asyncForEach(array, async (item, index) => {
        await waitFor(250);
        item.$el.classList.add('reveal')
        if (array.length - 1 === index) {
          this.lastCallback()
        }
      })
    },
    lastCallback() {
      console.log('type done')
    },
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
      line-height: 1.08;
    }
  }
</style>