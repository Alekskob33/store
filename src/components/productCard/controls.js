import s from './controls.module.sass'
import Link from 'next/link'

export default function ControlsNav({productData}) {
  const params = Object.entries(productData).map(item => `${item[0]}=${item[1]}&`).join('');

  return (
    <nav className={s.nav}>
      <Link href={`/delete-product?${params}`} className={s.btn_remove}/>
      <Link href={`/edit-product?${params}`} className={s.btn_edit}/>
    </nav>
  )
}
