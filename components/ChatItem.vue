<template>
  <div 
    :class="['chat-item-wrapper bezier-500', intersected && 'intersected']"
    ref="container"
  >
    <div v-if="chat.acf_fc_layout === 'text'" class="text-wrapper">
      <div class="chat-name flex-centered">
        <span v-html="chat.name"/>
      </div>
      <div class="chat-text">
        <p v-html="chat.text"/>
      </div>
    </div>
    <div v-if="chat.acf_fc_layout === 'image' && !chat.feature_image" class="image-wrapper">
      <div class="image-inner">
        <img :src="chat.image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  props: {
    chat: {
      type: Object
    },
    imageHandler: {
      type: Function,
      default: (arg) => console.log(arg)
    }
  },
  data () {
    return {
      loaded: false,
      observer: null,
      intersected: false,
      config: {
        root: null,
        rootMargin: '-10px',
        threshold: 0
      }
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(entries => {
      const container = entries[0]
      if (container.isIntersecting) {
        this.intersected = true
        if (this.chat.feature_image) {
          this.imageHandler(this.chat.image)
        }
      }
    }, this.config)
    this.observer.observe(this.$el)
  },
  destroyed () {
    this.observer.disconnect()
  }
}
</script>

<style lang="scss">
  .chat-item-wrapper {
    width: 100%;
    position: relative;
    opacity: 0;
    transform: translateY(.5rem);
    transition-delay: 200ms!important;
    &.intersected {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    overflow-y: visible;
    padding-bottom: 100%;
  }
  .image-inner {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      object-fit: cover;
    }
  }
</style>