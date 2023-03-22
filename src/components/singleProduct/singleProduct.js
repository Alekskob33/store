import Link from 'next/link'
import Image from 'next/image'
import s from './singleProduct.module.sass'

export default function SingleProduct({data}) {
  return (
    <div className={s.product}>
      <p className={s.category}>{data.category}</p>

      <div className={s.title_container}>
        <h4 className={s.title}>{data.title}</h4>
      </div>
      
      <Image
        src={data.image}
        width={124} 
        height={124}
        alt={'description'}
        className={s.pic}
      />
      <p className={s.desc}>{data.description}</p>
      <p className={s.cost}>{data.price.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}</p>

      <div className={s.footer}>
        <div className={s.rating} style={{'--rate': data.rating.rate}}></div>
        <i className={s.count}>{data.rating.count}</i>
      </div>
    </div>
  )
}

// {
//   id:1,
//   title:'...',
//   price:'...',
//   category:'...',
//   description:'...',
//   image:'...'
// }