import Hilo from 'hilojs'

export const AssetFectory = () => {
  const proxyStr = ''
  return Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,
    rawSource: null,
    spsource: {},
    async load() {
      const mod = (await import('../../assets/data.json')).default
      const spsource = {
        categorys: {
          ...mod.categorys,
        },
        rawUrls: [...mod.rawUrls],
        imageIds: [...mod.imageIds],
      }

      this.rawSource = spsource
      this.queue = new Hilo.LoadQueue()
      this.queue.add([
        ...spsource.imageIds.map((item) => {
          let src = require(`../../assets/images/${item}.png`)

          if (src.indexOf('data:image') === -1) {
            src = proxyStr + src
          }
          return { id: item, type: 'png', src }
        }),
      ])

      this.queue.on('load', this.onProcess.bind(this))
      return await new Promise((re, rj) => {
        this.queue.on('complete', (e) => {
          this.onComplete(e)
          re(this)
        })
        this.queue.on('error', (e) => {
          this.onError(e)
          rj(e)
        })
        this.queue.start()
      })
    },
    onProcess(e) {
      this.fire('load', e)
    },
    onError(e) {
      this.fire('error', e)
    },

    onComplete: function (e) {
      const spsource = this.rawSource
      spsource.rawUrls.forEach((item) => {
        const objpath = item.rawUrl.split('/')
        const name = objpath.pop()
        spsource.categorys[objpath.join('-')].filter(
          (cld) => cld.name === name
        )[0].image = this.queue.get(item.imageName).content
      })
      for (const key in spsource.categorys) {
        if (spsource.categorys.hasOwnProperty(key)) {
          spsource.categorys[key] = spsource.categorys[key].reduce((a, b) => {
            return { ...a, [b.name]: b }
          }, {})
        }
      }
      this.spsource = {
        layout: spsource.categorys,
      }
      this.queue.off('complete')
      this.fire('complete')
    },
  })
}
