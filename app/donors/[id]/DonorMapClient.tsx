"use client"

import dynamic from "next/dynamic"

const DonorMap = dynamic(() => import("./DonorMap"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full animate-pulse rounded-xl bg-gray-100 flex items-center justify-center">
      <p className="text-sm text-gray-400">Loading map…</p>
    </div>
  ),
})

type Props = {
  lat: number
  lng: number
  label: string
}

export default function DonorMapClient({ lat, lng, label }: Props) {
  return <DonorMap lat={lat} lng={lng} label={label} />
}
