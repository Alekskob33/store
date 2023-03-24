import s from '@/styles/Delete.module.sass';
import Preloader from '@/components/preloader/preloader';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '@/context/authContext';
import {useRouter} from 'next/router';
import Image from 'next/image';

export default function DeleteProduct(): JSX.Element {
  const { token } = useContext(authContext);
  const router = useRouter();

  const { id, title, image } = router.query as any;
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      router.push('/loginPage');
    }
  },[token])
  
  function handleDeleteClick(): void {
    const endPoint = `https://fakestoreapi.com/products/${id}`;
    const data = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    setWaiting(true);

    fetch(endPoint, data)
      .then((res) => {
        if (!res.ok) throw new Error(res.status.toString());
        setWaiting(false);
        return res.json();
      })
      .then(() => {
        setIsDeleted(true);
      })
      .catch((err) => {
        console.log('Error with status code :' + err.message);
      });
  }

  function handleCancelClick(): void {
    router.push('/products');
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {waiting && <Preloader />}
        <p>{title}</p>
        <Image className={isDeleted ? s.pic_opacity : ''} src={image} width={200} height={200} alt={title} />
        {isDeleted ? (
          <>
            <p>This is not more actual</p>
            <button disabled>DELETED</button>
          </>
        ) : (
          <>
            <p>Are you sure you want to delete ?</p>
            <div>
              <button onClick={handleDeleteClick}>Yes</button>
              <button onClick={handleCancelClick}>No</button>
            </div>
          </>
        )}
        <Link href="/products">back to Products Page</Link>
      </div>
    </div>
  );
}
