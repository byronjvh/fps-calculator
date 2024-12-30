import { useEffect, useState } from 'react'
import './App.css'
import AMD_CPU_LIST from './data/cpuAmd.json'
import INTEL_CPU_LIST from './data/cpuIntel.json'
import NVIDIA_GPU_LIST from './data/gpuNvidia.json'
import AMD_GPU_LIST from './data/gpuAmd.json'
import INTEL_GPU_LIST from './data/gpuIntel.json'
import GAMES from './data/games.json'
import { CPU_BRAND, GPU_BRAND, RAM_AMOUNT, RAM_TYPE, STORAGE_TYPE } from './consts'
import { randomOption } from './logic/randomOption'
import { getFPSData } from './services/openai'
import { Route, Routes, useNavigate } from 'react-router'
import { Landing } from './pages/Landing'
import { Result } from './pages/Result'

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
  const navigate = useNavigate()
  const [response, setResponse] = useState('')
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
    getFPSData(config, GAMES)
      .then((result) => {
        setResponse(result) // Guarda el texto en el estado
        console.log(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        navigate('/result')
        setLoading(false)
      })
  }

  return (

    <main className='w-full max-w-[700px] p-2 pt-24'>
      <Routes>
        <Route
          path='/' element={
            <Landing onSubmit={handleClick} config={config} loading={loading} updateConfig={updateConfig} cpuArrayToUse={cpuArrayToUse} gpuArrayToUse={gpuArrayToUse} />
            }
        />
        <Route
          path='/result' element={
            <Result response={response} />
            }
        />
      </Routes>
    </main>

  )
}

export default App
