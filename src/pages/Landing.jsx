import { Select } from '../components/Select'
import { SelectSearch } from '../components/SelectSearch'
import { CONFIG_OPTIONS, CPU_BRAND, GPU_BRAND, RAM_AMOUNT, RAM_TYPE, STORAGE_TYPE } from '../consts'

export function Landing ({ config, loading, onSubmit, updateConfig, cpuArrayToUse, gpuArrayToUse }) {
  return (
    <>
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
        <button onClick={onSubmit} className='flex relative bg-orange-500 p-2 text-white font-bold justify-center rounded hover:brightness-110 transition duration-200 ease-out'>
          <span className={`${loading ? 'opacity-0' : ''}`}>Calculate</span>
          {
            loading && (<span className='loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />)
          }
        </button>
      </div>
    </>
  )
}
