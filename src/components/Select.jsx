import { useRef, useState } from 'react'
import { Arrow } from './Icons'
import { useClickOutside } from '../hooks/useClickOutside'

export function Select ({ name, label = 'CPU Brand', obj, updateState, current }) {
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
      <div ref={optionsRef} className='w-[300px] select-button'>
        <p>{label}</p>
        <button
          onClick={() => setOpen(prev => !prev)}
          className='font-medium w-[300px] border border-blue-400 p-2 rounded flex text-orange-600 hover:brightness-110 justify-between'
        >
          {current}
          <Arrow className={`fill-orange-500 transition-transform duration-200 ease-out origin-center ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className={`p-2 shadow-lg rounded overflow-hidden transition duration-200 origin-top ease-out ${!open ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}>
          <ul className='pt-2 max-h-[200px] w-full overflow-y-auto text-xs grid grid-cols-2'>
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
