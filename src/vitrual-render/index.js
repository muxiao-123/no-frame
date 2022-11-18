let start = 0
let data
let end
let elasped
const height = 50
const mockData = () => {
  const result = []
  let i = 0
  while (i < 1000) {
    result.push(i)
    i++
  }
  return result
}
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // console.log(entries)
    entries.forEach((v) => {
      if (v.isIntersecting && v.target.getAttribute('data-id') === 'bottom') {
        const dataLength = data.length
        const maxStartIndex = dataLength - 1 - elasped
        const maxEndIndex = dataLength - 1
        start = end - 10 < maxStartIndex ? end - 10 : maxStartIndex
        end = end + 8 < maxEndIndex ? end + 8 : maxEndIndex
        // eslint-disable-next-line no-use-before-define
        render()
      }
      if (v.isIntersecting && v.target.getAttribute('data-id') === 'top') {
        // console.log('top observe')
        if (start === 0) {
          return
        }
        console.log('top top')
        let [newStart, newEnd] = [start, end]

        if (start - 6 > 0) {
          newStart -= 6
        } else {
          // eslint-disable-next-line no-unused-vars
          newStart = 0
        }
        // eslint-disable-next-line no-unused-vars
        newEnd = end - 6 < elasped ? elasped : end - 6
        // console.log(newStart, newEnd)
        if (newStart !== start) {
          ;[start, end] = [newStart, newEnd]
          // eslint-disable-next-line no-use-before-define
          render()
        }
      }
    })
  },
  {
    root: document.querySelector('.box'),
    threshold: 1.0
  }
)
// eslint-disable-next-line no-shadow
function render() {
  const boxEle = document.querySelector('.box')
  const list = data.slice(start, end)
  const fragment = document.createDocumentFragment()
  if (boxEle.hasChildNodes) {
    intersectionObserver.disconnect()
  }
  list.forEach((v, i) => {
    const div = document.createElement('div')
    div.classList.add('box-inner')
    div.setAttribute('id', `item${v}`)
    div.style.top = `${(i + start) * 50}px`
    div.innerText = `item${v}`
    if (i === 0) {
      div.setAttribute('data-id', 'top')
      intersectionObserver.observe(div)
    } else if (i === list.length - 1) {
      div.setAttribute('data-id', 'bottom')
      intersectionObserver.observe(div)
    }
    fragment.appendChild(div)
  })
  // 显示调用，初始化不会调用回调
  if (boxEle.hasChildNodes) {
    boxEle.innerHTML = ''
  }
  intersectionObserver.takeRecords()
  boxEle.appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box')
  end = start + Math.ceil(box.offsetHeight / height) + 5

  elasped = end
  data = mockData()
  render()
})
