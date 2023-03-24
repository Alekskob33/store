import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
      </Head>

      <h2 className="title">Used API:</h2>
      <a href="https://fakestoreapi.com/" target="_blank">https://fakestoreapi.com/docs</a>
      <br/>
      <ol>
        <li><b>POST</b>: https://fakestoreapi.com/auth/login</li>
        <li><b>GET</b>: https://fakestoreapi.com/products</li>
        <li><b>GET</b>: https://fakestoreapi.com/products/[id]</li>
        <li><b>POST</b>: https://fakestoreapi.com/products</li>
        <li><b>PUT</b>: https://fakestoreapi.com/products/[id]</li>
        <li><b>DELETE</b>: https://fakestoreapi.com/products/[id]</li>
      </ol>
      <br/>
      <h2 className="title">Stack:</h2>
      <br/>
      <ul>
        <li>React.js</li>
        <li>Nex.js</li>
        <li>Typescript</li>
        <li>Eslint</li>
        <li>Sass</li>
      </ul>

      {/* <nav>
        <Link href="/loginPage">Login</Link><br/>
        <Link href="/products">Products Page</Link><br/>
        <Link href="/delete-product?id=1">Delete Product</Link><br/>
        <Link href="/edit-product?id=1">Edit Product</Link><br/>
        <Link href="/create-product">Create Product</Link><br/>
        <Link href="/single-product?id=1">Single Product</Link><br/>
      </nav> */}
    </>
  )
}
