<template>
  <div class="chat-window">
    <div class="chat-close flex-center-vert x-pad-single">
      <h6 class="white" v-html="'sense'"/>
      <slot/>
    </div>
    <!--<raw-displayer :value="chatData"/>-->
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    chatData: {
      type: Array,
      default: []
    },
    sense: {
      type: String,
      default: 'Sense'
    }
  }
}
</script>

<style lang="scss">
  :root {
    --chat-width: 38rem;
    --chat-bg: #999;
  }
  .chat-close {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    background: var(--black);
    justify-content: space-between;
  }
  .chat-window {
    width: var(--chat-width);
    height: 70vh;
    position: fixed;
    bottom: 0;
    right: 6rem;
    background-color: var(--white);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    background: var(--chat-bg);
    z-index: 1000;
    overflow: hidden;
  }
</style>