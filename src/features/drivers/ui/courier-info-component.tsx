import { Link } from 'react-router-dom'
import { ICourier } from '../types'
import { Group, Stack, Switch } from '@mantine/core'
import driver from '/products/driver.png'
import styles from './drivers.module.css'
import { Circle } from 'react-feather'
import { useActiveCourier } from '../queries/courierQueries'

export const CourierInfo = ({
  courier,
  loading,
}: {
  courier: ICourier
  loading: boolean
}) => {
  const isActiveMutation = useActiveCourier()
  const handleSubmit = async (id: number) => {
    try {
      await isActiveMutation.mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading || (
        <Link
          to={`/drivers/${courier.id}`}
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          <Group justify="space-btween" align="center" wrap="nowrap">
            <img src={driver} width={56} />
            <Stack gap={4} style={{ flexGrow: 1 }}>
              <Group
                justify="space-between"
                style={{ width: '100%' }}
                wrap="nowrap"
              >
                <div
                  className={styles.blackText}
                >{`${courier.firstName} ${courier.lastName}`}</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Switch
                    defaultChecked
                    checked={courier.isActive}
                    onChange={() => handleSubmit(courier.id)}
                    color="green"
                    size="md"
                    radius="lg"
                  />
                </div>
              </Group>
              <div className={styles.grayText}>
                {courier.phoneNumber}
                <Circle size={4} style={{ margin: '4px' }} />
                {courier.carName}
                <Circle size={4} style={{ margin: '4px' }} />
                {courier.carNumber}
              </div>
            </Stack>
          </Group>
        </Link>
      )}
    </>
  )
}
