import { useEffect, useState } from 'react'
import './App.css'
import { SelectSearch } from './components/SelectSearch'
import AMD_CPU_LIST from './data/cpuAmd.json'
import INTEL_CPU_LIST from './data/cpuIntel.json'
import NVIDIA_GPU_LIST from './data/gpuNvidia.json'
import AMD_GPU_LIST from './data/gpuAmd.json'
import INTEL_GPU_LIST from './data/gpuIntel.json'
import GAMES from './data/games.json'
import { Select } from './components/Select'
import { CONFIG_OPTIONS, CPU_BRAND, GPU_BRAND, RAM_AMOUNT, RAM_TYPE, STORAGE_TYPE } from './consts'
import { randomOption } from './logic/randomOption'
import { getFPSData } from './services/gemini'

const DEFAULT_CONFIG = {
  cpuBrand: CPU_BRAND.AMD,
  gpuBrand: GPU_BRAND.Nvidia,
  cpu: randomOption(AMD_CPU_LIST),
  gpu: randomOption(NVIDIA_GPU_LIST),
  storageType: STORAGE_TYPE.M2,
  ramType: RAM_TYPE.DDR4,
  ramAmount: RAM_AMOUNT._32GB
}

function App () {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState('')

  useEffect(() => {
    getFPSData(config, GAMES)
      .then((result) => {
        setResponse(result) // Guarda el texto en el estado
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, []) // Solo se ejecuta al montar el componente
  console.log(response)

  const updateConfig = (e, name) => {
    const copy = { ...config }
    copy[name] = e.target.innerText
    setConfig(copy)
  }

  const cpuArrayToUse = config.cpuBrand === CPU_BRAND.AMD ? AMD_CPU_LIST : INTEL_CPU_LIST
  const gpuArrayToUse =
    config.gpuBrand === GPU_BRAND.AMD
      ? AMD_GPU_LIST
      : config.gpuBrand === GPU_BRAND.Nvidia
        ? NVIDIA_GPU_LIST
        : config.gpuBrand === GPU_BRAND.Intel
          ? INTEL_GPU_LIST
          : []

  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      cpu: randomOption(cpuArrayToUse)
    }))
  }, [config.cpuBrand])

  useEffect(() => {
    setConfig(prev => {
      if (config.gpuBrand === GPU_BRAND.NO_GRAPHIC_CARD) return { ...prev, gpu: GPU_BRAND.NO_GRAPHIC_CARD }
      return {
        ...prev,
        gpu: randomOption(gpuArrayToUse)
      }
    })
  }, [config.gpuBrand])

  const handleClick = () => {
    setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 3000)
  }
  console.log(config)

  return (
    <main className='w-full max-w-[700px] p-2 pt-24'>
      <h1 className='text-5xl font-bold text-center text-balance mb-2'>Calculate Your PC FPS in Popular Games</h1>
      <p className='text-center mb-8'>Select your PC configuration and calculate the FPS in popular games</p>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Select className='flex-[2]' current={config.cpuBrand} name={CONFIG_OPTIONS.cpuBrand} obj={CPU_BRAND} updateState={updateConfig} />
          <SelectSearch className='flex-[3]' array={cpuArrayToUse} name={CONFIG_OPTIONS.cpu} current={config.cpu} updateState={updateConfig} />
        </div>
        <div className='flex gap-4'>
          <Select className='flex-[2]' label='GPU Brand' current={config.gpuBrand} name={CONFIG_OPTIONS.gpuBrand} obj={GPU_BRAND} updateState={updateConfig} />
          <SelectSearch className='flex-[3]' label='GPU' array={gpuArrayToUse} name={CONFIG_OPTIONS.gpu} current={config.gpu} updateState={updateConfig} />
        </div>
        <div className='flex gap-4'>
          <Select label='RAM Type' current={config.ramType} name={CONFIG_OPTIONS.ramType} obj={RAM_TYPE} updateState={updateConfig} />
          <Select label='RAM Amount' current={config.ramAmount} name={CONFIG_OPTIONS.ramAmount} obj={RAM_AMOUNT} updateState={updateConfig} />
          <Select label='Storage Type' current={config.storageType} name={CONFIG_OPTIONS.storageType} obj={STORAGE_TYPE} updateState={updateConfig} />
        </div>
        <button onClick={() => handleClick()} className='flex relative bg-orange-500 p-2 text-white font-bold justify-center rounded hover:brightness-110 transition duration-200 ease-out'>
          <span className={`${loading ? 'opacity-0' : ''}`}>Calculate</span>
          {
            loading && (<span className='loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />)
          }
        </button>
      </div>
    </main>
  )
}

export default App
