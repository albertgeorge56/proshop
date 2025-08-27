import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import apiClient, { port } from '@renderer/utils/api-client'
import { Skeleton } from '@mantine/core'

export default function Setting() {
  const [localAdd, setlocalAdd] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await apiClient.get('local-ip')
      if (import.meta.env.MODE == 'development') {
        setlocalAdd(`${res.data}:5173`)
      } else {
        setlocalAdd(`${res.data}:${port}`)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h2 className="text-lg font-bold text-center text-primary-900">
        [ Scan QRCode to open on Browser ]
      </h2>
      {loading && <Skeleton height={200} mt={6} width="80%" radius="xl" />}
      {!loading && localAdd && <QRCodeSVG className="rounded-md" value={localAdd} size={200} />}
      <a
        target="__blank"
        href={localAdd}
        className="bg-primary-500 px-4 min-h-[40px] min-w-[240px] py-2 rounded-2xl tracking-wider underline underline-offset-4 text-white font-semibold"
      >
        {localAdd}
      </a>
    </div>
  )
}
