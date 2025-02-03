import { ActionIcon } from '@mantine/core'
import { Plus } from 'react-feather'

import { Link } from 'react-router-dom'

export const CreateButton = ({ link }: { link: string }) => {
  return (
    <ActionIcon
      component={Link}
      to={link}
      w={56}
      h={56}
      radius={16}
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '40px',
        marginBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <Plus
        size={32}
        color="#fff"
        style={{ boxShadow: '0px 8px 16px 0px rgba(13, 108, 242, 0.24)' }}
      />
    </ActionIcon>
  )
}
