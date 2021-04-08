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
    <!--
    <div v-if="chat.acf_fc_layout === 'image'" class="image-wrapper">
      <img :src="chat.image">
    </div>
    -->
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
        // this.in()
        if (this.chat.acf_fc_layout === 'image') {
          this.imageHandler(this.chat.image)
        }
      } else {
        // this.intersected = false
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
    transform: translateY(1rem);
    transition-delay: 500ms!important;
    &.intersected {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>