import s from './preloader.module.sass';
import Image from 'next/image';

export default function Preloader() {
  return (
    <div className={s.preloader}>
      <Image src='/loading.png' width={64} height={64} className={s.spinner} alt=""/>
    </div>
  )
}