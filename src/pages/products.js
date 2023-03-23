import s from '../styles/ProductsPage.module.sass'
import TopBar from '../components/topBar/topBar'

import Link from 'next/link';
import ProductsList from '../components/productsList/productsList';
import CategoryNav from '../components/categoryNav/categoryNav';
import Preloader from '../components/preloader/preloader';

import {useState, useEffect} from 'react';

// DATA STRUCTURE -------
// const data = {
//   id: 1,
//   title: "",
//   price: 109.95,
//   description: "",
//   category: "",
//   image: "https://fakestoreapi.com/img/x.jpg",
//   rating: {
//       "rate": 3.5,
//       "count": 120
//   }
// };
// -----------------------

export default function Products({categories}) {
  const [currentName, setCurrentName] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  function handleNavClick(name) {
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

  function getProducts(categoryName) {
    const endPoint = categoryName === 'all' 
      ? 'https://fakestoreapi.com/products'
      : 'https://fakestoreapi.com/products/category/' + categoryName;
  
    fetch(endPoint)
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json();
      })
      .then(d => {
        setIsLoading(false);
        setProductsData(d);
      })
      .catch(err => console.log('Error with status code: ' + err.message));
  }

  return (
    <>
      <TopBar/>

      {isLoading && <Preloader/>}
      <h3>Products: 
        <i className={s.current_category}>{currentName}</i>
      </h3>
      
      <br/>
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
    </>
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