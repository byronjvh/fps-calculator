import { FPSBar } from '../components/FPSBar'

export function Result ({ response }) {
  return (
    <div>
      {
            Array.isArray(response) && response?.map((el, i) => (
              <FPSBar key={i} el={el} />
            ))
        }
    </div>
  )
}
