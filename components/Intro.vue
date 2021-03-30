<template>
  <section id="intro-wrapper" class="pad-single y-pad-top inner-page">
    <div class="video-wrapper">
      <video playsinline muted autoplay loop :src="video"></video>
    </div>
  </section>
</template>

<script>
export default {
  name: 'intro',
  props: {
    video: {
      type: String
    }
  }
}
</script>

<style lang="css">
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