import s from '../styles/ProductsPage.module.sass'

import Link from 'next/link';
import ProductsList from '../components/productsList/productsList';
import CategoryNav from '../components/categoryNav/categoryNav';
import Preloader from '../components/preloader/preloader';

import {useState, useEffect} from 'react';

interface ProductsProps {
  categories: string[];
}

export default function Products({categories}: ProductsProps) {
  const [currentName, setCurrentName] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  function handleNavClick(name:string) {
    setCurrentName(name);
  }
  
  const categoryNames = categories;
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    console.log('use effect on mounting');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getProducts(currentName);
    console.log('use effect');
  }, [currentName]);

  function getProducts(categoryName:string) {
    const endPoint = categoryName === 'all' 
      ? 'https://fakestoreapi.com/products'
      : 'https://fakestoreapi.com/products/category/' + categoryName;
  
    fetch(endPoint)
      .then(res => {
        if (!res.ok) throw new Error(res.status.toString())
        return res.json();
      })
      .then(d => {
        setIsLoading(false);
        setProductsData(d);
      })
      .catch(err => console.log('Error with status code: ' + err.message));
  }

  return (
    <main>
      {isLoading && <Preloader/>}
      <h3>Product Category: 
        <i className={s.current_category}>{currentName}</i>
      </h3><br/><br/>

      <CategoryNav 
        names={categoryNames} 
        currentName={currentName}
        onNavClick={handleNavClick}
      />

      <div style={{position: 'relative'}}>
        <ProductsList productsData={productsData}/>
      </div>

      <br/>
      <Link href="/">back to Home Page</Link>
    </main>
  )
}

export async function getServerSideProps() {
  const endPoint = 'https://fakestoreapi.com/products/categories';
  const res = await fetch(endPoint);
  const categoryNames = await res.json();

  return {
    props: {
      categories: categoryNames
    }
  }
}