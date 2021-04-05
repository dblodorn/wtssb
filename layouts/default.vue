<template>
  <main class="page-wrapper">
    <nuxt />
  </main>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      breakpoint: 'screen/breakpoint'
    })
  },
  data() {
    return {
      menuState: false
    }
  },
  created () {
    if(process.env.TARGET === 'server') { this.getData() }
    this.debouncedResize = debounce(this.resize, 1)
  },
  mounted () {
    this.setTouch()
    this.setScreenSize()
    window.addEventListener('resize', this.debouncedResize, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debouncedResize, { passive: true })
  },
  methods: {
    async resize() {
      const size = await this.setScreenSize()
      this.$nextTick(() => this.$bus.$emit('resize', size))
    },
    toggleMenu() {
      this.menuState = !this.menuState
    },
    ...mapActions({
      getData: 'getData',
      setTouch: 'screen/setTouch',
      setScreenSize: 'screen/setScreenSize'
    })
  }
}
</script>

<style lang="scss">
  @keyframes pulseAlpha {
    0% {
      opacity: 0.25;
    }
    50% { 
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
  .video-wrapper {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    img,
    video {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  #intro-wrapper {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11000;
    position: absolute;
    background: var(--black);
  }
</style>