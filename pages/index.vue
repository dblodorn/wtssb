<template>
  <viewport-wrapper :zIndex="1">
    <intro v-if="!modelsLoaded"/>
    <portal v-if="modal" to="modal">
      <viewport-wrapper :zIndex="10000">
        <div class="modal-inner pad-single">
          <button @click="() => {
            modal = false
            cameraHandler(currentSlide)
            setPopup(false)
          }" class="lozenge-button small close-button">
            <span>CLOSE</span>
          </button>
          <h1 v-html="sense"/>
        </div>
      </viewport-wrapper>
    </portal>
    <navigation
      v-if="modelsLoaded"
      :cameraHandler="(slide) => cameraHandler(slide)"
    />
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
    Intro
  },
  data() {
    return {
      currentSlide: 1,
      worldWrapper: null,
      sense: null,
      modal: false,
      modalTimeout: null,
      modelsLoaded: false
    }
  },
  mounted() {
    this.worldWrapper = this.$refs.threeWorld
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
    },
    ball2Handler() {
      this.sense = 'synesthesia'
      this.modalPop()
      this.currentSlide = 2
    },
    ball3Handler() {
      this.sense = 'sight'
      this.modalPop()
      this.currentSlide = 3
    },
    ball4Handler() {
      this.sense = 'hearing'
      this.modalPop()
      this.currentSlide = 4
    },
    ball5Handler() {
      this.sense = 'smell'
      this.modalPop()
      this.currentSlide = 5
    },
    ball6Handler() {
      this.sense = 'taste'
      this.modalPop()
      this.currentSlide = 6
    }
  },
  head () {
    return {
      title: `${process.env.APP_TITLE}`
    }
  }
}
</script>

<style lang="css">
  .close-button {
    position: fixed;
    top: var(--pad-single);
    right: var(--pad-single);
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
