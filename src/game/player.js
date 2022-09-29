import Hilo from 'hilojs'
import Bullet from './bullet'
import Enemy from './enemy'

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
    this.bulletPng = null
    this.bulletGroup = []
    this.enemyPng = null
    this.enemyGroup = []
    this._scaleX = 1 // 下划线开头，避免覆盖
    this._scaleY = 1
    this._preShootTime = Date.now()
    this._preGenerateTime = Date.now()
    this.init(properties)
  }

  init(properties) {
    const { stage, x, y, backgroundPos, bulletPng, enemyPng, scaleX, scaleY } =
      properties

    this.bulletPng = bulletPng
    this.enemyPng = enemyPng
    this.stage = stage
    this._scaleX = scaleX / stage.scaleX
    this._scaleY = scaleY / stage.scaleY

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

  tick() {
    const currentTime = Date.now()
    if (currentTime - this._preShootTime > 1000) {
      this.shoot()
      this._preShootTime = currentTime
    }

    if (currentTime - this._preGenerateTime > 2000) {
      this.generate()
      this._preGenerateTime = currentTime
    }

    const _bulletGroup = this.bulletGroup
    const _enemyGroup = this.enemyGroup

    _bulletGroup.forEach((bulletItem) => {
      _enemyGroup.forEach((enemyItem) => {
        // console.log(bulletItem.getBounds()) //hitTestObject
        if (enemyItem.isCollideWith(bulletItem)) {
          enemyItem.removeFromParent()
          bulletItem.removeFromParent()
        }
      })
    })
  }

  shoot() {
    const bullet = new Bullet({
      backgroundPos: this.bulletPng,
      scaleX: this._scaleX,
      scaleY: this._scaleY,
      x: this.player.x,
      y: this.player.y,
      player: this.player,
    })

    const bIndex = this.bulletGroup.length - 1
    const _bulletGroup = this.bulletGroup
    Hilo.Tween.to(
      bullet,
      {
        y: -(this.player.y + 200),
      },
      {
        duration: (innerHeight / 300) * 1000,
        // delay: 100,
        ease: Hilo.Ease.Quad.EaseIn,
        onComplete: function () {
          _bulletGroup.splice(bIndex, 1)
          bullet.removeFromParent()
        },
      }
    )

    this.stage.addChild(bullet)
    this.bulletGroup.push(bullet)
  }

  generate() {
    const enemy = new Enemy({
      backgroundPos: this.enemyPng,
      scaleX: this._scaleX,
      scaleY: this._scaleY,
      x: this.player.x,
      y: this.player.y,
    })

    const eIndex = this.enemyGroup.length - 1
    const _enemyGroup = this.enemyGroup
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
          _enemyGroup.splice(eIndex, 1)
          enemy.removeFromParent()
        },
      }
    )

    this.stage.addChild(enemy)
    this.enemyGroup.push(enemy)
  }
}
