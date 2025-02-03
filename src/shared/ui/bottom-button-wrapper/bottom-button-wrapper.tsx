import { ReactNode } from 'react'

import styles from './bottom-button-wrapper.module.css'

export const BottomButtonWrapper = ({ render }: { render: ReactNode }) => {
  return (
    <>
      <div className={styles.emptyDiv}></div>
      <div className={styles.wrapper}>{render}</div>
    </>
  )
}
