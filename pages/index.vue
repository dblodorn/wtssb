<template>
  <viewport-wrapper :zIndex="1">
    <portal to="navigation">
      <navigation
        :class="[!modelsLoaded && 'loading', intro && 'intro', ballHovered]"
        :cameraHandler="(slide) => cameraHandler(slide)"
        :sounds="{scenes: data.planetary_ball_scene, hover: data.nav_hover_sound, click: data.nav_click_sound}"
      />
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
            <span class="loading-text sm-size font-b bezier-300 white">LOADING</span>
            <span class="launch-text sm-size font-b bezier-300 white">LAUNCH</span>
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
        :closeHandler="closeHandler"
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
import { mapMutations } from 'vuex'

import { 
  startWorld, 
  clearWorld,
  cameraHandler
} from './../createThree'

import { Howl } from 'howler'

import Navigation from '@/components/Navigation'
import Intro from '@/components/Intro'
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
      sceneSound: null,
      intro: true,
      hoverSound: null,
      clickSound: null,
      ballHovered: false,
      opts: {
        autoplay: false,
        loop: true,
        volume: 0.05
      }
    }
  },
  mounted() {
    // SOUND
    this.bgSound = new Howl({
      src: [this.data.landing_page_audio],
      ...this.opts
    })
    this.hoverSound = new Howl({
      src: [this.data.planetary_hover_sound],
      autoplay: false,
      loop: false,
      volume: 0.1
    })
    this.clickSound = new Howl({
      src: [this.data.planetary_click_sound],
      autoplay: false,
      loop: false,
      volume: 0.35
    })
    // STARTUP
    this.worldWrapper = this.$refs.threeWorld
    this.video = this.data.video_1
    this.currentChat = this.data.scene_1_chat
    this.$nextTick(() => {
      setTimeout(() => {
        startWorld({
          container: this.worldWrapper,
          data: this.data,
          onLoad: () => {this.loadedHandler()},
          mouseOverFunction: (name) => {this.mouseOverHandler(name)},
          mouseOutFunction: (name) => {this.mouseOutHandler(name)},
          ballFunction: (name, index) => this.clickHandler(name, index),
          loadedCallback: (arg) => {this.modelLoadedHandler(arg)}
        })
      }, 50)
    })
  },
  beforeDestroy() {
    clearWorld()
    this.bgSound.stop()
    clearTimeout(this.modalTimeout)
  },
  methods: {
    ...mapMutations({
      setPopup: 'setPopup',
      ballLoaded: 'ballLoaded',
      setScene: 'setScene'
    }),
    modelLoadedHandler(ball) {
      this.ballLoaded(ball)
    },
    enterHandler() {
      this.intro = false
      this.bgSound.play()
    },
    cameraHandler(slide) {
      cameraHandler(slide)
      clearTimeout(this.modalTimeout)
    },
    closeHandler() {
      this.modal = false
      this.setPopup(false)
      this.setScene(false)
      this.sceneSound.stop()
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
    mouseOverHandler(name) {
      console.log(`${name} Over Handler`)
      this.hoverSound.play()
      this.ballHovered = name
    },
    mouseOutHandler(name) {
      console.log(`${name} Out Handler`)
      this.ballHovered = false
    },
    clickHandler(name, index) {
      console.log(name, index)
      const scene = index + 1
      this.sense = name
      this.modalPop()
      this.clickSound.play()
      this.currentSlide = scene
      let sound;
      if(this.sceneSound !== null) {
        this.sceneSound.stop()
      }
      switch (scene) {
        case 1:
          this.video = this.data.video_1
          this.currentChat = this.data.scene_1_chat
          sound = this.data.planetary_ball_scene.ball_1
          break;
        case 2:
          this.video = this.data.video_2
          this.currentChat = this.data.scene_2_chat
          sound = this.data.planetary_ball_scene.ball_2
          break;
        case 3:
          this.video = this.data.video_3
          this.currentChat = this.data.scene_3_chat
          sound = this.data.planetary_ball_scene.ball_3
          break;
        case 4:
          this.video = this.data.video_4
          this.currentChat = this.data.scene_4_chat
          sound = this.data.planetary_ball_scene.ball_4
          break;
        case 5:
          this.video = this.data.video_5
          this.currentChat = this.data.scene_5_chat
          sound = this.data.planetary_ball_scene.ball_5
          break;
        case 6:
          this.video = this.data.video_6
          this.currentChat = this.data.scene_6_chat
          sound = this.data.planetary_ball_scene.ball_6
          break;
        default:
          console.log(`SCENE INDEx ${index}.`);
      }
      this.sceneSound = new Howl({
        src: [sound],
        autoplay: false,
        loop: true,
        volume: 0.25
      })
      this.sceneSound.play()
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
  #three-world.loading {
    pointer-events: none;
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
    left: 10vmin;
    bottom: 5vmin;
    height: var(--nav-wrapper);
    width: var(--nav-wrapper);
    border-radius: calc(var(--nav-wrapper) / 2);
    span {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      height: 1.65rem;
      line-height: 1;
      top: 0;
      bottom: 0;
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
      .loading-text {
        opacity: 0;
      }
      .launch-text {
        opacity: 1;
      }
      &:hover {
        background-color: var(--black);
        span {
          color: var(--white)!important;
        }
      }
    }
  }
</style>
