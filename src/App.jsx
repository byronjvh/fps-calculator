import { useState } from 'react'
import './App.css'
import { SelectSearch } from './components/SelectSearch'
import AMD_CPU_LIST from './data/cpuAmd.json'
import { Select } from './components/Select'
import { CONFIG_OPTIONS, CPU_BRAND, GPU_BRAND, RAM_AMOUNT, RAM_TYPE, STORAGE_TYPE } from './consts'
// import INTEL_CPU_LIST from './data/cpuIntel.json'
// import NVIDIA_GPU_LIST from './data/gpuNvidia.json'

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

  const updateConfig = (e, name) => {
    const copy = { ...config }
    copy[name] = e.target.innerText
    setConfig(copy)
  }

  return (
    <main className='flex flex-col items-center'>
      <Select current={config.cpuBrand} name={CONFIG_OPTIONS.cpuBrand} obj={CPU_BRAND} updateState={updateConfig} />
      <div className='flex gap-4'>
        <SelectSearch array={AMD_CPU_LIST} />
      </div>
    </main>
  )
}

export default App
