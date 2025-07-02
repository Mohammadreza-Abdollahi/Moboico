'use client'

import { useEffect, useState } from "react";

const ShopPage = () => {
  const [products , setProducts] = useState([]);
  useEffect(()=>{
    fetch("/api/products")
    .then(res=>res.json())
    .then(data=>setProducts(data))
  },[])
  return <>
    <section>
        <h1 className="text-3xl">سلاااام اینجا فروشگاهه</h1>
        {
          products.map(item=> <h1>{item.title}</h1>)
        }
    </section>
  </>;
};

export default ShopPage;
