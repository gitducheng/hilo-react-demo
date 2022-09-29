import React, { useEffect } from 'react'
import { AssetFectory } from './game/lib/Asset'
import StageFectory from './game/stage'
import BgFectory from './game/bg'
import PlayerFectory from './game/player'

const App = () => {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const Asset = AssetFectory()
    const assets = new Asset()
    assets.on('load', (e) => {
      // const num =
      //   +(e.target.queue.getLoaded() / e.target.queue.getTotal()).toFixed(2) *
      //   50
    })
    const {
      spsource: { layout },
    } = await assets.load()

    const gameMain = StageFectory()
    document.getElementById('myCanvas').appendChild(gameMain.stage.canvas)
    const { stage, ticker } = gameMain

    const bgScence = new BgFectory({
      backgroundPos: layout['game-bj']['游戏背景.png'],
    })

    const playerScence = new PlayerFectory({
      stage: stage,
      x: (innerWidth - layout['game-hero']['玩家飞机.png'].width / 2) / 2,
      y: innerHeight - layout['game-hero']['玩家飞机.png'].height - 20,
      backgroundPos: layout['game-hero']['玩家飞机.png'],
      bulletPng: layout['game-bullet']['子弹.png'],
      enemyPng: layout['game-enemy']['敌人.png'],
      scaleX: 0.5,
      scaleY: 0.5,
    })

    stage.on(Hilo.event.POINTER_MOVE, (e) => {
      playerScence.move(
        e.x - playerScence.player.width / 2 / 2,
        e.y - playerScence.player.height / 2 / 2
      )
    })
    console.log('app.js')
    stage.addChild(bgScence, playerScence)
    // ticker.addTick(playerScence)
  }

  return (
    <div id='myCanvas'>
      <div style={{ paddingLeft: '50%' }}>1</div>
    </div>
  )
}

export default App
