import Hilo from 'hilojs'

export default class Bullet extends Hilo.Container {
  constructor(properties) {
    super()

    this._bullet = null
    this.init(properties)
  }

  init(properties) {
    const { backgroundPos, scaleX, scaleY, x, y } = properties

    const bullet = new Hilo.Bitmap({
      image: backgroundPos.image,
      rect: backgroundPos.rect,
      scaleX: scaleX,
      scaleY: scaleY,
      x: x,
      y: y,
    })

    bullet.addTo(this, -1)
    this._bullet = bullet
  }
}
