import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button, Divider, Group, Stack, Title } from '@mantine/core'

import { ChevronLeft, ChevronRight, LifeBuoy, MapPin } from 'react-feather'
import { UseFormReturnType } from '@mantine/form'
import {
  IClientAddress,
  IClientBody,
  IClientCoordinate,
} from '../types/clients'

export const ClientMap = ({
  form,
  setMap,
}: {
  form: UseFormReturnType<IClientBody, (values: IClientBody) => IClientBody>
  setMap: Dispatch<SetStateAction<boolean>>
}) => {
  const [currentLocation, setCurrentLocation] =
    useState<IClientCoordinate | null>(null)
  const [currentAddress, setCurrentAddress] = useState<IClientAddress | null>(
    null
  )

  const [render, setRender] = useState(0)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const userLocation = { lat: latitude, lng: longitude }
          setCurrentLocation(userLocation)
          fetchAddress(latitude, longitude)
        },
        (error) => {
          console.error('Jaylasiw manzilin aliwda qatelik:', error)
          setCurrentLocation({ lat: 51.505, lng: -0.09 })
        }
      )
    } else {
      console.error('Brauzer geolokatsiyani qollap quwatlamaydi')
      const defaultLocation = { lat: 51.505, lng: -0.09 }
      setCurrentLocation(defaultLocation)
    }
  }, [render])

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
      const data = await response.json()

      setCurrentAddress(data.address)
    } catch (error) {
      console.error('manzildi aliwda qatelik:', error)
      setCurrentAddress(null)
    }
  }

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng
        setCurrentLocation({ lat, lng })
        fetchAddress(lat, lng)
      },
    })
    return null
  }
  console.log(currentAddress)

  function handleAddAdress() {
    form.setFieldValue(
      'streetName',
      (currentAddress?.house_number &&
        currentAddress?.road &&
        `${currentAddress.house_number}, ${currentAddress.road}, ${currentAddress?.residential}`) ||
        (currentAddress?.road &&
          `${currentAddress.road}, ${currentAddress?.residential}`) ||
        currentAddress?.residential ||
        ''
    )
    form.setFieldValue('latitude', String(currentLocation?.lat) || '')
    form.setFieldValue('longitude', String(currentLocation?.lng) || '')

    setMap(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: '100',
      }}
    >
      {currentLocation ? (
        <MapContainer
          center={currentLocation}
          zoom={13}
          style={{ width: '100%', flexGrow: 1, position: 'relative' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MapClickHandler />

          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>
                <div>
                  <p>
                    <strong>Manzil:</strong>{' '}
                    {(currentAddress?.house_number &&
                      (currentAddress.house_number, currentAddress.road)) ||
                      currentAddress?.road ||
                      'Manzil Juklenbekte...'}
                  </p>
                  <p>
                    <strong>Lat:</strong> {currentLocation.lat}
                  </p>
                  <p>
                    <strong>Lng:</strong> {currentLocation.lng}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          <Group
            justify="space-between"
            p={16}
            style={{
              width: '100%',
              position: 'absolute',
              left: '0',
              bottom: '0',
              zIndex: '1000',
            }}
            wrap="nowrap"
          >
            <span
              style={{
                color: 'var(--mantine-color-gray-8)',
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '50%',
              }}
            >
              <ChevronLeft size={24} onClick={() => setMap(false)} />
            </span>
            <span
              style={{
                color: 'var(--mantine-color-gray-8)',
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '50%',
              }}
            >
              <LifeBuoy
                size={24}
                onClick={() => {
                  setRender(Math.random())
                }}
              />
            </span>
          </Group>
        </MapContainer>
      ) : (
        <p>Manzil aniqlanbaqta...</p>
      )}

      {currentLocation && currentAddress && (
        <Stack
          p={16}
          pb="calc(25px + env(safe-area-inset-bottom))"
          gap={33}
          style={{
            borderRadius: '16px 16px 0px 0px',
            background: '#FFF',
            boxShadow: '0px -4px 12px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <Stack gap={0}>
            <Title order={5}>Адрес</Title>
            <Divider my={16} />
            <Group justify="space-between" wrap="nowrap">
              <MapPin
                style={{ flexShrink: 0 }}
                color="var(--mantine-color-gray-9)"
                size={24}
              />
              <span
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {(currentAddress.house_number &&
                  `${currentAddress.house_number}, `) ||
                  ''}
                {(currentAddress?.road && `${currentAddress.road} ,`) || ''}
                {(currentAddress.residential && currentAddress.residential) ||
                  ''}
              </span>

              <ChevronRight
                style={{ flexShrink: 0 }}
                size={24}
                color="var(--mantine-color-gray-9)"
              />
            </Group>
          </Stack>
          <Button onClick={handleAddAdress} style={{}}>
            Выбрать этот адрес
          </Button>
        </Stack>
      )}
    </div>
  )
}
