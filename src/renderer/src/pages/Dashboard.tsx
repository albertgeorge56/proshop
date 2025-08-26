import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import apiClient from '@renderer/utils/api-client'

export default function Dashboard() {
  const [localAdd, setlocalAdd] = useState<string>()
  useEffect(() => {
    ;(async () => {
      const res = await apiClient.get('local-ip')
      setlocalAdd(res.data)
    })()
  }, [])

  return (
    <div>
      <div>
        <h2>Scan QR to open on mobile</h2>
        {localAdd && <QRCodeSVG value={localAdd} size={200} />}
        <p>{localAdd}</p>
      </div>
    </div>
  )
}
