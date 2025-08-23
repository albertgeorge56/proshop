import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './assets/main.css'
import { theme } from './utils/theme'
import { Notifications } from '@mantine/notifications'
import { MantineProvider } from '@mantine/core'
import { HashRouter as Router } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <Router>
      <App />
    </Router>
  </MantineProvider>
)
