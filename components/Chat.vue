<template>
  <div id="chat-wrapper" class="chat-window">
    <div class="chat-close flex-center-vert x-pad-single">
      <h6 class="white" v-html="sense"/>
      <slot/>
    </div>
    <ul class="chat flex-column">
      <li
        v-for="(chat, i) in chatData"
        :key="`ln-${i}`"
        class="chat-item"
      >
        <chat-item :chat="chat"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ChatItem from './ChatItem'

export default {
  name: "Chat",
  components: {
    ChatItem
  },
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
    --chat-width: 42.5rem;
    --chat-bg: #f6faf8;
    --close-height: 4rem;
    --chat-orange: #f37043;
    --chat-blue: #394792;
    --chat-text-offset: 2rem;
    --chat-text-width: 25rem;
    --chat-name-height: 3rem;
    --chat-x-pad: 3rem;
    --chat-y-pad: 1.5rem;
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
    height: 100vh;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: var(--white);
    background: var(--chat-bg);
    z-index: 1000;
    overflow: hidden;
    filter: drop-shadow(0px 0px 15px rgba(0,0,0,.25));
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
    padding: var(--chat-y-pad) 0;
  }
  .chat-item {
    padding: 0 var(--chat-x-pad) 2rem;
    &:nth-child(odd) {
      .chat-name {
        background-color: var(--chat-orange);
      }
      .chat-text {
        margin-left: var(--chat-text-offset);
      }
    }
    &:nth-child(even) {
      .chat-name {
        background-color: var(--chat-blue);
        right: 0;
        * {
          color: var(--white);
        }
      }
      .chat-text {
        float: right;
        margin-right: var(--chat-text-offset);
      }
    }
  }
  .text-wrapper {
    position: relative;
    margin-top: var(--chat-name-height);
  }
  .chat-text {
    padding: var(--pad-single);
    background: var(--chat-bg);
    border-radius: calc(var(--chat-name-height) / 2);
    width: var(--chat-text-width);
    filter: drop-shadow(0px 0px 15px rgba(0,0,0,.25));
    z-index: 0;
  }
  .chat-name {
    padding: 0 var(--pad-single);
    height: var(--chat-name-height);
    border-radius: calc(var(--chat-name-height) / 2);
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,.05));
    max-width: 12rem;
    overflow-x: hidden;
    width: 100%;
    z-index: 10;
    position: absolute;
    top: calc((var(--chat-name-height) / 2) * -1);
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