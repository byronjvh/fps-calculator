import { useRef, useState } from 'react'
import { Arrow } from './Icons'
import { useClickOutside } from '../hooks/useClickOutside'
import { searchFilter } from '../logic/filterBySimilarity'
import { randomOption } from '../logic/randomOption'

export function SelectSearch ({ name, label = 'CPU', array = [], current, updateState, className }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const optionsRef = useRef()
  const [randomPlaceholder] = useState(() => {
    return randomOption(array)
  })

  const updateOpen = (bol) => {
    setOpen(bol)
  }

  useClickOutside(optionsRef, updateOpen)

  const handleClick = (e, name) => {
    updateState(e, name)
    setOpen(false)
  }

  const filteredArray = searchFilter(value, array)

  return (
    <div ref={optionsRef} className={`flex flex-col w-full relative select-button h-min ${className}`}>
      <p>{label}</p>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='font-medium w-full border border-blue-400 p-2 rounded flex text-orange-600 hover:brightness-110 justify-between'
      >
        {current ?? randomPlaceholder}
        <Arrow className={`fill-orange-500 transition-transform duration-200 ease-out origin-center ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute left-0 top-full w-full z-10 bg-white p-2 shadow-lg rounded overflow-hidden transition duration-200 origin-top ease-out ${!open ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}>
        <input
          placeholder={randomPlaceholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='p-1 text-sm border border-1 w-full border-slate-400 rounded'
          type='text'
          name=''
          id=''
        />
        <ul className='pt-2 max-h-[200px] overflow-y-auto text-xs grid grid-cols-2'>
          {
            filteredArray.map((el, i) => (
              <li key={i}>
                <button onClick={(e) => handleClick(e, name)} className='w-full p-1 hover:bg-slate-200 rounded cursor-pointer text-left'>{el.name}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
