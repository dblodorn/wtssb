<template>
  <div class="full-width-slider">
    <client-only>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, i) in slides" v-bind:key="('slide-show-' + i)">
          <img :src="item">
        </swiper-slide>
        <div class="control-right" slot="button-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><title>arrow-sm-right</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" fill="var(--white)" stroke="var(--white)"><polyline points="27 20 39 32 27 44" fill="none" stroke="var(--white)" stroke-miterlimit="10"></polyline></g></svg>
        </div>
        <div class="control-left" slot="button-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><title>arrow-sm-left</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" fill="var(--white)" stroke="var(--white)"><polyline points="37 20 25 32 37 44" fill="none" stroke="var(--white)" stroke-miterlimit="10"></polyline></g></svg>
        </div>
      </swiper>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'SlideShow',
  props: {
    slides: {
      type: Array,
      default: [],
      useDefaultForNull: true
    }
  },
  data () {
    return {
      swiper: null,
      swiperOption: {
        navigation: {
          nextEl: '.control-right',
          prevEl: '.control-left'
        },
        autoplay: false,
        speed: 500,
        allowTouchMove: false,
        loop: true,
        effect: 'slide',
        fadeEffect: {
          crossFade: false
        },
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --slideshow-button: 4rem;
}
.full-width-slider {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
}
.swiper-slide {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.swiper-container {
  height: 100%;
}
.control-right,
.control-left {
  position: absolute;
  margin: auto;
  z-index: 100;
  width: var(--slideshow-button);
  height: var(--slideshow-button);
  top: 0;
  bottom: 0;
  background-color: var(--black);
  border-radius: 50rem;
  cursor: pointer;
  svg {
    width: 110%;
    height: 110%;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.control-left {
  left: 2rem;
  svg {
    transform: translateX(-.2rem);
  }
}
.control-right {
  right: 2rem;
}
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>