import s from './topBar.module.sass'
import Link from 'next/link'

export default function TopBar() {
  return (
    <div className={s.topBar}>
      <Link href="/create-product" className={s.add_button}/>
    </div>
  )
}