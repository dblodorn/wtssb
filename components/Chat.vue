<template>
  <div class="chat-window">
    <div class="chat-close flex-center-vert x-pad-single">
      <h6 class="white" v-html="sense"/>
      <slot/>
    </div>
    <ul class="chat flex-column pad-single">
      <li
        v-for="(chat, i) in chatData"
        :key="`ln-${i}`"
      >
        <div v-if="chat.acf_fc_layout === 'text'" class="text-wrapper">
          <div class="chat-name">
            <span v-html="chat.name"/>
          </div>
          <p v-html="chat.text"/>
        </div>
        <div v-if="chat.acf_fc_layout === 'image'" class="image-wrapper">
          <img :src="chat.image">
        </div>
      </li>
    </ul>
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
    --close-height: 4rem;
  }
  .chat-close {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--close-height);
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
  .chat {
    width: 100%;
    height: calc(100% - var(--close-height));
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .image-wrapper {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
  }
</style>