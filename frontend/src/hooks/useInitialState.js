import { useState } from 'react'
import initialState from '../initialState'

const useInitialState = () => {
  const [state, setState] = useState(initialState)

  const addToCart = payload => {
    const newCartItems = state.cart.find((x) => x.productoId === payload.productoId)
    if (newCartItems !== undefined) {
      setState({
        ...state,
        cart: state.cart.map((item) =>
          item.productoId === payload.productoId
            ? { ...item, count: item.count + 1, total: item.valorVenta * (item.count + 1) }
            : item
        )
      })
    } else {
      setState({
        ...state,
        cart: [...state.cart, { ...payload, count: payload.count === undefined ? 1 : payload.count, total: payload.valorVenta * (payload.count === undefined ? 1 : payload.count) }]
      })
    }
  }

  const removeFromCart = payload => {
    const deleteCartItems = state.cart.find((x) => x.productoId === payload.productoId)
    if (deleteCartItems != undefined && deleteCartItems.count === 1) {
      setState({
        ...state,
        cart: state.cart.filter(items => items.productoId !== payload.productoId)
      })
    } else {
      setState({
        ...state,
        cart: state.cart.map((item) =>
          item.productoId === payload.productoId
            ? { ...item, count: item.count - 1, total: item.valorVenta * (item.count - 1) }
            : item
        )
      })
    }
  }

  const removeState = payload => {
      setState({
        discount: [],
        cart: [],
        products: [],
      })
  }  



  return {
    addToCart,
    removeFromCart,
    removeState,
    state
  }
}

export default useInitialState