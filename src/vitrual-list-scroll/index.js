/* eslint-disable no-unused-vars */
let bottom
// 使用intersection 实现懒加载 观察最后一个元素，动态修改观察对象
function intersectionCallback(entries) {
  console.log(entries[0].isIntersecting)
  if (entries[0].isIntersecting) {
    // eslint-disable-next-line no-use-before-define
    render('intersection')
  }
}
const intersectionObserver = new IntersectionObserver(intersectionCallback)

// eslint-disable-next-line no-unused-vars
const removeAllChild = () => {
  console.log('remove')
  const parent = document.querySelector('.box')
  if (!parent.hasChildNodes()) {
    return
  }
  const { childNodes } = parent
  for (let i = childNodes.length - 1; i >= 0; i--) {
    parent.removeChild(childNodes[i])
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
// 通过scrollTop + offsetHeight（子项的父项） = scrollHeight 判断滚动底部，实现懒加载
const scrollHandle = function (e) {
  // const scrollEle = document.querySelector('.box')
  // const info = scrollEle.getBoundingClientRect()
  const { scrollTop, offsetHeight, scrollHeight } = e.target
  // (scrollHeight = scrollTop + offsetHeight
  if (scrollHeight - (scrollTop + offsetHeight) < 20) {
    // eslint-disable-next-line no-use-before-define
    render()
  }
}
// 使用getBoundingRect 判断
const scrollHandleA = function (e) {
  // const { target } = e
  /** @type {HTMLDivElement} * */
  // eslint-disable-next-line prefer-destructuring
  const childNodes = e.target.childNodes
  const { offsetHeight } = e.target
  const bottomDivRect =
    childNodes[childNodes.length - 1].getBoundingClientRect()
  const parentRect = e.target.getBoundingClientRect()
  if (!bottomDivRect) {
    return
  }
  if (bottomDivRect.bottom - parentRect.top === offsetHeight) {
    // eslint-disable-next-line no-use-before-define
    render()
  }
  // const { scrollTop, offsetHeight, scrollHeight } = e.target
}

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-use-before-define
  scrollRender()
  // intersectionRender()
  // intersectionObserver.observe(document.querySelector('.active'))
})

function render(type = 'scroll') {
  // const scrollEle = document.querySelector('.box')
  if (bottom && type !== 'scroll') {
    intersectionObserver.unobserve(bottom)
    bottom = null
  }
  const scrollEle = document.getElementsByClassName('box')[0]
  const { childNodes } = scrollEle
  if (childNodes.length > 200) {
    // eslint-disable-next-line no-unused-expressions
    type !== 'scroll' && (bottom = null)
    return
  }
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div')
    div.classList.add('box-inner')
    if (i === 5) {
      div.classList.add('active')
    }
    div.innerText = `item: ${Math.round(Math.random() * 10)}`
    scrollEle.appendChild(div)
  }
  if (type !== 'scroll') {
    bottom = scrollEle.childNodes.item(scrollEle.childNodes.length - 1)
    intersectionObserver.observe(bottom)
  }
}
// scroll 渲染
function scrollRender() {
  render()
  document
    .querySelector('.box')
    .addEventListener('scroll', debounce(scrollHandleA, 200))
}
// intersection 渲染
function intersectionRender() {
  render('intersection')
}
