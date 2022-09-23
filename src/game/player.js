import Hilo from 'hilojs'

export default class Player extends Hilo.Container {
  constructor(properties) {
    super()

    // properties中的x,y,scaleX,scaleY会影响，所以重新初始化
    // this.x = 0
    // this.y = 0
    // this.scaleX = 1
    // this.scaleY = 1
    this.player = null
    this.stage = null
    this.init(properties)
  }

  init(properties) {
    const { stage, x, y, backgroundPos, scaleX, scaleY } = properties

    this.stage = stage
    this.player = new Hilo.Bitmap({
      x: x / stage.scaleX,
      y: y / stage.scaleY,
      image: backgroundPos.image,
      rect: backgroundPos.rect,
      scaleX: scaleX / stage.scaleX,
      scaleY: scaleY / stage.scaleY,
    })

    this.player.addTo(this, -1)
  }

  move(x, y) {
    this.player.x = x / this.stage.scaleX
    this.player.y = y / this.stage.scaleY
  }
}
