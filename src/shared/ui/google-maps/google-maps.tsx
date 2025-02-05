import { Center, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'

export const GoogleMapsEmbed = ({
  lat,
  lng,
}: {
  lat: string | undefined
  lng: string | undefined
}) => {
  interface ILocation {
    latitude: number | null
    longitude: number | null
    errorMessage: string
  }
  const [location, setLocation] = useState<ILocation>({
    latitude: null,
    longitude: null,
    errorMessage: '',
  })

  useEffect(() => {
    // Geolocation API orqali foydalanuvchining joylashuvini olish
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            errorMessage: '',
          })
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            errorMessage: error.message,
          })
        }
      )
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        errorMessage: 'Geolocation not supported by this browser.',
      })
    }
  }, [])
  if (location.latitude && location.longitude && lat && lng) {
    window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${lat},${lng}
`
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        paddingTop: '60px',
        zIndex: 50,
      }}
    >
      <Center>
        <Loader />
      </Center>
    </div>
  )
}
