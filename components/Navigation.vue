<template>
  <menu id="nav-container" :class="[popup && 'hide', 'bezier-300']">
    <button 
      v-for="(item, index) in nav" 
      :key="`slide-button-${index}`"
      class="nav-button"
      @click="cameraHandler(index + 1)"
    >
      <span class="bezier-300">{{item.title}}</span>
    </button>
  </menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navigation",
  props: {
    cameraHandler: {
      type: Function,
      default: () => {console.log('click')}
    }
  },
  data() {
    return {
      slides: [1,2,3,4,5,6],
      nav: [
        {
          title: 'Touch'
        },{
          title: 'Synesthesia'
        },{
          title: 'Sight'
        },{
          title: 'Hearing'
        },{
          title: 'Smell'
        },{
          title: 'Taste'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      popup: 'popup'
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
  #nav-container {
    position: fixed;
    top: 6rem;
    left: var(--nav-left);
    z-index: 12000;
    width: var(--nav-wrapper);
    height: var(--nav-wrapper);
    &.hide {
      opacity: 0;
      transform: rotate(90deg);
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
  }
  .nav-button span {
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