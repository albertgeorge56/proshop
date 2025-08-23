import './assets/main.css'
import { HashRouter as Router } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
)
