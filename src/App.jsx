import { useState } from 'react'
import './App.css'
import { SelectForm } from './components/SelectForm'
import AMD_CPU_LIST from './data/cpuAmd.json'
import { Select } from './components/Select'
// import INTEL_CPU_LIST from './data/cpuIntel.json'
// import NVIDIA_GPU_LIST from './data/gpuNvidia.json'

const CPU_BRAND = {
  AMD: 'AMD',
  Intel: 'Intel'
}

const GPU_BRAND = {
  AMD: 'AMD',
  Nvidia: 'Nvidia'
}

const STORAGE_TYPE = {
  M2: 'M.2',
  SATA: 'SATA',
  HD: 'HD'
}

const RAM_TYPE = {
  DDR4: 'DDR4',
  DDR5: 'DDR5'
}

const RAM_AMOUNT = {
  _8GB: '8GB',
  _16GB: '8GB',
  _32GB: '8GB',
  _64GB: '8GB',
  _128GB: '8GB',
}

const DEFAULT_CONFIG = {
  cpuBrand: CPU_BRAND.AMD,
  gpuBrand: GPU_BRAND.Nvidia,
  cpu: '',
  gpu: '',
  storageType: STORAGE_TYPE.M2,
  ramType: RAM_TYPE.DDR4,
  ramAmount: RAM_AMOUNT._32GB
}

function App () {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  console.log(config)

  const updateCpuBrand = (e) => {
    setConfig({ ...config, cpuBrand: CPU_BRAND[e.target.value] })
  }

  return (
    <main className='flex flex-col items-center'>
      <Select obj={CPU_BRAND} updateState={updateCpuBrand} />
      <div className='flex gap-4'>
        <SelectForm array={AMD_CPU_LIST} />
      </div>
    </main>
  )
}

export default App
