import Hilo from 'hilojs'

export default class Bg extends Hilo.Container {
  constructor(properties) {
    super(properties)

    this.x = 0
    this.y = 0
    this.scaleX = 1
    this.scaleY = 1
    this.initBg(properties)
  }

  initBg(properties) {
    const { backgroundPos } = properties

    const bg = new Hilo.Bitmap({
      image: backgroundPos.image,
      rect: backgroundPos.rect,
    })

    bg.addTo(this, -1)
  }
}
