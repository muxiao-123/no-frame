// eslint-disable-next-line no-unused-vars
// const baseUrl = 'http://192.168.43.217:8888/'
const routerArr = [
  { path: '../time-slice-scroll/', params: '', name: '时间分片' },
  { path: '../lazy-scroll/', params: '', name: '虚拟列表' },
  { path: '../vitrual-list-scroll/', params: '', name: '懒加载' }
]
const generateRouter = (pathArr) => {
  const bodyEle = document.querySelector('.navigate-box')
  pathArr.forEach((v) => {
    const aEle = document.createElement('a')
    aEle.setAttribute('href', v.path)
    aEle.setAttribute('target', '_self')
    aEle.classList.add('navigate')
    aEle.innerText = v.name
    bodyEle.appendChild(aEle)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  generateRouter(routerArr)
})
