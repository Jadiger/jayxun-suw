import style from './drivers.module.css'
import driver from '/products/driver.png'

import { Center, Divider, Loader } from '@mantine/core'
import ClientInfoBlock from '@/shared/ui/client-info/client-info'
import { useParams } from 'react-router-dom'
import { useFetchCourier } from '@/queries/courierQueries'

export const DriverInfo = () => {
  const { id } = useParams()
  const { data: courier, isLoading } = useFetchCourier(Number(id))

  return (
    <>
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}
      {isLoading || (
        <div className="container">
          <img src={driver} className={style.driverInfoImg} />
          <div>
            <ClientInfoBlock
              title="Водитель"
              info={`${courier?.lastName} ${courier?.firstName}`}
            />
            <Divider my={12} color="var(--mantine-color-gray-2" />
            <ClientInfoBlock
              title="Номер телефона"
              info={courier?.phoneNumber || ''}
            />
            <Divider my={12} color="var(--mantine-color-gray-2" />
            <ClientInfoBlock
              title="Марка автомобиля"
              info={courier?.carName || ''}
            />
            <Divider my={12} color="var(--mantine-color-gray-2" />
            <ClientInfoBlock
              title="Номер автомобиля"
              info={courier?.carNumber || ''}
            />
            <Divider my={12} color="var(--mantine-color-gray-2" />
            <ClientInfoBlock title="Логин" info={courier?.username || ''} />
          </div>
        </div>
      )}
    </>
  )
}
