const over = document.querySelector('.mouseover')
const enter = document.querySelector('.mouseenter')

window.addEventListener('DOMContentLoaded', function () {
  over.addEventListener('mouseover', function () {
    console.log('mouseover')
  })
  enter.addEventListener('mouseenter', function () {
    console.log('mouseenter')
  })
})
