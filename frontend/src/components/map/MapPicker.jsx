import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapPicker({ setLatitude, setLongitude }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [72.5714, 23.0225], // default Ahmedabad
      zoom: 10,
    })

    map.on("click", (e) => {
      setLongitude(e.lngLat.lng)
      setLatitude(e.lngLat.lat)

      new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map)
    })

    return () => map.remove()
  }, [])

  return (
    <div
      ref={mapContainer}
      className="w-full h-80 rounded-2xl mt-6"
    />
  )
}
