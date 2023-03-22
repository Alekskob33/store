import Link from 'next/link';

import SingleProduct from '../singleProduct/singleProduct';
import s from './productsList.module.sass';

export default function ProductsList({productsData}) {
  if (productsData.length < 1) return '';
  return (
    <div className={s.products}>
      { productsData.map(data => <SingleProduct data={data} key={data.id}/>)}
    </div>
    )
  }