import style from './no-data.module.css'
import emptyImage from '/empty.png'

export function NoData({ title }: { title: string }) {
  return (
    <div className={style.notOrder}>
      <img src={emptyImage} className={style.notOrderImg} />
      <p className={style.notOrderText}>{title}</p>
    </div>
  )
}
