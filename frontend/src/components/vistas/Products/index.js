import React, { useContext } from 'react'
import Product from '../Product'
import AppContext from '../../../context/AppContext'

const Products = ({products}) => {
  const { addToCart } = useContext(AppContext)
  const token = sessionStorage.getItem("token")
  if(products.length === 0 && token) {
    let productsTemp = sessionStorage.getItem("products");
    if(productsTemp) {
      products = JSON.parse(sessionStorage.getItem("products"));
    }
  }

    const handleAddToCart = (e) => {
      addToCart(e)
    }
  return (
     <>
      {products.map(product => (
        <Product  key={product.productoId.toString()} product={product} handleAddToCart={handleAddToCart} />
      ))}
     </>
  )
}


export default Products
