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
    <li className="grid grid-cols-[120px_1fr] mr-3 lg:my-3 bg-gradient-to-r from-[#0000008c] to-[#7d72a847] lg:bg-[#060606b9] lg:bg-none  border border-[#3e3e3ee8] rounded-xl min-w-96 h-fit">
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

      <div className="flex flex-col lg:flex-row items-center lg:justify-between p-3 gap-4 ">
        <div className="flex items-center justify-between">
          <h6 className="text-white font-medium overflow-ellipsis max-w-48 ">{title}</h6>{' '}
          <div className="md:hidden">
            <RemoveFromCartButton product={product} />
          </div>
          <Price product={product} button={false} />
        </div>

        <div className="flex items-center justify-between mt-16 lg:mt-0">
          <div className=" lg:hidden text-white font-medium mr-10">299$</div>
          <div className=" rounded-md flex items-center h-[30px] max-w-[100px] w-full">
            <div
              className="flex lg:bg-[#292929b9] rounded-md -py-2  items-center w-[30px] lg:w-[40px] h-full cursor-pointer "
              onClick={decrementQty}
            >
              <Image src="/assets/icons/minus.svg" alt="minus" width={20} height={20} />
            </div>

            <input
              type="text"
              className="text-center text-white mx-  bg-transparent rounded-md h-full w-full min-w-[30px] border-none outline-none font-bold text-base"
              value={quantity}
              onChange={enterQty}
            />

            <div
              className=" flex  lg:bg-[#292929b9] rounded-md  items-center lg:w-[40px] h-full cursor-pointer"
              onClick={incrementQty}
            >
              <Image src="/assets/icons/plus.svg" alt="plus" width={25} height={25} />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex text-white font-medium">299$</div>
        <div className="hidden lg:flex">
          <RemoveFromCartButton product={product} />
        </div>
      </div>
    </li>
  )
}

export default CartItem
