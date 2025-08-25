import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './assets/main.css'
import { theme } from './utils/theme'
import { Notifications } from '@mantine/notifications'
import { MantineProvider } from '@mantine/core'
import { HashRouter as Router } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ModalsProvider } from '@mantine/modals'

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <ModalsProvider>
      <Router>
        <App />
      </Router>
    </ModalsProvider>
  </MantineProvider>
)
