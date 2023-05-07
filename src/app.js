import React from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import Chess from './components/Chess'
import Header from './components/Header'



const root = createRoot(document.getElementById('app'))
root.render(<Chess />)


