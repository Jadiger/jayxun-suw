import { Group, Stack } from '@mantine/core'
import styles from './client-info.module.css'
import { ReactNode } from 'react'

function ClientInfoBlock({
  info,
  title,
  color,
  render,
}: {
  info: string
  title: string
  color?: string
  render?: ReactNode
}) {
  return (
    <>
      <Group justify="space-between" wrap="nowrap">
        <Stack gap={4} className={styles.borderBottom}>
          <div className={styles.title}>{title}</div>
          <div className={styles.info} style={{ color: color }}>
            {info}
          </div>
        </Stack>
        {render && render}
      </Group>
    </>
  )
}

export default ClientInfoBlock
