import s from './controls.module.sass';
import Link from 'next/link';
import { useContext } from 'react';
import authContext from '@/context/authContext';

interface Rating {
  rate: number;
  count: number;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: Rating;
}

interface ControlsNavProps {
  productData: ProductData;
}

export default function ControlsNav({ productData }: ControlsNavProps): JSX.Element | null {
  const { token } = useContext(authContext);
  const params = Object.entries(productData).map(item => `${item[0]}=${item[1]}&`).join('');

  if (!token) return null;

  return (
    <nav className={s.nav}>
      <Link href={`/delete-product?${params}`} className={s.btn_remove}/>
      <Link href={`/edit-product?${params}`} className={s.btn_edit}/>
    </nav>
  );
}
