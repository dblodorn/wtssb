<template>
  <viewport-wrapper :zIndex="10000">
    <div class="modal-inner pad-single">
      <div id="chat-wrapper" class="chat-window">
        <div class="chat-close flex-center-vert x-pad-single">
          <h6 class="white" v-html="sceneData.sense"/>
          <button @click="closeHandler(sceneData.sense)" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>e-remove</title><g stroke-width="1" fill="var(--white)" stroke="var(--white)"><line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line> <line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
          </button>
        </div>
        <ul class="chat flex-column" ref="chat">
          <li
            v-for="(chat, i) in sceneData.currentChat"
            :key="`ln-${i}`"
            :class="['chat-item', chat.acf_fc_layout]"
          >
            <chat-item 
              :chat="chat"
              :imageHandler="(arg) =>  imageCallback(arg)"
            />
          </li>
        </ul>
      </div>
      <div class="scene-image-wrapper" :style="`--scroll:${rotate}`">
        <transition name="dissolve">
          <div class="scene-image-inner" :key="currentAsset.file">
            <video v-if="currentAsset.type === 'video'" playsinline muted autoplay loop :src="currentAsset.file"/>
            <img v-else :src="currentAsset.file">
          </div>
        </transition>
      </div>
    </div>
    <div class="modal-background" @click="closeHandler(sceneData.sense)"/>
  </viewport-wrapper>
</template>

<script>
import Chat from './Chat'
import ChatItem from './ChatItem'

export default {
  name: 'SceneModal',
  components: {
    Chat,
    ChatItem
  },
  props: {
    sceneData: {
      type: Object
    },
    closeHandler: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      rotate: 0,
      chatHeight: 0,
      currentAsset: {
        file: this.sceneData.video,
        type: 'video'
      }
    }
  },
  mounted() {
    const children = Array.from(this.$refs.chat.children)
    children.forEach(element => {
      this.chatHeight = this.chatHeight + element.children[0].scrollHeight
    });
    console.log('height', this.chatHeight)
    this.$refs.chat.addEventListener('scroll', 
      (event) => this.scroll(event), { passive: true }
    )
  },
  beforeDestroy() {
    this.$refs.chat.removeEventListener('scroll',
      (event) => this.scroll(event), { passive: true }
    )
  },
  methods: {
    imageCallback(arg) {
      this.currentAsset = {
        file: arg,
        type: 'image'
      }
    },
    scroll(event) {
      this.rotate = event.target.scrollTop / ( this.chatHeight - this.$refs.chat.offsetHeight)
    }
  }
}
</script>

<style lang="scss">
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(calc(var(--chat-width) * -1));
    }
    to {
      transform: translateX(0);
    }
  }
  :root {
    --img-wrapper-size: 95vh;
  }
  .modal-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .scene-image-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img,
    video {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .scene-image-wrapper {
    animation: rotate 1s linear infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -1s);
    animation-iteration-count: 1;
    animation-fill-mode: both;
    z-index: 100;
    position: absolute;
    top: calc((100vh - var(--img-wrapper-size)) / 2);
    left: calc((100vh - var(--img-wrapper-size)) * 2);
    width: var(--img-wrapper-size);
    height: var(--img-wrapper-size);
    border-radius: calc(var(--img-wrapper-size) / 2);
    overflow: hidden;
    backface-visibility: hidden; 
  }
  /* CHAT */
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
    animation: slideIn 250ms once;
    animation-fill-mode: both;
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
    padding: 0 0 2rem;
  }
  .chat-item {
    padding: 0 var(--chat-x-pad) 2rem;
    &.image {
      padding: 0!important;
    }
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