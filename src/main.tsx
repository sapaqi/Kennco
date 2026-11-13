import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'
import './home-insurance.css'
import './information-page.css'
import './editorial-photo-hero.css'
import './customer-satisfaction.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
