import Link from 'next/link';
import Image from 'next/image';
import s from './productCard.module.sass';
import ControlsNav from './controls';

interface ProductData {
  id: number;
  category: string;
  title: string;
  image: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface Props {
  data: ProductData;
}

export default function ProductCard({ data }: Props) {
  return (
    <div className={s.product}>
      <p className={s.category}>{data.category}</p>

      <div className={s.title_container}>
        <h4 className={s.title}>{data.title}</h4>
      </div>

      <Link href={`/single-product?id=${data.id}`}>
        <Image
          src={data.image}
          width={124}
          height={124}
          alt={data.title}
          className={s.pic}
        />
      </Link>

      <p className={s.desc}>{data.description}</p>
      <p className={s.cost}>
        {data.price.toLocaleString('en-EN', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>

      <div className={s.footer}>
        <div className={s.rating} style={{'--rate': `${data.rating.rate}`} as React.CSSProperties}></div>
        <i className={s.count}>{data.rating.count}</i>
      </div>

      <ControlsNav productData ={data} />
    </div>
  );
}
