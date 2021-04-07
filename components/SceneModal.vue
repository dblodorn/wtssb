<template>
  <viewport-wrapper :zIndex="10000">
    <div class="modal-inner pad-single">
      <chat 
        :chatData="sceneData.currentChat"
        :sense="sceneData.sense"
      >
        <button @click="closeHandler(sceneData.sense)" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>e-remove</title><g stroke-width="1" fill="var(--white)" stroke="var(--white)"><line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line> <line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
        </button>
      </chat>
      <div class="scene-image-wrapper">
        <video v-if="sceneData.video" playsinline muted autoplay loop :src="sceneData.video"></video>
      </div>
    </div>
  </viewport-wrapper>
</template>

<script>
import Chat from './Chat'

export default {
  name: 'SceneModal',
  components: {
    Chat
  },
  props: {
    sceneData: {
      type: Object
    },
    closeHandler: {
      type: Function,
      default: () => {console.log('click')}
    }
  }
}
</script>

<style lang="scss">
  :root {
    --img-wrapper-size: 95vh;
  }
  .scene-image-wrapper {
    z-index: 100;
    position: absolute;
    top: calc((100vh - var(--img-wrapper-size)) / 2);
    left: calc((100vh - var(--img-wrapper-size)) * 2);
    width: var(--img-wrapper-size);
    height: var(--img-wrapper-size);
    border-radius: calc(var(--img-wrapper-size) / 2);
    overflow: hidden;
    backface-visibility: hidden;
    img,
    video {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
</style>