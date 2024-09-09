'use client'

import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()
  let cartLength = cart.items.length

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className="flex justify-center items-center h-full">
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className="flex flex-col items-center text-4xl text-white justify-center mt-20 text-center">
              Oops..Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/${productsPage.slug}`}
                    className="text-white mt-10 text-base hover:underline"
                  >
                    Click here
                  </Link>
                  {` to shop.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/login?redirect=%2Fcart`}
                    className="text-primary-500 hover:underline"
                  >
                    Log in
                  </Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-10 mt-20 bg-[#232323b9] p-10 rounded-[50px]">
              <div>
                {/* CART LIST HEADER */}
                <Link href={`/`}>
                  <p className="text-white text-base flex items-center pb-6 border-b cursor-pointer border-[#4a4a4ae8]">
                    <span className="inline-flex mr-2">
                      <Image
                        src="/assets/icons/arrow-left.svg"
                        alt="minus"
                        width={24}
                        height={24}
                        color="white"
                      />
                    </span>
                    Continue shopping
                  </p>
                </Link>
                <p className="text-white text-3xl mt-5">Shopping Cart</p>
                <p className="text-[#666] text-sm mt-1">You have {cartLength} items in your cart</p>

                {/* CART ITEM LIST */}
                <ul className="mt-8">
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className="bg-black p-7 flex flex-col gap-4 justify-center rounded-3xl">
                <div className="flex justify-between items-center border-b border-dark-50 pb-4 ">
                  <h6 className="text-white">Summary</h6>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-dark-50">
                  <p className="text-white">Delivery Charge</p>
                  <p className="text-white">$0</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-white">Grand Total</p>
                  <p className="text-white">{cartTotal.formatted}</p>
                </div>

                <Button
                  className="bg-[#1b1b1b] text-white py-3 px-6 rounded-md mt-16"
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
