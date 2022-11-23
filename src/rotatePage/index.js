// 通过两个绝对定位视图互换位置，实现上下页切换
document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLDivElement}* */
  const rightA = document.querySelector('.box')
  const btns = document.querySelectorAll('.btn')
  let [pre, cur] = [0, 1]
  let currentType = 'next'
  Object.keys(btns).forEach((key) => {
    // btns[key].addEventListener
    btns[key].addEventListener('click', function (e) {
      const { target } = e
      const fd = target.getAttribute('data-type')
      const right = document.querySelectorAll('.right')
      if (fd === 'pre') {
        // 上一页，动画，目标 上一页，结果上一页
        currentType = 'pre'
        right[pre].classList.add('rotate-in')
      } else {
        // 下一页 动画，目标 当前页，结果上一页
        currentType = 'next'
        right[cur].classList.add('rotate-out')
      }
      e.stopPropagation()
    })
  })
  rightA.onanimationend = function () {
    // eslint-disable-next-line no-unused-expressions
    const target = document.querySelectorAll('.right')
    if (currentType === 'next') {
      // 下一页 动画，目标 当前页，结果上一页
      // 下一页 移除当前页z-index 移除动画 设置上一页为当前页 即z-index 增加current-class
      target[cur].classList.remove('rotate-out')
      target[cur].classList.remove('current-class')
      target[pre].classList.add('current-class')
    } else {
      // 上一页，动画，目标 上一页，结果上一页

      // 上一页 移除上一页动画(这里动画要注意z-index设置比current-class大) 上一页为高层
      // 设置上一页一页为 当前页 即z-index 增加current-class
      target[pre].classList.remove('rotate-in')
      target[cur].classList.remove('current-class')
      target[pre].classList.add('current-class')
    }
    // 交换下标，上下页互换
    ;[pre, cur] = [cur, pre]
    requestAnimationFrame(() => {
      target[pre].innerText = 'pr我是上一页'
      target[cur].innerText = '我是当前一页'
    })
  }
})
