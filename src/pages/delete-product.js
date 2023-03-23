import s from '@/styles/Delete.module.sass'
import Preloader from '@/components/preloader/preloader'

import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Image from 'next/image'

export default function DeleteProduct() {
  const router = useRouter();
  const {id, title, image} = router.query;
  const [isDeleted, setIsDeleted] = useState(false);
  const [waiting, setWaiting] = useState(false);

  function handleDeleteClick() {
    const endPoing = `https://fakestoreapi.com/products/${id}`;
    const data = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };

    setWaiting(true);

    fetch(endPoing, data)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        setWaiting(false);
        return res.json();
      })
      .then(data => {
        setIsDeleted(true);
      })
      .catch(err => {
        console.log('Error with status code :' + err.message);
      })
  }

  function handleCancelClick() {
    router.back();
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {waiting && <Preloader/>}

        <p>{title}</p>
        <Image className={isDeleted ? s.pic_opacity : ''} src={image} width={200} height={200} alt={title}/>
        
        { isDeleted ? (
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
          )
        }

        <Link href="/products">back to Products Page</Link>
      </div>
    </div>
  )
}

