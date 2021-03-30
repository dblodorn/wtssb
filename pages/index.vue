<template>
  <viewport-wrapper :zIndex="1">
    <navigation
      :class="!modelsLoaded && 'loading'"
      :cameraHandler="(slide) => cameraHandler(slide)"
    />
    <intro 
      v-if="!modelsLoaded"
      :video="data.intro_video"
    />
    <portal v-if="modal" to="modal">
      <viewport-wrapper :zIndex="10000">
        <div class="modal-inner pad-single">
          <chat 
            :chatData="currentChat"
            :sense="sense"
          >
            <button @click="closeHandler(currentSlide)" class="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>e-remove</title><g stroke-width="1" fill="var(--white)" stroke="var(--white)"><line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line> <line fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
            </button>
          </chat>
          <div class="video-wrapper">
            <video v-if="video" playsinline muted autoplay loop src="/Smell_Scene_v1d-Arnold.mp4"></video>
          </div>
        </div>
      </viewport-wrapper>
    </portal>
    <section 
      id="three-world" 
      :class="['bezier-300', modelsLoaded && 'visible']"
      ref="threeWorld"
    />
  </viewport-wrapper>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

import { 
  startWorld, 
  clearWorld,
  cameraHandler
} from './../createThree'

import Navigation from '@/components/Navigation'
import Intro from '@/components/Intro'
import Chat from '@/components/Chat'


export default {
  layout: 'threelanding',
  asyncData () {
    return axios.get(`${process.env.CMS_URL}`)
      .then((res) => {
        return { data: res.data.options }
      })
  },
  components: {
    Navigation,
    Intro,
    Chat
  },
  data() {
    return {
      currentSlide: 1,
      worldWrapper: null,
      sense: 'touch',
      modal: true,
      video: false,
      modalTimeout: null,
      modelsLoaded: false,
      currentChat: null
    }
  },
  mounted() {
    this.worldWrapper = this.$refs.threeWorld
    this.video = this.data.video_1
    this.currentChat = this.data.scene_1_chat
    this.$nextTick(() => {
      setTimeout(() => {
        startWorld({
          container: this.worldWrapper,
          data: this.data,
          onLoad: () => {this.loadedHandler()},
          ball1: () => {this.ball1Handler()},
          ball2: () => {this.ball2Handler()},
          ball3: () => {this.ball3Handler()},
          ball4: () => {this.ball4Handler()},
          ball5: () => {this.ball5Handler()},
          ball6: () => {this.ball6Handler()},
        })
      }, 50)
    })
  },
  beforeDestroy() {
    clearWorld()
    clearTimeout(this.modalTimeout)
  },
  methods: {
    ...mapMutations({
      setPopup: 'setPopup'
    }),
    cameraHandler(slide) {
      cameraHandler(slide)
      clearTimeout(this.modalTimeout)
    },
    closeHandler(slide) {
      this.modal = false
      cameraHandler(slide)
      this.setPopup(false)
    },
    loadedHandler() {
      this.modelsLoaded = true
    },
    modalPop() {
      this.setPopup(true)
      this.modalTimeout = setTimeout(() => {
        this.modal = true
      }, 50)
    },
    ball1Handler() {
      this.sense = 'touch'
      this.modalPop()
      this.currentSlide = 1
      this.video = this.data.video_1
      this.currentChat = this.data.scene_1_chat
    },
    ball2Handler() {
      this.sense = 'synesthesia'
      this.modalPop()
      this.currentSlide = 2
      this.video = this.data.video_2
      this.currentChat = this.data.scene_2_chat
    },
    ball3Handler() {
      this.sense = 'sight'
      this.modalPop()
      this.currentSlide = 3
      this.video = this.data.video_3
      this.currentChat = this.data.scene_3_chat
    },
    ball4Handler() {
      this.sense = 'hearing'
      this.modalPop()
      this.currentSlide = 4
      this.video = this.data.video_4
      this.currentChat = this.data.scene_4_chat
    },
    ball5Handler() {
      this.sense = 'smell'
      this.modalPop()
      this.currentSlide = 5
      this.video = this.data.video_5
      this.currentChat = this.data.scene_5_chat
    },
    ball6Handler() {
      this.sense = 'taste'
      this.modalPop()
      this.currentSlide = 6
      this.video = this.data.video_6
      this.currentChat = this.data.scene_6_chat
    }
  },
  head () {
    return {
      title: `${process.env.APP_TITLE}`
    }
  }
}
</script>

<style lang="scss">
  .close-button {
    width: 2.25rem;
    height: 2.25rem;
    svg {
      object-fit: contain;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .modal-inner,
  .scene-wrapper,
  #three-world {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .modal-inner {
    background-color: rgba(0,0,0,.75);
  }
  #three-world {
    opacity: 0;
    pointer-events: none;
  }
  #three-world.visible {
    opacity: 1;
    pointer-events: all;
  }
  canvas:focus {
    outline: 0!important;
  }
</style>
