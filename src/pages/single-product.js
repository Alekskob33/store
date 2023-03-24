import SingleProduct from '../components/singleProduct/singleProduct'

export default function ProductPage({product}) {
  return (
    <SingleProduct data={product}/>
  )
}

export async function getServerSideProps(context) {
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