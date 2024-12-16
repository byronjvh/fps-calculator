import { useRef, useState } from 'react'
import { Arrow } from './Icons'
import { useClickOutside } from '../hooks/useClickOutside'

export function Select ({ name, label = 'CPU Brand', obj, updateState, current, className }) {
  const [open, setOpen] = useState(false)
  const optionsRef = useRef()

  const updateOpen = (bol) => {
    setOpen(bol)
  }

  useClickOutside(optionsRef, updateOpen)

  const handleClick = (e, name) => {
    updateState(e, name)
    setOpen(false)
  }

  return (
    <>
      <div ref={optionsRef} className={`flex flex-col w-full select-button h-min relative ${className}`}>
        <p>{label}</p>
        <button
          onClick={() => setOpen(prev => !prev)}
          className='font-medium w-full border border-blue-400 p-2 rounded flex gap-2 text-orange-600 hover:brightness-110 justify-between'
        >
          {current}
          <Arrow className={`fill-orange-500 transition-transform duration-200 ease-out origin-center ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className={`absolute left-0 top-full w-full z-10 bg-white p-2 shadow-lg rounded overflow-hidden transition duration-200 origin-top ease-out ${!open ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}>
          <ul className='pt-2 max-h-[200px] overflow-y-auto text-xs grid grid-cols-2'>
            {
                Object.keys(obj).map((key, i) => (
                  <li key={i}>
                    <button onClick={(e) => handleClick(e, name)} className='p-1 hover:bg-slate-200 rounded cursor-pointer w-full text-left'>
                      {obj[key]}
                    </button>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
