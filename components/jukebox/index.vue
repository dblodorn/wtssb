<template>
  <div class="jukebox-wrapper">
    <audio 
      class="player"
      ref="jukebox"
      :src="currentTrack"
      controls
      @ended="endedHandler"
      @playing="isPlaying"
    >
    </audio>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'

export default {
  name: "Jukebox",
  data() {
    return {
      tracks: [],
      trackCount: 0,
      currentTrack: '/clock/jukebox/mech.mp3',
      trackNo: 0,
      bumper: true,
      player: null,
      playing: false
    }
  },
  mounted() {
    this.trackCount = this.tracks.length
    this.tracks = shuffle(this.tracks)
    this.$nextTick(() => {
      this.player = this.$refs.jukebox
      this.start()
    })
  },
  methods: {
    isPlaying() {
      this.playing = true
    },
    playHandler() {
      if (!this.playing) {
        this.start()
      } else {
        this.pause()
      }
    },
    start() {
      this.player.play()
    },
    pause() {
      this.player.pause()
      this.playing = false
    },
    endedHandler() {
      this.bumper = !this.bumper
      if (this.bumper === false) {
        if (this.trackNo < this.trackCount) {
          this.trackNo = this.trackNo + 1
        } else {
          this.trackNo = 1
        }
        this.currentTrack = this.tracks[this.trackNo - 1]
      } else {
        this.currentTrack = '/clock/jukebox/mech.mp3'
      }
      this.$nextTick(() => {  
        this.player.play()
      })
    }
  }
}
</script>

<style lang="css">
  .jukebox-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 4rem;
    width: 20rem;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem;
  }
  button {
    color: white;
    font-weight: 500;
    margin-left: 2rem;
    font-size: var(--micro-size);
    text-shadow: 0 0 4px rgba(0,0,0,.5);
    font-family: 'Futura', sans-serif;
    letter-spacing: 1px;
  }
  .player {
    display: none;
  }
</style>