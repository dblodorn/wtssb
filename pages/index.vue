<template>
  <viewport-wrapper :zIndex="1">
    <portal to="controls">
      <div class="controls-wrapper">
        <button class="circle-button mute-button" @click="toggleMuted">
          <svg v-if="!muted" viewBox="0 0 94.47 87.88" xml:space="preserve">
            <path class="st0" d="M47.43,15.64c15.68,0,28.45,12.76,28.45,28.45S63.12,72.53,47.43,72.53S18.98,59.77,18.98,44.09 S31.75,15.64,47.43,15.64 M47.43,14.64c-16.26,0-29.45,13.18-29.45,29.45c0,16.26,13.18,29.45,29.45,29.45 c16.26,0,29.45-13.18,29.45-29.45C76.88,27.82,63.69,14.64,47.43,14.64L47.43,14.64z"/>
            <polygon class="st0" points="47.18,56.63 39.28,48.74 34.54,48.74 34.54,44.16 34.54,44.01 34.54,39.44 39.28,39.44 47.18,31.54 "/>
            <line class="st1" x1="49.84" y1="48.83" x2="60.32" y2="38.36"/>
            <line class="st1" x1="60.32" y1="48.83" x2="49.84" y2="38.36"/>
          </svg>
          <img v-else src="icons/Sound-On-Icon-Blue.svg" alt="">
        </button>
        <button class="circle-button info-button" @click="setInfoPopup">
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 94.47 87.88" xml:space="preserve">
            <path class="st0" d="M47.24,15.64c15.68,0,28.45,12.76,28.45,28.45S62.92,72.53,47.24,72.53S18.79,59.77,18.79,44.09 S31.55,15.64,47.24,15.64 M47.24,14.64c-16.26,0-29.45,13.18-29.45,29.45c0,16.26,13.18,29.45,29.45,29.45s29.45-13.18,29.45-29.45 C76.68,27.82,63.5,14.64,47.24,14.64L47.24,14.64z"/>
            <path class="st0" d="M41.27,51.9h5.7V40.37h-5.11v-2.36h7.66V51.9h5.31v2.36H41.27V51.9z M45.92,33.16c0-0.63,0.22-1.17,0.67-1.62 c0.45-0.45,0.99-0.67,1.62-0.67c0.63,0,1.17,0.22,1.62,0.67c0.45,0.45,0.67,0.99,0.67,1.62c0,0.63-0.22,1.17-0.67,1.62 c-0.45,0.45-0.99,0.67-1.62,0.67c-0.63,0-1.17-0.22-1.62-0.67C46.14,34.34,45.92,33.8,45.92,33.16z"/>
          </svg>
        </button>
      </div>
    </portal>
    <portal to="navigation">
      <navigation
        :class="[!modelsLoaded && 'loading', intro && 'intro', ballHovered, ]"
        :cameraHandler="(slide) => cameraHandler(slide)"
        :sounds="{
          hover: data.nav_hover_sound, 
          hoverVolume: data.nav_hover_sound_volume,
          click: data.nav_click_sound,
          clickVolume: data.nav_click_sound_volume,
        }"
      />
    </portal>
    <portal v-if="info" to="info">
      <viewport-wrapper :zIndex="12000">
        <info-panel :copy="data.info_panel_copy"/>
      </viewport-wrapper>
    </portal>
    <portal v-if="intro" to="intro">
      <viewport-wrapper :zIndex="10">
        <intro
          :video="data.intro_video"
          :copy="data.intro_copy"
        >
          <button 
            :class="['button-wrapper bezier-300', modelsLoaded ? 'loaded' : 'loading']"
            @click="enterHandler"
          >
            <span class="loading-text sm-size font-a bezier-300">LOADING</span>
            <span class="launch-text sm-size font-a bezier-300">LAUNCH</span>
          </button>
        </intro>
      </viewport-wrapper>
    </portal>
    <portal v-if="modal" to="modal">
      <scene-modal 
        :sceneData="{
          currentChat: currentChat,
          sense: sense,
          video: video
        }"
        :closeHandler="(scene) => closeHandler(scene)"
      />
    </portal>
    <section 
      id="three-world" 
      :class="['bezier-300', modelsLoaded ? 'visible' : 'loading']"
      ref="threeWorld"
    />
  </viewport-wrapper>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'

import { 
  startWorld, 
  clearWorld,
  cameraHandler,
  enterWorld,
  closeFunction
} from './../createThree'

import { Howl } from 'howler'

import Navigation from '@/components/Navigation'
import Intro from '@/components/Intro'
import InfoPanel from '@/components/InfoPanel'
import SceneModal from '@/components/SceneModal'

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
    InfoPanel,
    SceneModal
  },
  data() {
    return {
      currentSlide: 1,
      worldWrapper: null,
      sense: 'touch',
      modal: false,
      video: false,
      modalTimeout: null,
      modelsLoaded: false,
      currentChat: null,
      bgSound: null,
      flythroughSound: null,
      intro: true,
      hoverSound: null,
      clickSound: null,
      ballHovered: false,
      sceneSound: null,
      sceneSoundAudio: false,
      sceneVolume: 0,
      introSound: null
    }
  },
  computed: {
    ...mapState({
      info: 'info',
      muted: 'muted'
    })
  },
  watch: {
    muted: 'muteHandler'
  },
  mounted() {
    // SOUND
    this.introSound = new Howl({
      src: [this.data.intro_page_audio],
      autoplay: false,
      loop: true,
      volume: parseFloat(this.data.intro_page_audio_volume)
    })
    this.bgSound = new Howl({
      src: [this.data.landing_page_audio],
      autoplay: false,
      loop: true,
      volume: parseFloat(this.data.landing_page_audio_volume)
    })
    this.flythroughSound = new Howl({
      src: [this.data.flythrough_sound],
      autoplay: false,
      loop: true,
      volume: parseFloat(this.data.flythrough_sound_volume)
    })
    this.hoverSound = new Howl({
      src: [this.data.planetary_hover_sound],
      autoplay: false,
      loop: false,
      volume: parseFloat(this.data.planetary_hover_sound_volume)
    })
    this.clickSound = new Howl({
      src: [this.data.planetary_click_sound],
      autoplay: false,
      loop: false,
      volume: parseFloat(this.data.planetary_click_sound_volume)
    })
    // STARTUP
    this.worldWrapper = this.$refs.threeWorld
    this.video = this.data.video_1
    this.currentChat = this.data.scene_1_chat
    this.$nextTick(() => {
      this.introSound.play()
      setTimeout(() => {
        startWorld({
          container: this.worldWrapper,
          data: this.data,
          onLoad: () => {this.loadedHandler()},
          mouseOverFunction: (name) => {this.mouseOverHandler(name)},
          mouseOutFunction: (name) => {this.mouseOutHandler(name)},
          ballFunction: (name, index) => this.clickHandler(name, index),
          loadedCallback: (arg) => {this.modelLoadedHandler(arg)},
          animationStart: (arg) => this.animatingStart(arg), 
          animationDone: (arg) => this.animatingEnd(arg),
        })
      }, 50)
    })
  },
  beforeDestroy() {
    clearWorld()
    this.bgSound.stop()
    this.flythroughSound.stop()
    clearTimeout(this.modalTimeout)
  },
  methods: {
    ...mapMutations({
      setPopup: 'setPopup',
      ballLoaded: 'ballLoaded',
      setScene: 'setScene',
      setAnimating: 'setAnimating',
      toggleMuted: 'toggleMuted',
      setInfoPopup: 'setInfoPopup'
    }),
    muteHandler() {
      console.log('muteState', this.muted)
      this.introSound.mute(this.muted)
      this.bgSound.mute(this.muted)
      this.flythroughSound.mute(this.muted)
      this.hoverSound.mute(this.muted)
      this.clickSound.mute(this.muted)
      if (this.sceneSound !== null) {
        this.sceneSound.mute(this.muted)
      }
    },
    infoHandler(bool) {
      this.setInfoPopup(bool)
    },
    animatingStart(arg) {
      this.setAnimating(true)
      console.log('animating-start::', arg)
    },
    animatingEnd(arg) {
      this.setAnimating(false)
      console.log('animating-end::', arg)
      if (arg === 'intro-end') {
        this.bgSound.play()
        this.bgSound.fade(0, parseFloat(this.data.landing_page_audio_volume), 3500)
        this.flythroughSound.fade(parseFloat(this.data.flythrough_sound_volume), 0, 3500)
        setTimeout(() => {this.flythroughSound.stop()}, 4000)
      }
    },
    modelLoadedHandler(ball) {
      this.ballLoaded(ball)
    },
    enterHandler() {
      this.intro = false
      this.introSound.fade(parseFloat(this.data.intro_page_audio_volume), 0, 5000)
      this.flythroughSound.play()
      setTimeout(() => {this.introSound.stop()}, 6000)
      enterWorld()
    },
    cameraHandler(slide) {
      cameraHandler(slide)
      clearTimeout(this.modalTimeout)
    },
    closeHandler(scene) {
      this.modal = false
      closeFunction(scene)
      this.setPopup(false)
      this.setScene('center')
      if(this.sceneSound !== null) {
        this.sceneSound.fade(this.sceneVolume, 0, 2500)
      }
      this.bgSound.fade(0, parseFloat(this.data.landing_page_audio_volume), 2500)
    },
    loadedHandler() {
      this.modelsLoaded = true
      this.loadImages(() => console.log('images loaded'))
    },
    loadImages(callback) {
      let imageArray = []

      const chats = [
        this.data.scene_1_chat, 
        this.data.scene_2_chat,
        this.data.scene_3_chat,
        this.data.scene_4_chat,
        this.data.scene_5_chat,
        this.data.scene_6_chat
      ]
      
      chats.forEach(chat => {
        if (chat) {
          chat.forEach(item => {
            if (item.acf_fc_layout === 'image') {
              imageArray.push(item.image)
            }
          });
        }
      });
      
      this.$preloadAll(imageArray)
        .then(images => callback(images))
        .catch(err => callback(err))
    },
    modalPop() {
      this.setPopup(true)
      this.modalTimeout = setTimeout(() => {
        this.modal = true
      }, 7000)
    },
    mouseOverHandler(name) {
      this.hoverSound.play()
      this.ballHovered = name
    },
    mouseOutHandler(name) {
      this.ballHovered = false
    },
    clickHandler(name, index) {
      const scene = index + 1
      this.sense = name
      this.modalPop()
      this.clickSound.play()
      this.currentSlide = scene
      if(this.sceneSound !== null) {
        this.sceneSound.stop()
      }
      switch (scene) {
        case 1:
          this.video = this.data.video_1
          this.currentChat = this.data.scene_1_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_1
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_1)
          break;
        case 2:
          this.video = this.data.video_2
          this.currentChat = this.data.scene_2_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_2
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_2)
          break;
        case 3:
          this.video = this.data.video_3
          this.currentChat = this.data.scene_3_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_3
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_3)
          break;
        case 4:
          this.video = this.data.video_4
          this.currentChat = this.data.scene_4_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_4
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_4)
          break;
        case 5:
          this.video = this.data.video_5
          this.currentChat = this.data.scene_5_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_5
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_5)
          break;
        case 6:
          this.video = this.data.video_6
          this.currentChat = this.data.scene_6_chat
          this.sceneSoundAudio = this.data.planetary_ball_scene.ball_6
          this.sceneVolume = parseFloat(this.data.planetary_ball_scene.ball_volume_6)
          break;
        default:
          console.log(`SCENE INDEx ${index}.`);
      }
      this.sceneSound = new Howl({
        src: [this.sceneSoundAudio],
        autoplay: false,
        loop: true,
        volume: this.sceneVolume
      })
      this.bgSound.fade(parseFloat(this.data.landing_page_audio_volume), 0, 2500)
      // this.bgSound.stop()
      this.$nextTick(() => {
        this.sceneSound.play()
        this.sceneSound.fade(0, this.sceneVolume, 2500)
      })
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
  .controls-wrapper {
    height: 100vh;
    width: 0;
    position: fixed;
    overflow: visible;
    top: 0;
    right: 0;
    z-index: 12000;
  }
  .circle-button {
    width: 6rem;
    height: 6rem;
    position: fixed;
    z-index: 12000;
    padding: 0;
    svg,
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      * {
        fill: white;
      }
      .st1 {
        stroke: white;
      }
    }
    &.mute-button {
      top: 1.25rem;
      right: 1.25rem;
    }
    &.info-button {
      bottom: 1.25rem;
      right: 1.25rem;
    }
  }
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
    overflow: hidden;
  }
  #three-world.loading {
    pointer-events: none;
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
  #enter-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
  }
  // LOADING
  .button-wrapper {
    position: fixed;
    z-index: 10000;
    left: var(--nav-left);
    bottom: 5vmin;
    height: var(--nav-wrapper);
    width: var(--nav-wrapper);
    border-radius: 50rem;
    span {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.5rem;
      height: 1.65rem;
      line-height: 1;
      top: 0;
      bottom: 0;
      color: var(--nav-green);
    }
    &.loading {
      pointer-events: none;
      animation: pulseAlpha 1s infinite;
      .loading-text {
        opacity: 1;
      }
      .launch-text {
        opacity: 0;
      }
    }
    &.loaded {
      background-color: var(--nav-bg-blue);
      .loading-text {
        opacity: 0;
      }
      .launch-text {
        opacity: 1;
        &:after {
          content: '';
          width: 100%;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          bottom: -3px;
          border-bottom: 1px solid var(--nav-green);
        }
      }
    }
  }
</style>
