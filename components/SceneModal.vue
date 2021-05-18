<template>
  <viewport-wrapper :zIndex="9000">
    <div class="modal-inner pad-single" @click="closeHandler(sceneData.sense)">
      <div id="chat-wrapper" class="chat-window">
        <div class="chat-close flex-center-vert x-pad-single">
          <h6 class="white" v-html="sceneData.sense"/>
          <button @click="closeHandler(sceneData.sense)" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>e-remove</title><g stroke-width="1" fill="var(--white)" stroke="var(--white)"><line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line> <line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
          </button>
        </div>
        <div class="chat-list-wrapper" ref="chat">
          <ul class="chat flex-column">
            <li
              v-for="(chat, i) in sceneData.currentChat"
              :key="`ln-${i}`"
              :class="['chat-item', chat.acf_fc_layout, chat.feature_image && 'feature-image']"
            >
              <chat-item 
                :chat="chat"
                :imageHandler="(arg) =>  imageCallback(arg)"
              />
            </li>
          </ul>
        </div>
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
  </viewport-wrapper>
</template>

<script>
import ChatItem from './ChatItem'

export default {
  name: 'SceneModal',
  components: {
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
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) { this.closeHandler(this.sceneData.sense) }
    }, { passive: true });
    this.chatHeight = this.$refs.chat.children[0].clientHeight
    this.$refs.chat.addEventListener('scroll', 
      (event) => this.scroll(event), { passive: true }
    )
  },
  beforeDestroy() {
    window.addEventListener('keyup', this.closeHandler, { passive: true });
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
  /* CHAT */
  .chat-close {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--chat-width);
    height: var(--close-height);
    justify-content: space-between;
    border-bottom: 1px solid var(--white);
    z-index: 10;
  }
  .chat-window {
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: hidden;
    animation: slide 350ms;
    animation-delay: 1s;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
    * {
      font-family: var(--font-a);
      font-style: normal;
    }
    &:after {
      content: '';
      background: rgba(0,0,0,.6);
      filter: drop-shadow(0px 0px 15px rgba(0,0,0,.25));
      width: var(--chat-width);
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 0;
    }
  }
  .chat-list-wrapper {
    width: 100vw;
    height: calc(100% - var(--close-height));
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-y: scroll;
    direction: rtl;
    z-index: 10;
    &::-webkit-scrollbar {
      height: 3px;
      width: 3px;
      display: block;
      z-index: 100;
    }
    &::-webkit-scrollbar-track {
      background: black;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--white);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--chat-orange);
    }
  }
  .chat {
    width: var(--chat-width);
    overflow-x: hidden;
    padding: 0 0 2rem;
    z-index: 10;
    direction: ltr;
    float: left;
    z-index: 10;
    position: relative;
  }
  .chat-item.image {
    padding: 0 var(--chat-x-pad) 2rem;
  }
  .chat-item.image.feature-image {
    padding: 0!important;
  }
  .chat-item:first-child {
    .chat-name-inner {
      background-color: var(--dk-grey)!important;
      color: white!important;
    }
  }
  .text {
    padding: 0 var(--chat-x-pad) 2rem;
    .chat-name-inner {
      background-color: var(--chat-orange);
    }
    .chat-text {
      margin-left: var(--chat-text-offset);
    }
  }
  .text-wrapper {
    position: relative;
    margin-top: var(--chat-name-height);
    &.right {
      .chat-name {
        right: 0!important;
        justify-content: flex-end;
        .chat-name-inner {
          background-color: var(--chat-blue);
        }
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
  .chat-text {
    padding: var(--pad-single);
    background: var(--lt-grey);
    border-radius: calc(var(--chat-name-height) / 2);
    width: var(--chat-text-width);
    filter: drop-shadow(0px 0px 15px rgba(0,0,0,.25));
    z-index: 0;
  }
  .chat-name-inner {
    padding: .6rem var(--pad-double) 0;
    overflow-x: hidden;
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,.05));
    border-radius: calc(var(--chat-name-height) / 2);
    height: 100%;
    display: flex;
    align-content: center;
  }
  .chat-name {
    height: var(--chat-name-height);
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
  
  
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes slide {
    from {
      transform: translateX(calc(var(--chat-width) * -1 ));
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
    right: calc((100vh - var(--img-wrapper-size)) * 2);
    width: var(--img-wrapper-size);
    height: var(--img-wrapper-size);
    border-radius: calc(var(--img-wrapper-size) / 2);
    overflow: hidden;
    backface-visibility: hidden; 
  }
</style>