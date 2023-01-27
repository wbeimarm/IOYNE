import { useState } from 'react'
import initialState from '../initialState'

const useInitialState = () => {
  const [state, setState] = useState(initialState)

  const addToCart = payload => {
    const newCartItems = state.cart.find((x) => x.id === payload.id)
    if (newCartItems !== undefined) {
      setState({
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, count: item.count + 1, total: item.price * (item.count + 1) }
            : item
        )
      })
    } else {
      setState({
        ...state,
        cart: [...state.cart, { ...payload, count: 1, total: payload.price * 1 }]
      })
    }
  }

  const removeFromCart = payload => {
    const deleteCartItems = state.cart.find((x) => x.id === payload.id)
    const count = deleteCartItems.count
    if (count === 1) {
      setState({
        ...state,
        cart: state.cart.filter(items => items.id !== payload.id)
      })
    } else {
      setState({
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, count: item.count - 1, total: item.price * (item.count - 1) }
            : item
        )
      })
    }
  }

  return {
    addToCart,
    removeFromCart,
    state
  }
}

export default useInitialState