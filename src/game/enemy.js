import Hilo from 'hilojs'

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Player extends Hilo.Container {
  constructor(properties) {
    super()

    this.enemy = null
    this._scaleX = 1 // 下划线开头，避免覆盖
    this._scaleY = 1
    this.init(properties)
  }

  init(properties) {
    const { x, y, backgroundPos, scaleX, scaleY } = properties

    this._scaleX = scaleX
    this._scaleY = scaleY

    this.enemy = new Hilo.Bitmap({
      x: rnd(0, innerWidth) * scaleX,
      y: 0,
      image: backgroundPos.image,
      rect: backgroundPos.rect,
      scaleX: scaleX,
      scaleY: scaleY,
    })

    this.enemy.addTo(this, -1)
  }

  isCollideWith(bulletInfo) {
    let bulletX = bulletInfo._bullet.x + bulletInfo._bullet.width / 2
    let bulletY = bulletInfo._bullet.y + bulletInfo._bullet.height / 2
    // console.log(bulletX, bulletY)
    return !!(
      bulletX >= this.enemy.x &&
      bulletX <= this.enemy.x + this.enemy.width &&
      bulletY >= this.enemy.y &&
      bulletY <= this.enemy.y + this.enemy.height
    )
  }
}
