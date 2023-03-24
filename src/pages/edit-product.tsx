import s from '@/styles/Edit.module.sass';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface Category {
  name: string;
}

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  [key: string]: string | number;
}

interface EditProductProps {
  categories: Category[];
  product: Product;
  id: number;
}

export default function EditProduct({ categories, product, id }: EditProductProps) {
  const [productData, setProductData] = useState<Product>(product);
  const [isUpdated, setIsUpdated] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const data = { ...productData };
    const key = e.target.name;
    data[key] = e.target.value;

    setIsUpdated(false);
    setProductData(data);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const endPoint = `https://fakestoreapi.com/products/${id}`;
    const { title, price, description, image, category } = productData;
    const data = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        description,
        image,
        category,
      }),
    };

    fetch(endPoint, data)
      .then((res) => {
        if (!res.ok) throw new Error(res.status.toString());
        console.log('success');
        return res.json();
      })
      .then((data) => {
        setProductData(data);
        setIsUpdated(true);
      })
      .catch((err) => {
        console.log('Error with status code: ' + err.message);
      });
  }

  const imageURLPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  const isImageURL = (str: string) => !!str.match(imageURLPattern);
  
  return (
    <div className={s.container}>
      <h1 className={s.title}>Edit the product:</h1>
      
      <div className={s.row}>
        <div className={s.image_wrapper}>
          <Image
            className={s.pic}
            src={isImageURL(productData.image) ? productData.image : ''}
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
            {categories.map((category: Category, i: number) => (<option key={i} value={category.name}>{category.name}</option>))}

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
            rows={5}
          />
          <button 
            className={s.btn_submit}
            disabled={isUpdated}
            type="submit"
          >Update</button>
          {isUpdated && <p><span className={s.ok_icon}>✔</span> Updated</p>}
        </form>
      </div>
      <Link href="/products"/>
    </div>
  )
}

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.query;

  const categoriesEndPoint = 'https://fakestoreapi.com/products/categories';
  const categoriesRes = await fetch(categoriesEndPoint);
  const categories = await categoriesRes.json();
  
  const productEndPointProduct = `https://fakestoreapi.com/products/${id}`;
  const productRes = await fetch(productEndPointProduct);
  const product = await productRes.json();

  return {
    props: {
      categories,
      product,
      id
    }
  }
}
