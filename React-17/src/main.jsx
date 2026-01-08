import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WebsiteContext from './context/WebsiteContext.jsx'


createRoot(document.getElementById('root')).render(
  <WebsiteContext >
    <App />
  </WebsiteContext>
)
