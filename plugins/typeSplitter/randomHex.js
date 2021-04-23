import randomColor from './randomColor'

export default (context, inject) => {
  const randomHex = () =>
    randomColor()
  inject('randomHex', randomHex)
  context.$randomHex = randomHex
}