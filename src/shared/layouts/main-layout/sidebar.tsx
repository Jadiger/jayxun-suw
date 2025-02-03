import { NavLink } from 'react-router-dom'
import { NavLink as NavLinkMantine } from '@mantine/core'

import { sidebarLinks } from './sidebar-links'

export const Sidebar = () => {
  return (
    <div>
      {sidebarLinks.map(({ id, label, link }) => (
        <NavLink
          key={id}
          to={link}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {({ isActive }) => (
            <NavLinkMantine active={isActive} component="span" label={label} />
          )}
        </NavLink>
      ))}
    </div>
  )
}
