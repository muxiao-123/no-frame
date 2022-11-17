/** @type {HTMLDivElement} */
const ele = document.querySelector('.box-inner')
let start
let preTimeStamp
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp
  }
  const elapsed = timestamp - start

  if (preTimeStamp !== timestamp) {
    const count = Math.min(0.1 * elapsed, 200)
    ele.style.transform = `translateX(${count}px)`
    if (count === 200) {
      done = true
    }
  }
  if (elapsed < 2000) {
    preTimeStamp = timestamp
    if (!done) {
      requestAnimationFrame(step)
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(step)
})
