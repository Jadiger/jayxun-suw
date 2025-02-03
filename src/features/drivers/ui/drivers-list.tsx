import { Center, Divider, Loader } from '@mantine/core'

import { Fragment } from 'react/jsx-runtime'
import { NoData } from '@/shared/ui/no-data/no-data'

import { useFetchCouriers } from '../queries/courierQueries'
import { CourierInfo } from './courier-info-component'

const DriversList = () => {
  const { data: couriers, isLoading } = useFetchCouriers()
  console.log(couriers);
  
  if (couriers?.length == 0) {
    return <NoData title="На базе нет водителя" />
  }

  return (
    <>
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}
      {isLoading || (
        <div
          className="container"
          style={{ paddingTop: '12px', marginBottom: '30px' }}
        >
          {couriers?.map((courier, index) => (
            <Fragment key={index}>
              <CourierInfo courier={courier} loading={isLoading} />
              {couriers.length !== index + 1 && (
                <Divider my={12} color="var(--mantine-color-gray-2)" />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  )
}

export default DriversList
