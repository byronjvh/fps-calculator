import { useRef, useState } from 'react'
import { Arrow } from './Icons'
import { useClickOutside } from '../hooks/useClickOutside'
import { searchFilter } from '../logic/filterBySimilarity'

export function SelectForm ({ label = 'CPU', array = [], current }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const optionsRef = useRef()
  const [randomPlaceholder] = useState(() => {
    return array[Math.floor(Math.random() * (array.length - 1))].name
  })

  const updateOpen = (bol) => {
    setOpen(bol)
  }

  useClickOutside(optionsRef, updateOpen)

  const filteredArray = searchFilter(value, array)

  return (
    <div ref={optionsRef} className='w-[300px] select-button'>
      <p>{label}</p>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='font-medium w-[300px] border border-blue-400 p-2 rounded flex text-orange-600 hover:brightness-110 justify-between'
      >
        {current ?? randomPlaceholder}
        <Arrow className={`fill-orange-500 transition-transform duration-200 ease-out origin-center ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`p-2 shadow-lg rounded overflow-hidden transition duration-200 origin-top ease-out ${!open ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}>
        <input
          placeholder={randomPlaceholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='p-1 text-sm border border-1 w-full border-slate-400 rounded'
          type='text'
          name=''
          id=''
        />
        <ul className='pt-2 max-h-[200px] w-full overflow-y-auto text-xs grid grid-cols-2'>
          {
            filteredArray.map((el, i) => (
              <li className='p-1 hover:bg-slate-200 rounded cursor-pointer' key={i}>{el.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
