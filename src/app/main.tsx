import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '../styles/global.css'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

createRoot(document.getElementById('root')!).render(<App />)
