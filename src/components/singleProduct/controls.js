import s from './controls.module.sass'
import Link from 'next/link'

export default function ControlsNav({productData}) {
  const {id, title, image} = productData;
  return (
    <nav className={s.nav}>
      <Link href={`/delete-product?id=${id}&title=${title}&image=${image}`} className={s.btn_remove}/>
    </nav>
  )

}
