const init = () => {
  let x = 0
  let y = 0
  let done = false
  let size = 0
  /** @type {HTMLCanvasElement} * */
  const myCanvas = document.getElementById('canvas')
  const rect1 = myCanvas.getBoundingClientRect()
  const dpx = window.devicePixelRatio

  myCanvas.width = rect1.width * dpx
  myCanvas.height = rect1.height * dpx
  // console.log(rect1)
  myCanvas.toBlob((data) => {
    size = data?.size || 0
  })
  const context = myCanvas.getContext('2d')

  context.scale(dpx, dpx)
  context.save()
  context.strokeStyle = 'black'
  context.lineWidth = 1
  const rect = myCanvas.getBoundingClientRect()
  const drawLine = (_ctx, _x, _y, endX, endY) => {
    // todo
    /** @type {CanvasRenderingContext2D}* */
    const ctx = _ctx
    ctx.beginPath()
    ctx.moveTo(_x, _y)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }
  const clearLine = () => {
    context.clearRect(0, 0, rect.width, rect.height)
  }
  const downFn = function (e) {
    // console.log('down')
    x = e.clientX - rect1.left
    y = e.clientY - rect1.top
    done = true
  }
  const moveFn = function (e) {
    // console.log('move')
    if (done === true) {
      drawLine(context, x, y, e.clientX - rect1.left, e.clientY - rect1.top)
      x = e.clientX - rect1.left
      y = e.clientY - rect1.top
    }
  }
  const upFn = function (e) {
    // console.log('up')
    if (done === true) {
      drawLine(context, x, y, e.clientX - rect1.left, e.clientY - rect1.top)
      x = 0
      y = 0
      done = false
    }
  }
  const downFile = function () {
    // const url = myCanvas.toDataURL()
    myCanvas.toBlob((data) => {
      const activeSize = data?.size || 0
      if (activeSize > size && data) {
        console.log('success')
        const a = document.createElement('a')
        a.href = URL.createObjectURL(data)
        a.download = `canvas-${(Math.random() * 10000).toFixed()}`
        a.dispatchEvent(
          new MouseEvent('click', { bubbles: false, cancelable: true })
        )
      } else {
        // eslint-disable-next-line no-alert
        alert('图片是空')
        console.log('fail')
      }
    })
  }
  const addPaintsEvent = function () {
    myCanvas.addEventListener('mousedown', downFn)
    myCanvas.addEventListener('mousemove', moveFn)
    window.addEventListener('mouseup', upFn)
  }
  const addBtnsEvent = function () {
    const btns = document.getElementsByClassName('btn-item')
    Array.from(btns).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value')
        switch (value) {
          case 'clear':
            clearLine()
            break
          case 'save':
            downFile()
            break
          default:
            context.strokeStyle = value
            break
        }
      })
    })
  }

  addPaintsEvent()
  addBtnsEvent()
}
window.addEventListener('DOMContentLoaded', function () {
  init()
})
