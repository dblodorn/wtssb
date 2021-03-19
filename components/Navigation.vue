<template>
  <menu id="nav-container" class="flex-row pad-single">
    <button 
      v-for="item in slides" 
      :key="`slide-button-${item}`"
      class="lozenge-button small"
      @click="cameraHandler(item)"
    >
      <span>Ball {{item}}</span>
    </button>
  </menu>
</template>

<script>
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
      slides: [1,2,3,4,5,6]
    }
  }
}
</script>

<style lang="css">
  #nav-container {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 12000;
    width: 100%;
    justify-content: space-between;
  }
</style>