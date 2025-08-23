import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import TopBar from './components/TopBar'

function App() {
  const theme = createTheme({
    primaryColor: 'primary',
    colors: {
      primary: [
        '#f6eeff',
        '#e7d9f7',
        '#cab1ea',
        '#ad86dd',
        '#9462d2',
        '#854bcb',
        '#7d3fc9',
        '#6b31b2',
        '#5f2ba0',
        '#52238d'
      ]
    }
  })
  //  const baseUrl = await window.api.getBaseUrl()
  return (
    <MantineProvider theme={theme}>
      <div className="h-screen w-full bg-slate-200">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </MantineProvider>
  )
}

export default App
