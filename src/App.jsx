import './App.css'
import { SelectForm } from './components/SelectForm'
import AMD_CPU_LIST from './data/cpuAmd.json'
import INTEL_CPU_LIST from './data/cpuIntel.json'
import NVIDIA_GPU_LIST from './data/gpuNvidia.json'

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
        <SelectForm array={AMD_CPU_LIST} />
        <SelectForm array={INTEL_CPU_LIST} />
        <SelectForm array={NVIDIA_GPU_LIST} />
      </div>
    </main>
  )
}

export default App
