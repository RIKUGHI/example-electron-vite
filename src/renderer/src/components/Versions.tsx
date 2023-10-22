import { useEffect, useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
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

  // const pattern2_3 = () => {
  //   setLol(window.api.sync())
  // }

  useEffect(() => {
    pattern2_1()
    //
    // Pattern 2 - 2
    // its good but if this listener put outside of useEffect it will cause "EventEmitter memory leak detected"
    // window.api.on((e: any, arg: any) => {
    //   console.log(arg, e)
    //   setLol(arg)
    // })
    //
    // Pattern 2 - 3 (not recommended)
    // pattern2_3()
  }, [])

  const handleClick2 = async () => {
    setLol('loading nter...')
    try {
      const lol = await window.api.ping()
      console.log(lol)

      setLol(lol)
    } catch (error) {
      setLol('error')
    }
  }

  const addWindow = () => {
    window.api.secondWindow()
  }

  return (
    <ul className="versions">
      <div>
        <h1>{lol}</h1>
        <button
          onClick={() => {
            // Pattern 2 - 1
            // handleClick2()
            addWindow()

            // Pattern 2 - 2
            // window.api.async()

            // Pattern 2 - 3
            // pattern2_3()
          }}
        >
          add window
        </button>
        <button onClick={handleClick2}>increment count</button>
      </div>
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li className="v8-version">V8 v{versions.v8}</li>
    </ul>
  )
}

export default Versions
