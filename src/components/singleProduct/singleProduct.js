import Link from 'next/link'
import Image from 'next/image'
import s from './singleProduct.module.sass'
import ControlsNav from './controls'

export default function SingleProduct({data}) {
  return (
    <div className={s.product}>
      <ControlsNav productData={data}/>

      <div className={s.pic_container}>
        <Image
          src={data.image}
          width={124} 
          height={124}
          alt={data.title}
          className={s.pic}
        />
      </div>
      
      <div className={s.content}>
        <p className={s.category}>{data.category}</p>
        <span className={s.cost}>{data.price.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}</span>

        <h4 className={s.title}>{data.title}</h4>
        <p className={s.desc}>{data.description}</p>

        <div className={s.footer}>
          <div className={s.rating} style={{'--rate': data.rating.rate}}></div>
          <i className={s.count}>{data.rating.count}</i>
        </div>
      </div>
    </div>
  )
}