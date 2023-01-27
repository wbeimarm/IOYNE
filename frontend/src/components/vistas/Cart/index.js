import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../../context/AppContext'
import { Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'
const _ = require('underscore')

const Cart = () => {
  const { state, removeFromCart, addToCart } = useContext(AppContext)
  // const { cart } = state
  const [ cart, setCart ] = useState([])

  useEffect(()=>{
    setCart([])
  }, [])
  const handleRemove = (product) => {
    removeFromCart(product)
  }

  const handleSumTotal = () => {
    const cantidad = state.cart.length
    let total = 0
    let arrayDescount = []
    for (let n = 0; n < cantidad; n++) {
      arrayDescount.push(state.cart[n].id)
      total += state.cart[n].total
    }
    const [discountState] = state.discount
    let exist = discountState.m
    exist = exist.sort()
    arrayDescount = arrayDescount.sort()
    const existForDiscount = _.isEqual(exist, arrayDescount)
    if (existForDiscount) {
      let descuento = (discountState.discount)
      descuento = descuento.toFixed(2)
      total = total - descuento
    }
    return total
  }

  const incrementQuantity = (product) => {
    addToCart(product)
  }

  return (
    <div className="movies__cart">
    <CardContent>
      {/* {state.cart.map(x => ( */}
      {cart.map(x => (
        <Card key={uuidv4()} className="movies__cart-card">
          <ul>
            <li>
              ID: {x.id}
            </li>
            <li>
              Name: {x.name}
            </li>
            <li>
              Price: ${x.price}
            </li>
            <li>
              Total: ${x.total}
            </li>
          </ul>
          <div className="movies__cart-card-quantity">
            <button onClick={() => { handleRemove(x) }}>
              -
            </button>
            <span>
              {x.count}
            </span>
            <button onClick={() => incrementQuantity(x)}>
              +
            </button>
          </div>
        </Card>
      ))}
    </CardContent>
    {cart.length > 0 && (
      <div className="movies__cart-total">
        <p>Total: ${handleSumTotal()}</p>
      </div>
    )}
  </div>
  )
}

export default Cart
