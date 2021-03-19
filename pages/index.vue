<template>
  <div :class="['scene-wrapper', worldLoaded && 'reveal']">
    <portal v-if="modal" to="modal">
      <viewport-wrapper :zIndex="10000">
        <div class="modal-inner pad-single">
          <button @click="() => {modal = false}" class="lozenge-button small close-button">
            <span>CLOSE</span>
          </button>
          <h1 v-html="sense"/>
        </div>
      </viewport-wrapper>
    </portal>
    <div id="nav-container" class="flex-row pad-single">
      <button @click="prev" id="prev" class="lozenge-button small"><span>Prev</span></button>
      <button @click="next" id="next" class="lozenge-button small"><span>Next</span></button>
    </div>
    <section id="three-world" ref="threeWorld"/>
  </div>
</template>

<script>
import axios from 'axios'
import { 
  startWorld, 
  clearWorld,
  nextHandler,
  prevHandler,
} from './../createThree'

export default {
  layout: 'threelanding',
  asyncData () {
    return axios.get(`${process.env.CMS_URL}`)
      .then((res) => {
        return { data: res.data.options }
      })
  },
  data() {
    return {
      worldWrapper: null,
      worldLoaded: false,
      sense: null,
      modal: false,
    }
  },
  mounted() {
    this.worldWrapper = this.$refs.threeWorld
    this.$nextTick(() => {
      setTimeout(() => {
        this.worldLoaded = true
        startWorld({
          container: this.worldWrapper,
          data: this.data,
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
  },
  methods: {
    prev() {
      prevHandler()
    },
    next() {
      nextHandler()
    },
    ball1Handler() {
      console.log('ball 1 handler vue')
      this.sense = 'touch'
      this.modal = true
    },
    ball2Handler() {
      console.log('ball 2 handler vue')
      this.sense = 'synesthesia'
      this.modal = true
    },
    ball3Handler() {
      console.log('ball 3 handler vue')
      this.sense = 'sight'
      this.modal = true
    },
    ball4Handler() {
      console.log('ball 4 handler vue')
      this.sense = 'hearing'
      this.modal = true
    },
    ball5Handler() {
      console.log('ball 5 handler vue')
      this.sense = 'smell'
      this.modal = true
    },
    ball6Handler() {
      console.log('ball 6 handler vue')
      this.sense = 'taste'
      this.modal = true
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
  .modal-inner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.75);
  }
  .scene-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 500ms ease-in;
    will-change: opacity;
  }
  .scene-wrapper.reveal {
    opacity: 1;
  }
  #three-world {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  #nav-container {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 12000;
    width: 100%;
    justify-content: space-between;
  }
  canvas:focus {
    outline: 0!important;
  }
</style>
