import { useEffect, useState } from 'react'

const RESOLUTIONS = {
  _1080p: '1080p',
  _1440p: '1440p',
  _4K: '4K'
}

const DEFAULT_BAR_SIZE = {
  _1080p: 0,
  _1440p: 0,
  _4K: 0
}

export function FPSBar ({ el }) {
  const [size, setSize] = useState(DEFAULT_BAR_SIZE)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const max = el.fps[RESOLUTIONS._1080p]
    setSize({
      [RESOLUTIONS._1080p]: 100,
      [RESOLUTIONS._1440p]: el.fps[RESOLUTIONS._1440p] * 100 / max,
      [RESOLUTIONS._4K]: el.fps[RESOLUTIONS._4K] * 100 / max
    })

    setTimeout(() => setLoaded(true), 200)
  }, [el])
  console.log(loaded, size, `w-[${loaded ? size[RESOLUTIONS._4K] + '%' : 'max-content'}]`)
  return (
    <article className='w-full max-w-md flex flex-col gap-1 mb-4'>
      <p className='font-bold'>{el.name}</p>
      <div className={`fps_bar w-[${loaded ? size[RESOLUTIONS._1080p] + '%' : 'max-content'}] flex gap-2 justify-between p-2 bg-cyan-300 rounded`}>1080: <span>{el.fps['1080p']} FPS</span></div>
      <div className={`fps_bar w-[${loaded ? size[RESOLUTIONS._1440p] + '%' : 'max-content'}] flex gap-2 justify-between p-2 bg-yellow-200 rounded`}>1440: <span>{el.fps['1440p']} FPS</span></div>
      <div className={`fps_bar w-[${loaded ? size[RESOLUTIONS._4K] + '%' : 'max-content'}] flex gap-2 justify-between p-2 bg-red-200 rounded`}>4K: <span>{el.fps['4K']} FPS</span></div>
    </article>
  )
}
