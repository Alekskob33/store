import s from '@/styles/Create.module.sass'
import Image from 'next/image'
import {useState} from 'react'
import Link from 'next/link'

const initData = {
  title: '',
  price: 0,
  description: '',
  image: '',
  category: ''
}

export default function EditProduct({categories}) {
  const [productData, setProductData] = useState(initData);
  const [isCreated, setIsCreated] = useState(false);
  
  function handleChange(e) {
    const data = {...productData};
    const key = e.target.name;
    data[key] = e.target.value;
    
    setIsCreated(false);
    setProductData(data);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    const endPoint = `https://fakestoreapi.com/products`;
    const {title, price, description, image, category} = productData;
    const data = {
      method:"POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, price, description, image, category
      })
    };

    fetch(endPoint, data)
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        console.log('success');
        return res.json();
      })
      .then(data => {
        setProductData(data);
        setIsCreated(true);
      })
      .catch(err => {
        console.log('Error with status code: ' + err.message);
      })
  }

  function reset() {
    setProductData(initData);
    setIsCreated(false);
  }
  
  const imageURLPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  const isImageURL = (str) => !!str.match(imageURLPattern);
  
  if (isCreated) {
    return (
      <div className={s.container}>
        <p><span className={s.ok_icon}>✔</span>Product has been added.</p>
        <h4>Do you want to create new one?</h4><br/>
        <button className={s.btn_continue} onClick={reset}>Yes</button><br/>
        <Link href="/products">back to Products Page</Link>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Add new product:</h1>
      
      <div className={s.row}>
        <div className={s.image_wrapper}>
          <Image
            className={s.pic}
            src={isImageURL(productData.image) ? productData.image : '/placeholder.jpg'}
            width={250} height={250} alt={productData.title}
          />
          <p>Image URL:</p>
          <input 
            name="image"
            form="editForm"
            type="url" 
            value={productData.image}
            onChange={handleChange}
            pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
            required
            />
        </div>
        <form 
          className={s.form}
          onSubmit={handleSubmit}
          id="editForm"
        >
          <p>Category:</p>
          <select 
            name='category'
            value={productData.category}
            onChange={handleChange}>
            {categories.map((name, i) => (<option key={i} value={name}>{name}</option>))}
          </select>

          <p>Title:</p>
          <input 
            name="title"
            type="text" 
            value={productData.title} 
            onChange={handleChange}
            required
            />
          <p>Cost: $</p>
          <input 
            name="price"
            type="number" 
            value={(+productData.price).toFixed(2)}
            onChange={handleChange}
            step='0.01'
            min='0.1'
            required
            />
          <p>Description:</p>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            rows='5'
          />
          <button 
            className={s.btn_submit}
            disabled={isCreated}
            type="submit"
          >Create</button>
        </form>
      </div>
      <Link href="/products"/>
    </div>
  )
}

export async function getServerSideProps() {
  const categoriesEndPoint = 'https://fakestoreapi.com/products/categories';
  const categoriesRes = await fetch(categoriesEndPoint);
  const categories = await categoriesRes.json();

  return {
    props: {
      categories
    }
  }
}