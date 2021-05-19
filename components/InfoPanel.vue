<template>
  <section id="info-wrapper" class="inner-page">
    <div v-if="slideshow" class="slideshow">
      <div class="inner">
        <div class="full-width-slider">
          <button class="swiper-close" @click="slidesToggle(false)"/>
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
      </div>
    </div>
    <article>
      <div class="about" v-html="copy"></div>
      <div class="colophon-wrapper">
        <div class="colophon-inner">
          <div class="colophon" v-html="colophon"></div>
          <ul class="buttons">
            <li>
              <button class="lozenge-button" @click="slidesToggle(true)">
                <span>View Artist Edition</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    copy: {
      type: String
    },
    colophon: {
      type: String
    },
    slides: {
      type: Array,
      default: [],
      useDefaultForNull: true
    },
    closeHandler: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      type: null,
      swiper: null,
      slideshow: false,
      swiperOption: {
        navigation: {
          nextEl: '.control-right',
          prevEl: '.control-left'
        },
        autoplay: false,
        speed: 50,
        allowTouchMove: false,
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
      }
    }
  },
  mounted() {},
  methods: {
    slidesToggle(bool) {
      this.slideshow = bool
    }
  }
}
</script>

<style lang="scss">
  .slideshow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.8);
    z-index: 11000;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 90%;
      height: 85%;
      position: relative;
    }
    .swiper-close {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
  #info-wrapper {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: var(--black);
    overflow-y: scroll;
    p {
      color: var(--white)!important;
      font-family: var(--font-a);
      font-weight: 300;
      line-height: 1.3;
    }
    .about * {
      font-size: 2.25vmin;
    }
    .colophon * {
      font-size: 1.85vmin;
    }
    .colophon-inner {
      position: sticky;
      top: 7vmin;
    }
    .about,
    .colophon {
      a {
        text-decoration: underline!important;
        color: var(--chat-orange)!important;
      }
    }
    article {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 140rem;
      padding-top: 7vmin;
      padding-bottom: 11vmin;
      padding-left: 11vmin;
      grid-gap: 7vmin;
    }
    .lozenge-button {
      margin-top: var(--pad-double);
      position: relative;
      display: inline-flex;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .lozenge-button {
    font-family: var(--font-a);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--chat-orange);
    color: var(--white)!important;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    position: relative;
    letter-spacing: 1px;
    font-size: var(--reg-size);
    padding: var(--pad-single) var(--pad-double);
    border-radius: 50rem;
  }
  .lozenge-button.small {
    padding: .5rem var(--pad-micro)!important;
    font-size: var(--micro-size);
  }
  @media (hover: hover) {
    .lozenge-button:hover {
      color: var(--chat-orange)!important;
    }
  }
  // SLIDESHOW
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
      object-fit: contain;
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
    position: fixed;
    margin: auto;
    z-index: 100;
    width: var(--slideshow-button);
    height: var(--slideshow-button);
    top: 0;
    bottom: 0;
    border: 1px solid white;
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
      transform: translateX(-.25rem);
    }
  }
  .control-right {
    right: 2rem;
    svg {
      transform: translateX(-.1rem);
    }
  }
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>