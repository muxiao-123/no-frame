// 手动分片
// const page = Math.ceil(50000 / 1000)
// const render = (index) => {
//   if (index >= page) {
//     return
//   }
//   const scrollDom = document.querySelector('.box-scroll')
//   const divDom = document.createElement('div')
//   divDom.classList.add('box-scroll-item')
//   for (let i = 1; i <= 1000; i++) {
//     divDom.textContent = `item${i + index * 1000}`
//     scrollDom.appendChild(divDom.cloneNode(true))
//   }
//   requestAnimationFrame(() => {
//     render(index + 1)
//   })
// }
// render(0)

// 自动分片
const scrollEle = document.querySelector('.box-scroll')
const add = (index) => {
  const div = document.createElement('div')
  div.innerText = `item${index}`
  scrollEle.appendChild(div)
}
const timeSlice = (genFn) => {
  if (typeof genFn !== 'function') {
    throw new TypeError(`the params expect is  a generator function`)
  }
  const g = genFn()
  if (!g || typeof g.next !== 'function') {
    return
  }
  const next = () => {
    const start = performance.now()
    let res = null
    do {
      res = g.next()
    } while (res.done !== true && performance.now() - start < 25)
    if (res.done) {
      return
    }
    window.requestAnimationFrame(next)
  }
  // eslint-disable-next-line consistent-return
  return next
}
const gen = function* gen() {
  let i = 0
  while (i < 100000) {
    yield add(i)
    i++
  }
}
const beginRender = () => {
  timeSlice(gen)()
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('op')
  // render(0)
  beginRender()
})
