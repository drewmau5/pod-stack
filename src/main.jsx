import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/typography.css'
import './styles/texture.css'
import './styles/motion.css'
import './styles/global.css'
import './styles.css'
import './styles/brand.css'
import './styles/product.css'

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
