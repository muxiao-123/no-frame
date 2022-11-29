// const dragFn = function(ev) {
//   ev.datatra
// }

// wrapper.addEventListener('mouseleave', function () {
//   this.style.animationPlayState = 'paused'
// })
const dropHandle = function (ev) {
  ev.preventDefault()
  // eslint-disable-next-line no-param-reassign
  const data = ev.dataTransfer.getData('text/plain')
  ev.target.appendChild(document.getElementById(data))
}
const dragoverHandle = function (ev) {
  ev.preventDefault()
  // eslint-disable-next-line no-param-reassign
  ev.dataTransfer.dropEffect = 'copy'
}
window.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.wrapper')
  /** @type {HTMLDivElement} */
  const droppable = document.querySelector('.droppable')
  const main = document.querySelector('.main')
  wrapper.addEventListener('dragstart', function (ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id)
  })
  droppable.addEventListener('drop', dropHandle)
  droppable.addEventListener('dragover', dragoverHandle)
  main.addEventListener('drop', dropHandle)
  main.addEventListener('dragover', dragoverHandle)
})
