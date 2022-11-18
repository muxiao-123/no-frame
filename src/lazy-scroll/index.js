let start = 0
let count
let data
const mockData = () => {
  const result = []
  let i = 0
  while (i < 1000) {
    result.push(i)
    i++
  }
  return result
}
// eslint-disable-next-line no-shadow
function render() {
  const { scrollTop } = document.querySelector('.box')
  const boxEle = document.querySelector('.content')

  start = Math.floor(scrollTop / 30)
  const list = data.slice(start, start + count)
  const fixedTop = scrollTop - (scrollTop % 30)
  const fragment = document.createDocumentFragment()

  list.forEach((v) => {
    const div = document.createElement('div')
    div.classList.add('box-inner')
    div.setAttribute('id', `item${v}`)
    div.innerText = `item${v}`
    fragment.appendChild(div)
  })
  boxEle.innerHTML = ''
  boxEle.appendChild(fragment)
  requestAnimationFrame(() => {
    boxEle.style.transform = `translateY(${fixedTop || 0}px)`
  })
}
const scrollHandle = function (e) {
  const { scrollTop, offsetHeight, scrollHeight } = e.target

  render()
  if (scrollTop + offsetHeight === scrollHeight) {
    console.log('botom')
  }
}
// scroll 防抖 块 造成延迟动画
// eslint-disable-next-line no-unused-vars
const debounce = (fn, delay) => {
  let timer
  return function (...rest) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...rest)
      timer = null
    }, delay)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box')
  const vitrual = document.querySelector('.vitrual')

  count = Math.ceil(box.offsetHeight / 30)
  data = mockData()
  vitrual.style.height = `${data.length * 30}px`
  render()
  document.querySelector('.box').addEventListener('scroll', scrollHandle)
})
