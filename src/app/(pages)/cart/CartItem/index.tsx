import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { ChevronDown, ChevronRight } from 'lucide-react'
import styles from './index.module.scss'
const CartItem = ({ product, title, metaImage, qty, addItemToCart, size }) => {
  const [quantity, setQuantity] = useState(qty)
  const [showDropdownContent, setShowDropdownContent] = useState(false)
  const [sizee, setsizee] = useState(size)

  const decrementQty = () => {
    const updatedQty = Math.max(quantity - 1, 1) // Prevent going below 1
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: updatedQty })
    setsizee(sizee)
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: updatedQty })
  }

  const enterQty = e => {
    const updatedQty = Math.max(Number(e.target.value), 1) || 1
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: updatedQty })
  }

  return (
    <li className="grid grid-cols-[120px_1fr] mr-3 lg:my-3 bg-gradient-to-r from-[#0000008c] to-[#7d72a847] lg:bg-[#060606b9] lg:bg-none border border-[#3e3e3ee8] rounded-xl min-w-96 h-fit">
      <Link
        href={`/products/${product.slug}`}
        className="relative min-h-[100px] min-w-[120px] p-3 rounded-xl"
      >
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className="relative lg:h-full h-[100%] w-full rounded-xl"
            imgClassName="object-cover w-full rounded-xl aspect-square"
            resource={metaImage}
            fill
          />
        )}
      </Link>

      <div className="flex flex-col lg:flex-row items-center lg:justify-between p-3 gap-4">
        <div className="flex items-center justify-between">
          <h6 className="text-white font-medium overflow-ellipsis max-w-48">{title}</h6>
          <div className="md:hidden">
            <RemoveFromCartButton product={product} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-16 lg:mt-0">
          <div className="lg:hidden text-white font-medium mr-10">299$</div>
          <div className="rounded-md flex items-center h-[30px] max-w-[100px] w-full -ml-3">
            <div
              className="flex lg:bg-[#292929b9] rounded-md items-center w-[30px] lg:w-[40px] h-full cursor-pointer"
              onClick={decrementQty}
            >
              <Image src="/assets/icons/minus.svg" alt="minus" width={20} height={20} />
            </div>

            <input
              type="number"
              className="text-center text-white bg-transparent rounded-md h-full w-full min-w-[30px] border-none outline-none font-bold text-base"
              value={quantity}
              onChange={enterQty}
            />

            <div
              className="flex lg:bg-[#292929b9] rounded-md items-center  -ml-3 lg:w-[40px] h-full cursor-pointer"
              onClick={incrementQty}
            >
              <Image src="/assets/icons/plus.svg" alt="plus" width={25} height={25} />
            </div>
          </div>
        </div>

        <h2 className="hidden lg:flex text-white font-medium -ml-2">
          <Price product={product} button={false} />
        </h2>
        <div className="hidden lg:flex w-10">
          <RemoveFromCartButton product={product} />
        </div>
        <div
          className="flex items-center cursor-pointer text-white text-3xl"
          onClick={() => setShowDropdownContent(prev => !prev)}
        >
          {showDropdownContent ? <ChevronDown /> : <ChevronRight />}
        </div>

        {/* <div className="hidden lg:flex">
          <RemoveFromCartButton product={product} />
        </div> */}
      </div>
      {showDropdownContent ? (
        <div>
          <hr className={styles.cartHR} />
          <h3 className={styles.h3desc}> Description:</h3>
          <p className={styles.cartpara}> {product.meta.description} </p>
          <h3 className={styles.sizeSelected}>Size Selected:</h3>
          <p className={styles.cartSize}>
            {sizee ? sizee.split(':')[0] : ' '} :
            <span className={styles.sizeVal}>{sizee ? sizee.split(':')[1] : ''}</span>
          </p>
        </div>
      ) : (
        <></>
      )}
    </li>
  )
}

export default CartItem
