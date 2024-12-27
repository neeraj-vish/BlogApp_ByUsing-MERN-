import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import State from './context/AuthState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <State>
    <Router>
    <App />
    </Router>
    </State>
  </StrictMode>,
)
