import { ReactNode } from 'react'
import { ActionIcon, Group, GroupProps, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'

interface PageHeadProps extends GroupProps {
  render?: ReactNode
  title: string
  onClick? : ()=> void
  noLink?: boolean
}

export const PageHead = (props: PageHeadProps) => {
  const navigate = useNavigate()
  const { render, title, noLink,onClick, ...otherProps } = props

  return (
    <Group
      justify="space-between"
      align="center"
      py={12}
      px={12}
      bg={'var(--mantine-color-gray-1)'}
      wrap="nowrap"
      {...otherProps}
    >
      {!noLink && (
        <ActionIcon
          onClick={() => navigate(-1)}
          variant="transparent"
          c={'var(--mantine-color-gray-9)'}
          style={{ flexShrink: 0 }}
        >
          <ChevronLeft size={24} />
        </ActionIcon>
      )}
      {noLink && (
        <ActionIcon
          onClick={onClick}
          variant="transparent"
          c={'var(--mantine-color-gray-9)'}
          style={{ flexShrink: 0 }}
        >
          <ChevronLeft size={24} />
        </ActionIcon>
      )}

      <Title order={4} ta="center">
        {title}
      </Title>

      {render ? render : null}
    </Group>
  )
}
