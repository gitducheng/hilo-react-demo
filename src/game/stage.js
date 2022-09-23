import Hilo from 'hilojs'

const initStage = () => {
  let stage = null
  let ticker = null

  let gameWidth = 512
  let gameHeight = 288
  let scaleX = innerWidth / 512
  let scaleY = innerHeight / 288

  stage = new Hilo.Stage({
    renderType: 'canvas',
    width: gameWidth,
    height: gameHeight,
    scaleX: scaleX,
    scaleY: scaleY,
    container: document.createElement('canvas'),
  })

  if (Hilo.event.POINTER_START == 'touchstart') {
    stage.enableDOMEvent('mousedown', true)
    stage.enableDOMEvent('mousemove', true)
    stage.enableDOMEvent('mouseup', true)
  }

  stage.enableDOMEvent(Hilo.event.POINTER_START, true)
  stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true)
  stage.enableDOMEvent(Hilo.event.POINTER_END, true)

  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      stage.scaleX = innerWidth / 512
      stage.scaleY = innerHeight / 288

      stage.resize(gameWidth, gameHeight, true)
    })
  })

  //启动计时器
  ticker = new Hilo.Ticker(60)
  ticker.addTick(Hilo.Tween)
  ticker.addTick(stage)
  ticker.start(true)
  stage.ticker = ticker

  return {
    stage,
    ticker,
  }
}

export default initStage
