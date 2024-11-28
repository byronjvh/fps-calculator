import { useState } from 'react'

export function SelectForm ({ label = 'CPU', array = [], current = 'CPU' }) {
  const [value, setValue] = useState('')

  return (
    <div className='w-[300px] select-button'>
      <p>{label}</p>
      <button className='font-bold w-[300px] border border-1 border-blue-400 p-2 rounded flex'>{current}</button>
      <div className='p-2 shadow-md rounded'>
        <input value={value} onChange={(e) => setValue(e.target.value)} className='border border-1 w-full border-slate-400 rounded' type='text' name='' id='' />
        <ul className='pt-2 max-h-[200px] w-full overflow-y-scroll text-xs grid grid-cols-2'>
          {
            array.filter(el => {
              console.log(value.lastIndexOf(' '), value.length - 1)
              return el.name.toLowerCase().includes(value)
            })
              .map((el, i) => (
                <li className='p-1 hover:bg-slate-200 rounded cursor-pointer' key={i}>{el.name}</li>
              ))
          }
        </ul>
      </div>
    </div>
  )
}
