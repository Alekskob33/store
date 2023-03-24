import Link from 'next/link';

import ProductCard from '../productCard/productCard';
import s from './productsList.module.sass';

export default function ProductsList({productsData}) {
  if (productsData.length < 1) return '';
  return (
    <div className={s.products}>
      { productsData.map(data => <ProductCard data={data} key={data.id}/>)}
    </div>
    )
  }