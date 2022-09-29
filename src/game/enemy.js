import Hilo from 'hilojs'

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Player extends Hilo.Container {
  constructor(properties) {
    super()

    this.props = properties
    this._preGenerateTime = Date.now()
    this._scaleX = 1 // 下划线开头，避免覆盖
    this._scaleY = 1
    this.init(properties)
  }

  init(properties) {
    const { x, y, backgroundPos, scaleX, scaleY } = properties

    this._scaleX = scaleX
    this._scaleY = scaleY

    const enemy = new Hilo.Bitmap({
      x: rnd(0, innerWidth) * scaleX,
      y: 0,
      image: backgroundPos.image,
      rect: backgroundPos.rect,
      scaleX: scaleX,
      scaleY: scaleY,
    }).addTo(this)

    Hilo.Tween.to(
      enemy,
      {
        y: innerHeight + 200,
      },
      {
        duration: (innerHeight / 100) * 1000,
        // delay: 100,
        ease: Hilo.Ease.Quad.EaseIn,
        onComplete: function () {
          enemy.removeFromParent()
        },
      }
    )
  }

  onUpdate() {
    const currentTime = Date.now()
    if (currentTime - this._preGenerateTime > 1000) {
      this.init(this.props)
      this._preGenerateTime = currentTime
    }
  }
}
