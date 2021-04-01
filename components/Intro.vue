<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <slot/>
    <div class="video-wrapper">
      <video 
        playsinline 
        muted 
        autoplay
        loop 
        :src="video"
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
    loaded: {
      type: Boolean
    }
  }
}
</script>
