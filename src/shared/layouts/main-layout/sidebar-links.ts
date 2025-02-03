import { nanoid } from 'nanoid'
import { ROUTES } from '@/shared/constants/routes'

type SidebarLink = {
    id: string
    link: string
    label: string
}

export const sidebarLinks: SidebarLink[] = [
    {
        id: nanoid(),
        link: ROUTES.HOME,
        label: 'Главная',
    },
]
