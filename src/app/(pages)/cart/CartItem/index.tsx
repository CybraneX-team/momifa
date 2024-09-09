import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  return (
    <li className="grid grid-cols-[120px_1fr] my-5 bg-[#212121b9] rounded-xl shadow-lg shadow-[#000000]">
      <Link
        href={`/products/${product.slug}`}
        className="relative min-h-[100px] min-w-[120px] p-3 rounded-xl"
      >
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className="relative h-full w-full rounded-xl"
            imgClassName="object-cover w-full rounded-xl aspect-square"
            resource={metaImage}
            fill
          />
        )}
      </Link>

      <div className="flex flex-col justify-between p-3 gap-4">
        <div>
          <h6 className="text-white font-medium overflow-ellipsis">{title}</h6>
          <Price product={product} button={false} />
        </div>

        <div className="flex items-center justify-between">
          <div className=" rounded-md flex items-center h-[45px] max-w-[100px] w-full">
            <div
              className="flex justify-center items-center w-full h-full cursor-pointer "
              onClick={decrementQty}
            >
              <Image src="/assets/icons/minus.svg" alt="minus" width={24} height={24} />
            </div>
            <input
              type="text"
              className="text-center text-white bg-[#292929b9] rounded-md h-full w-full min-w-[30px] border-none outline-none font-bold text-base"
              value={quantity}
              onChange={enterQty}
            />
            <div
              className="flex justify-center items-center w-full h-full cursor-pointer"
              onClick={incrementQty}
            >
              <Image src="/assets/icons/plus.svg" alt="plus" width={24} height={24} />
            </div>
          </div>
          <RemoveFromCartButton product={product} />
        </div>
      </div>
    </li>
  )
}

export default CartItem
