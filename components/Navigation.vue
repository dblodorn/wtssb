<template>
  <menu id="nav-container" :class="[popup && 'hide', 'bezier-300']">
    <button 
      v-for="(item, index) in scenes" 
      :key="`slide-button-${index}`"
      :class="['nav-button', item.loaded ? 'loaded' : 'ball-loading', scene === (index + 1) && 'active']"
      @click="navHandler(index)"
      @mouseenter="hoverHandler"
    >
      <span class="bezier-300">{{item.title}}</span>
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
      volume: 0.35
    })
    this.clickSound = new Howl({
      src: [this.sounds.click],
      autoplay: false,
      loop: false,
      volume: 0.35
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
      if(this.bgSound !== null) {
        this.bgSound.stop()
      }
      let sound;
      switch (index) {
        case 0:
          this.setScene(1)
          sound = this.sounds.scenes.ball_1
          break;
        case 1:
          this.setScene(2)
          sound = this.sounds.scenes.ball_2
          break;
        case 2:
          this.setScene(3)
          sound = this.sounds.scenes.ball_3
          break;
        case 3:
          this.setScene(4)
          sound = this.sounds.scenes.ball_4
          break;
        case 4:
          this.setScene(5)
          sound = this.sounds.scenes.ball_5
          break;
        case 5:
          this.setScene(6)
          sound = this.sounds.scenes.ball_6
          break;
        default:
          console.log(`SCENE INDEx ${index}.`);
      }
      console.log(this.sounds)
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
    --nav-wrapper: 12rem;
    --nav-dot: 2.5rem; 
    --nav-border: 2px solid white;
    --nav-left: 6rem;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to { 
      transform: rotate(360deg);
    }
  }
  @keyframes pulseOpacity {
    from {
      opacity: 0;
    }
    to { 
      opacity: .5;
    }
  }
  #nav-container {
    position: fixed;
    top: 6rem;
    left: var(--nav-left);
    z-index: 12000;
    width: var(--nav-wrapper);
    height: var(--nav-wrapper);
    &.hide {
      opacity: 1;
    }
    &.loading {
      animation: spin 2000ms infinite;
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
    border: 1px solid blue;
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
      top:  2rem;
      left: var(--nav-left);
      color: white;
      font-family: var(--font-a);
      font-size: 1.5rem;
      padding-left: .5rem;
    }
    &.ball-loading {
      span { display: none; }
      animation: pulseOpacity 1000ms infinite;
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