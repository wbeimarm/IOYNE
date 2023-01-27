import React from 'react'
import Base from '../../layout/Base/normal';
import Products from '../Products'
import initialState from '../../../initialState'
import Cart from '../Cart'

export default function Home() {
    return (
        <Base>
            <Products products={initialState.products} />
            <Cart />
        </Base>
    )
}