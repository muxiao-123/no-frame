let bottom
// let top
let start = 0
let end = 10
const mockData = (() => {
  const result = []
  let i = 0
  while (i < 1000) {
    result.push(i)
    i++
  }
  return result
})()
const intersectionObserver = new IntersectionObserver((entries) => {
  console.log(entries[0].isIntersecting)
  if (entries[0].isIntersecting) {
    intersectionObserver.unobserve(bottom)
    // eslint-disable-next-line no-use-before-define
    // render(start + 1, end + 1)
  }
})
// eslint-disable-next-line no-shadow
function render(startI = 0, endI = 10) {
  // if (bottom) {
  //   intersectionObserver.unobserve(bottom)
  //   bottom = null
  // }
  const data = mockData.slice(startI, endI)
  console.log(data)
  const boxEle = document.querySelector('.box')
  const fragment = document.createDocumentFragment()
  data.forEach((v) => {
    const div = document.createElement('div')
    div.classList.add('box-inner')
    div.setAttribute('id', `item${v}`)
    div.innerText = `item${v}`
    fragment.appendChild(div)
  })
  boxEle.innerHTML = ''
  boxEle.appendChild(fragment)
  // const { childNodes } = boxEle
  // bottom = childNodes[childNodes.length - 1]
  // intersectionObserver.observe(bottom)
}
const scrollHandle = function (e) {
  console.log(e)
  const { scrollTop, offsetHeight, scrollHeight } = e.target
  if (scrollTop + offsetHeight === scrollHeight) {
    console.log('botom')
    render(++start, ++end)
  }
}
// scroll 防抖 块
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
  render(start, end)
  document
    .querySelector('.box')
    .addEventListener('scroll', debounce(scrollHandle, 200))
})
