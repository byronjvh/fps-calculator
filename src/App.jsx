import './App.css'
import { SelectForm } from './components/SelectForm'
import AMD_CPU_LIST from './data/cpuAmd.json'
import INTEL_CPU_LIST from './data/cpuIntel.json'

const CPU_BRAND = [
  'AMD',
  'Intel'
]

function App () {
  return (
    <main className='flex flex-col items-center'>
      <select>
        {
        CPU_BRAND.map((el, i) => (
          <option key={i} value={el.toLowerCase()}>{el}</option>
        ))
      }
      </select>
      <div className='flex gap-4'>
        <SelectForm array={AMD_CPU_LIST} current='Ryzen 5 5600' />
        <SelectForm array={INTEL_CPU_LIST} current='Core i7-14700' />
      </div>
    </main>
  )
}

export default App
