import { createContext, useState, ReactNode, useContext } from 'react'
type Theme = 'light' | 'dark'
interface GlobalState {
  user: string | null
  theme: Theme
  loading: boolean
}

type GlobalContextType = {
  globalState: GlobalState
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export const MyGlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    user: null,
    theme: 'light',
    loading: false
  })

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  )
}

// Hook
export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext)
  if (!ctx) {
    throw new Error('useGlobalContext must be used within MyGlobalProvider')
  }
  return ctx
}
