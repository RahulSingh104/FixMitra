import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function ServiceMap({ latitude, longitude }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    if (!latitude || !longitude) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 12,
    })

    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map)

    return () => map.remove()
  }, [latitude, longitude])

  return (
    <div
      ref={mapContainer}
      className="w-full h-80 rounded-2xl"
    />
  )
}
