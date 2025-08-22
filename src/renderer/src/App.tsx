import { useEffect, useState } from 'react'
function App(): React.JSX.Element {
  const [data, setData] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const baseUrl = await window.api.getBaseUrl()
        const res = await fetch(`${baseUrl}/api/check`)
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Frontend error: ', error)
      }
    })()
  })
  return (
    <>
      <p>Hello</p>
      <p>{JSON.stringify(data, null, 2)}</p>
    </>
  )
}

export default App
