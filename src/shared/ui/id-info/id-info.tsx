import { Group } from '@mantine/core'

import style from './id-info.module.css'

export const IdInfo = ({title,info} : {title : string, info : string}) => {
  return (
    <Group gap={8} py={12} px={8} justify='center'>
        <span className={style.title}>{title}</span>
        <span className={style.info}>{info}</span>
    </Group>
  )
}
