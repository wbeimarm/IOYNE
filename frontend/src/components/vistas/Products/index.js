import React, { useContext, useEffect, useState } from 'react'
import Product from '../Product'
import AppContext from '../../../context/AppContext'

const Products = () => {
  const { state, addToCart } = useContext(AppContext)
  const [ products, setProducts ] = useState([])
  // const { products } = state 

  useEffect(()=>{
    setProducts([
      {
        id: 1,
        image: 'https://depor.com/resizer/dFX3j034-CJgT9Mpb4d5sVopRp4=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5UUV6NB7PJHALDU7WOFJBGKKH4.jpg',
        name: 'Goku',
        price: 20,
        count: 1
      },
      {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlgAsEAy-_GqWuJvKxpAzUgkcGrwzkKxWjz95XsxuqYTNxSvd5LZC49aIjOTPpxChwu18&usqp=CAU',
        name: 'Vegeta',
        price: 25,
        count: 1
      },
      {
        id: 3,
        image: 'https://www.tboenclase.com/wp-content/uploads/2020/06/saint-seiya-min.jpg',
        name: 'Caballeros del zodiaco',
        price: 10,
        count: 1
      },
      {
        id: 4,
        image: 'https://www.latercera.com/resizer/qR7ZPoDdiXRhM4pXWVj5ixl2zUo=/arc-anglerfish-arc2-prod-copesa/public/FFY242JNJVAHDONFU3QTHYONAU.jpg',
        name: 'Oliver atom',
        price: 5,
        count: 1
      },
      {
        id: 1,
        image: 'https://i.ytimg.com/vi/W5NPt1eH98U/hqdefault.jpg',
        name: 'cuentos de los hermanos grimm',
        price: 20,
        count: 1
      },
      {
        id: 2,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049120/miniuns_vl61xm.jpg',
        name: 'Minions',
        price: 25,
        count: 1
      },
      {
        id: 3,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049184/rapidoyfurioso_iok3zj.webp',
        name: 'Fast and Furious',
        price: 10,
        count: 1
      },
      {
        id: 4,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049259/anillo_z0h7g6.jpg',
        name: 'The Lord of the Rings',
        price: 5,
        count: 1
      },
      {
        id: 1,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664048794/starwars_ymtvkm.jpg',
        name: 'Star Wars',
        price: 20,
        count: 1
      },
      {
        id: 2,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049120/miniuns_vl61xm.jpg',
        name: 'Minions',
        price: 25,
        count: 1
      },
      {
        id: 3,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049184/rapidoyfurioso_iok3zj.webp',
        name: 'Fast and Furious',
        price: 10,
        count: 1
      },
      {
        id: 4,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049259/anillo_z0h7g6.jpg',
        name: 'The Lord of the Rings',
        price: 5,
        count: 1
      },
      {
        id: 1,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664048794/starwars_ymtvkm.jpg',
        name: 'Star Wars',
        price: 20,
        count: 1
      },
      {
        id: 2,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049120/miniuns_vl61xm.jpg',
        name: 'Minions',
        price: 25,
        count: 1
      },
      {
        id: 3,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049184/rapidoyfurioso_iok3zj.webp',
        name: 'Fast and Furious',
        price: 10,
        count: 1
      },
      {
        id: 4,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049259/anillo_z0h7g6.jpg',
        name: 'The Lord of the Rings',
        price: 5,
        count: 1
      },
      {
        id: 1,
        image: 'https://res.cloudinary.com/drqk6qzo7/image/upload/v1664048794/starwars_ymtvkm.jpg',
        name: 'Star Wars',
        price: 20,
        count: 1
      },                        
    ])
  }, [])



  const handleAddToCart = product => () => {
    const exists = state.cart.filter((item) => item.id === product.id)
    if (exists.length === 0) {
      addToCart(product)
    } else {
      alert('the product already exists in the cart')
    }
  }

  return (
     <>
      {products.map(product => (
        <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />
      ))}
     </>
  )
}

export default Products
