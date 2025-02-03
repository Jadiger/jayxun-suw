import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMap } from 'react-leaflet'

interface RoutingProps {
  waypoints: [number, number][] // Boshlang‘ich va tugash nuqtalari
}

export const Routing: React.FC<RoutingProps> = ({ waypoints }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // Routing Layer yaratish
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const routingControl = L.Routing.control({
      waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error`
      router: L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5173/route/v1',
      }),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
    }).addTo(map)

    return () => {
      // Marshrutni tozalash
      map.removeControl(routingControl)
    }
  }, [map, waypoints])

  return null
}
