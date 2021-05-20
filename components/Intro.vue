<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <div class="intro-copy text-shadow">
      <p class="intro-p" v-html="copy" />
      <p v-if="!isDesktop"><span>To get the full experience, please view on a laptop or desktop computer.</span></p>
    </div>
    <slot/>
    <div class="video-wrapper">
      <img :src="videoPoster" alt="">
      <video
        ref="introVideo"
        playsinline 
        muted
        autoplay
        :poster="videoPoster"
        :src="video"
        @ended="endedHandler"
      />
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

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
  methods: {
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },
    endedHandler() {
      this.$refs.introVideo.play();
      this.setVideoDone()
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
    getFileType(file) {
      return file.split('.').pop();
    },
    ...mapMutations({
      setVideoDone: 'setVideoDone'
    })
  },
  computed: {
    ...mapGetters({
      isDesktop: 'screen/isDesktop'
    }),
    isLoaded() {
      return this.loaded
    }
  }
}
</script>

<style lang="scss">
  .intro-copy {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    padding: 4rem 2rem 0;
    * {
      color: var(--black);
      font-family: var(--cirka);
      font-weight: 300;
      font-size: 3.25rem;
      line-height: 1.08;
      padding-bottom: 0;
    }
    span {
      display: inline-block;
      padding-top: 1.5rem;
      font-size: 2.25rem!important;
      line-height: 1.1;
      font-style: italic;
    }
  }
  @media(--lg) {
    .intro-copy {
      top: 5vmin;
      left: 10vmin;
      max-width: 90vmin;
      padding: 0;
      * {
        color: var(--white);
        font-size: 6vmin;
        line-height: 1.08;
      }
      span {
        font-size: 4vmin!important;
      }
    }
    span {
      font-size: 2.25rem!important;
    }
  }
  @media(--lg) {
    .intro-copy {
      top: 5vmin;
      left: 10vmin;
      max-width: 90vmin;
      padding: 0;
      * {
        color: var(--white);
        font-size: 6vmin;
        line-height: 1.08;
      }
      span {
        font-size: 4vmin!important;
      }
    }
  }
</style>