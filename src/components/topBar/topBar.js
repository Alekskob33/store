import s from './topBar.module.sass'
import Link from 'next/link'
import {useContext} from 'react'
import authContext from '@/context/authContext'
import {useRouter} from 'next/router'

export default function TopBar() {
  const {token, setToken} = useContext(authContext);
  
  const router = useRouter();
  const {pathname: thisPath} = router;
  
  const isVisible = {
    // paths: 
    // '/', 'loginPage', 'products', // 'single-product', 
    // '/edit-product', 'delete-product', 'create-product'
    get btnCreate() {
      if (!token) return false;
      return (['/',  '/products', '/single-product', '/delete-product'].includes(thisPath))},
    get btnLogin() {
      if (token) return false;
      return (['/',  '/products', '/single-product', '/create-product', '/edit-product', '/delete-product'].includes(thisPath))},
    get btnLogout() {
      if (!token) return false;
      return (['/',  '/products', '/single-product', '/create-product', '/edit-product', '/delete-product'].includes(thisPath))},
    get btnCatalog() {
      return (['/',  '/single-product', '/create-product', '/edit-product', '/delete-product'].includes(thisPath))},
  }

  return (
    <div className={s.topBar}>
      {isVisible.btnCatalog && 
        <Link href="/products" className={s.catalog}>← All Products</Link>}
      {isVisible.btnCreate && 
        <Link href="/create-product" className={s.add_button}/>}
      {isVisible.btnLogin && 
        <Link href="/loginPage" className={s.login_button}/>}  
      {isVisible.btnLogout && 
        <button onClick={() => setToken(null)} className={s.logout_button}></button>}  
    </div>
  )
}