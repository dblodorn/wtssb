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
      currentScene: 0,
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
          this.currentScene = 1
          break;
        case 1:
          this.currentScene = 2
          break;
        case 2:
          this.currentScene = 3
          break;
        case 3:
          this.currentScene = 4
          break;
        case 4:
          this.currentScene = 5
          break;
        case 5:
          this.currentScene = 6
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
      scene: 'scene'
    })
  }
}
</script>

<style lang="scss">
  :root {
    --nav-wrapper: 15rem;
    --nav-dot: 2.75rem; 
    --nav-border: 2px solid white;
    --nav-left: 10vmin;
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
    }
    &.loading {
      animation: spin 2000ms infinite;
    }
    &.Touch .Touch {
      opacity: 1;
    }
    &.Taste .Taste {
      opacity: 1;
    }
    &.Sight .Sight {
      opacity: 1;
    }
    &.Hearing .Hearing {
      opacity: 1;
    }
    &.Smell .Smell {
      opacity: 1;
    }
    &.Synesthesia .Synesthesia {
      opacity: 1;
    }
  }
  #nav-container:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: calc(var(--nav-wrapper) / 2);
    border: 1px solid rgba(255, 255, 255, .8);
    border-style: dashed;
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
      background-color: var(--white);
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
      background: var(--white);
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