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
const render = () => {
  console.log('render')
  const scrollEle = document.querySelector('.box')
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div')
    div.classList.add('box-inner')
    if (i === 5) {
      div.classList.add('active')
    }
    div.innerText = `item: ${Math.round(Math.random() * 10)}`
    scrollEle.appendChild(div)
  }
}
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
const scrollHandle = function (e) {
  // const scrollEle = document.querySelector('.box')
  // const info = scrollEle.getBoundingClientRect()
  const { scrollTop, offsetHeight, scrollHeight } = e.target
  console.log(`scrollTop: ${scrollTop}`)
  console.log(`offsetHeight: ${offsetHeight}`)
  console.log(`scrollHeight: ${scrollHeight}`)
  if (scrollTop + offsetHeight === scrollHeight) {
    // 再加这个虚拟更新
    // removeAllChild()
    // 只加这个 懒加载处理
    render()
  }
  // console.log('scrollhandle')
}
document.addEventListener('DOMContentLoaded', () => {
  const scrollEle = document.querySelector('.box')
  render()
  scrollEle.addEventListener('scroll', debounce(scrollHandle, 500))
  // const intersectionObserver = new IntersectionObserver((entries) => {
  //   console.log(entries[0].isIntersecting)
  // })
  // intersectionObserver.observe(document.querySelector('.active'))
})
