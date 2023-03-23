import Link from 'next/link'
import {useRouter} from 'next/router'

export default function DeleteProduct() {
  const router = useRouter();
  const {id} = router.query;
  
  return (
    <>
      <h1>test</h1>
      {id}
      <Link href="/">back to Home Page</Link>
    </>
  )
}