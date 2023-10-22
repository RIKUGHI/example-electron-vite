import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
// import App from './App'

const App = () => {
  const [lol, setLol] = useState('loading...')

  const pattern2_1 = async () => {
    setLol('loading nter...')
    try {
      const lol = await window.api.ping()
      console.log(lol)

      setLol(lol)
    } catch (error) {
      setLol('error')
    }
  }

  useEffect(() => {
    pattern2_1()
    window.api.on((e: any, arg: any) => {
      console.log(arg, e)
      setLol(arg)
    })
  }, [])

  return <h1>Live {lol}</h1>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
