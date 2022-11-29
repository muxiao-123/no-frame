const wrapper = document.querySelector('.wrapper')
wrapper.addEventListener('mousemove', function () {
  this.style.animationPlayState = 'running'
})
wrapper.addEventListener('mouseleave', function () {
  this.style.animationPlayState = 'paused'
})
