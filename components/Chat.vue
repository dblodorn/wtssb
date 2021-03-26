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
        class="chat-item"
      >
        <div v-if="chat.acf_fc_layout === 'text'" class="text-wrapper">
          <div class="chat-name">
            <span v-html="chat.name"/>
          </div>
          <div class="chat-text">
            <p v-html="chat.text"/>
          </div>
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
    --chat-orange: #f37043;
    --chat-blue: #394792;
    --chat-name-height: 3rem;
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
    * {
      font-family: var(--font-a);
      font-style: normal;
    }
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
  .chat-item {
    &:nth-child(odd) {
      .chat-name {
        background-color: var(--chat-orange);
      }
    }
    &:nth-child(even) {
      .chat-name {
        background-color: var(--chat-blue);
        * {
          color: var(--white);
        }
      }
    }
  }
  .chat-text {
    padding: var(--pad-single);
    background: var(--white);
    border-radius: calc(var(--chat-name-height) / 2);
    width: 80%;
  }
  .chat-name {
    padding: 0 var(--pad-single);
    height: var(--chat-name-height);
    border-radius: calc(var(--chat-name-height) / 2);
    max-width: 18rem;
    z-index: 10;
    transform: translateY(calc(var(--chat-name-height) / 2));
    * {
      font-size: var(--sm-size);
    } 
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