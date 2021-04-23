import randomColor from './randomColor'

export default (title, element, className, color) => {
  // RETURN CLASS
  const htmlElement = element !== undefined ? element : 'span'
  const wrapperClass = className !== undefined ? className : 'split'
  const returnColor = () =>
    color ? `style="color: ${randomColor()}"` : ''
  // TITLE
  const titleArray = title.split('')
  let newTitle = []
  titleArray.forEach(char => {
    newTitle.push(`<${htmlElement} class="${wrapperClass}" ${returnColor()} >${char}</${htmlElement}>`)
  });
  return newTitle.join('')
}
