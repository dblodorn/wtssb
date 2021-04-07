<template>
  <menu id="nav-container" :class="[popup && 'hide', 'bezier-300']">
    <button 
      v-for="(item, index) in scenes" 
      :key="`slide-button-${index}`"
      :class="['nav-button', item.loaded ? 'loaded' : 'ball-loading', currentScene === (index + 1) && 'active']"
      @click="navHandler(index)"
      @mouseenter="hoverHandler"
    >
      <span :class="['bezier-300', item.title]">{{item.title}}</span>
    </button>
    <button
      :class="['nav-button center-nav loaded', currentScene === 'center' && 'active']"
      @click="navHandler('center')"
    >
      <span>Center</span>
    </button>
  </menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Howl } from 'howler'

export default {
  name: "Navigation",
  props: {
    cameraHandler: {
      type: Function,
      default: () => {console.log('click')}
    },
    sounds: {
      type: Object
    }
  },
  data() {
    return {
      bgSound: null,
      hoverSound: null,
      clickSound: null,
      // currentScene: 'center',
      opts: {
        autoplay: false,
        loop: true,
        volume: 0.45
      }
    }
  },
  mounted() {
    this.hoverSound = new Howl({
      src: [this.sounds.hover],
      autoplay: false,
      loop: false,
      volume: 0.15
    })
    this.clickSound = new Howl({
      src: [this.sounds.click],
      autoplay: false,
      loop: false,
      volume: 0.15
    })
  },
  methods: {
    ...mapMutations({
      setScene: 'setScene'
    }),
    hoverHandler() {
      this.hoverSound.play()
    },
    navHandler(index) {
      this.cameraHandler(index)
      this.clickSound.play()
      
      let sound;
      switch (index) {
        case 0:
          // this.currentScene = 1
          this.setScene(1)
          break;
        case 1:
          // this.currentScene = 2
          this.setScene(2)
          break;
        case 2:
          // this.currentScene = 3
          this.setScene(3)
          break;
        case 3:
          // this.currentScene = 4
          this.setScene(4)
          break;
        case 4:
          // this.currentScene = 5
          this.setScene(5)
          break;
        case 5:
          // this.currentScene = 6
          this.setScene(6)
          break;
        case 'center':
          // this.currentScene = 'center'
          this.setScene('center')
          break;
        default:
          console.log(`SCENE INDEx ${index}.`);
      }
      this.bgSound = new Howl({
        src: [sound],
        ...this.opts
      })
      this.bgSound.play()
    }
  },
  computed: {
    ...mapState({
      popup: 'popup',
      scenes: 'scenes',
      currentScene: 'currentScene'
    })
  }
}
</script>

<style lang="scss">
  :root {
    --nav-wrapper: 15rem;
    --nav-dot: 3rem; 
    --nav-border: var(--border-weight) solid white;
    --border-weight: 1.5px;
    --nav-fill: rgba(255,255,255,0.5);
    --nav-left: 10vmin;
    --nav-green: #02f500;
    --nav-blue: #0000ff;
    --nav-bg-blue: #00006f;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to { 
      transform: rotate(360deg);
    }
  }
  #nav-container {
    position: fixed;
    bottom: 5vmin;
    left: var(--nav-left);
    z-index: 12000;
    width: var(--nav-wrapper);
    height: var(--nav-wrapper);
    &.hide {
      pointer-events: none;
      opacity: 0;
    }
    &.intro {
      pointer-events: none;
      .center-nav {
        display: none;
      }
    }
    &.loading {
      animation: spin 2000ms infinite;
    }  
  }
  #nav-container:after {
    content: "";
    position: absolute;
    top: calc(var(--border-weight) * -1);
    left: calc(var(--border-weight) * -1);
    width: 100%;
    height: 100%;
    border-radius: 50rem;
    border: var(--border-weight) solid var(--nav-blue);
    z-index: 0;
  }
  .nav-button {
    width: var(--nav-dot);
    height: var(--nav-dot);
    border: var(--nav-border);
    border-radius: calc(var(--nav-dot) / 2);
    position: absolute;
    z-index: 1;
    opacity: 0;
    &.active {
      background: var(--nav-fill);
      pointer-events: none;
    }
    &.center-nav {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      border-style: dashed;
      border-color: var(--nav-green);
      &:hover,
      &.active {
        background-color: var(--nav-green);
        border-style: solid;
      }
    }
    span {
      position: fixed;
      opacity: 0;
      width: var(--nav-wrapper);
      text-align: center;
      bottom:  calc(5vmin + var(--nav-wrapper) + 2rem);
      left: var(--nav-left);
      color: white;
      font-family: var(--font-a);
      font-size: 1.5rem;
      padding-left: .5rem;
    }
    &.ball-loading {
      span { display: none; }
      animation: pulseAlpha 2000ms infinite;
    }
    &.loaded {
      opacity: 1;
    }
  }
  @media (hover:hover) {
    .nav-button:hover {
      background: var(--nav-fill);
    }
    .nav-button:hover span {
      opacity: 1;
    }
  }
  .nav-button:nth-of-type(1) {
    top: calc((var(--nav-dot) / 2.25) * -1);
    left: .5rem;
    right: 0;
    margin: auto;
  }
  .nav-button:nth-of-type(2) {
    top: calc(var(--nav-wrapper) * .2);
    right: calc((var(--nav-dot) / 4) * -1);
  }
  .nav-button:nth-of-type(3) {
    top: calc(var(--nav-wrapper) * .7);
    right: calc((var(--nav-dot) / 6) * -1);
  }
  .nav-button:nth-of-type(4) {
    top: calc(var(--nav-wrapper) - (var(--nav-dot) / 2));
    left: 0;
    right: 0;
    margin: auto;
  }
  .nav-button:nth-of-type(5) {
    top: calc(var(--nav-wrapper) * .7);
    left: 0;
  }
  .nav-button:nth-of-type(6) {
    top: calc(var(--nav-wrapper) * .2);
    left: calc((var(--nav-dot) / 6) * -1);
  }
</style>