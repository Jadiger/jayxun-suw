import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Routing } from './routing'

const MapWithRouting = ({ lat, lng }: { lat: number; lng: number }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  )
  const destination: [number, number] = [lat, lng]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
        },
        (error) => {
          console.error('Geolokatsiyani olishda xato:', error)
        }
      )
    } else {
      console.error('Brauzer geolokatsiyani qo‘llab-quvvatlamaydi.')
    }
  }, [])

  if (!userLocation) {
    return <p>Foydalanuvchi joylashuvini yuklash...</p>
  }

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Routing waypoints={[userLocation, destination]} />
    </MapContainer>
  )
}

export default MapWithRouting
