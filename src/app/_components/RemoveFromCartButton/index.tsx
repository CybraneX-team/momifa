import React from 'react'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
  size : string
}> = props => {
  const { className, product, size } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product, size)

  if (!productIsInCart) {
    return <div>Item is not in the cart</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        const initializedData = localStorage.getItem(`${product.id}-initializedData`);
        if (initializedData) {
          console.log("Data exists in localStorage:", initializedData);
        }
        localStorage.removeItem(`${product.id}-initializedData`)
        deleteItemFromCart(product, size)
      }}
      className={[className, classes.removeFromCartButton].filter(Boolean).join(' ')}
    >
      <Image
        src="./assets/icons/delete.svg"
        alt="delete"
        width={24}
        height={24}
        className={classes.qtnBt}
      />
    </button>
  )
}