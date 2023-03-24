import s from './controls.module.sass'
import Link from 'next/link'
import {useContext} from 'react'
import authContext from '@/context/authContext'

export default function ControlsNav({productData}) {
  const {token} = useContext(authContext)
  const params = Object.entries(productData).map(item => `${item[0]}=${item[1]}&`).join('');

  if (!token) return;

  return token 
    ? ( 
      <nav className={s.nav}>
        <Link href={`/delete-product?${params}`} className={s.btn_remove}/>
        <Link href={`/edit-product?${params}`} className={s.btn_edit}/>
      </nav>
    ) 
    : ''
}
