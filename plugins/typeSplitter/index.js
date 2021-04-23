import charSplit from './charSplit'

export default (context, inject) => {
  const typeSplitter = (title, element, className, color) =>
    charSplit(title, element, className, color)
  
  inject('typeSplitter', typeSplitter)
  context.$typeSplitter = typeSplitter
}