import { useEffect, useState } from 'react'
import { IconX, IconMinus, IconWindowMaximize, IconWindowMinimize } from '@tabler/icons-react'

export default function WindowButton() {
  const [maximized, setmaximized] = useState<boolean | null>()
  useEffect(() => {
    window.api.onMaximized((_, value) => {
      console.log(value)
      setmaximized(value)
    })
  }, [])
  return (
    <div className="flex gap-1">
      <button
        className="h-9 w-9 flex justify-center items-center transition-all cursor-pointer bg-transparent text-primary-900 hover:text-white hover:bg-yellow-400 rounded-full"
        onClick={() => window.api.minimize()}
      >
        <IconMinus size={20} />
      </button>
      <button
        className="h-9 w-9 flex justify-center items-center transition-all cursor-pointer bg-transparent text-primary-900 hover:text-white hover:bg-primary-600 rounded-full"
        onClick={() => window.api.toggleMax()}
      >
        {maximized ? <IconWindowMinimize size={19} /> : <IconWindowMaximize size={19} />}
      </button>
      <button
        className="h-9 w-9 flex justify-center items-center transition-all cursor-pointer bg-transparent text-primary-900 hover:text-white hover:bg-red-600 rounded-full"
        onClick={() => window.api.close()}
      >
        <IconX size={19} />
      </button>
    </div>
  )
}
