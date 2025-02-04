'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
  appearance?: Props['appearance']
  size?: string
}> = props => {
  const { product, quantity = 1, className, appearance = 'primary', size } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>()
  const [animate, setAnimate] = useState<boolean>(false) // State for animation
  const [reset, setReset] = useState<boolean>(false) // State for reset animation
  const router = useRouter()

  useEffect(() => {
    
    setIsInCart(isProductInCart(product, size))
  }, [isProductInCart, product, cart, size])
  console.log("isProductInCart(product, size)", isProductInCart(product, size)) 
  const handleClick = () => {
    if (!isInCart) {
      addItemToCart({
        product,
        quantity,
        size
      })

      setAnimate(true) 
      setTimeout(() => {
        setAnimate(false) 
        setReset(true) 
        setTimeout(() => setReset(false), 300) 
      }, 300)

      // router.push('/cart')
    }
  }

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `View in cart ✓` : `Add to cart`}
      el={isInCart ? 'button' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
        animate && classes.animate, // Apply slide-up animation class
        reset && classes.reset, // Apply slide-down animation class
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={!isInCart ? handleClick : undefined}
    />
  )
}