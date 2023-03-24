import ProductCard from '../productCard/productCard';
import s from './productsList.module.sass';

interface Props {
  productsData: {
    id: number;
    category: string;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }[];
}

export default function ProductsList({ productsData }: Props) {
  if (productsData.length < 1) return null;
  return (
    <div className={s.products}>
      {productsData.map((data) => (
        <ProductCard data={data} key={data.id} />
      ))}
    </div>
  );
}
