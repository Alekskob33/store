import SingleProduct from '../components/singleProduct/singleProduct'

type Props = {
  product: {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
  }
}

export default function ProductPage({product}: Props) {
  return (
    <SingleProduct data={product}/>
  )
}

export async function getServerSideProps(context: {query: {id: string}}) {
  const {id} = context.query;

  const endPoint = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(endPoint);
  const product = await res.json();

  return { 
    props: {
      product
    } 
  }
}
