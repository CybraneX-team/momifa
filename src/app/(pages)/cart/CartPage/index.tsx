'use client'

import React, { Fragment, useState } from 'react'
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

  const [showCardDetails, setShowCardDetails] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')

  const addresses = [
    { id: '1', address: 'sector 123, Lalbagh, Bangalore 560027' },
    { id: '2', address: 'sector 123, Lalbagh, Bangalore 560027' },
  ]
  const handleNextClick = () => {
    if (selectedAddress) {
      setShowCardDetails(true)
    } else {
      alert('Please select an address before proceeding.')
    }
  }

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
            <div className="flex flex-col justify-center items-center mt-16 bg-[#19191974] backdrop-blur-0 h-[600px] w-full px-10 pr-20 py-3 rounded-xl border border-[#3e3e3ee8]">
              <h1 className="text-white text-3xl font-semibold">Oops..Your cart is empty :(</h1>
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/${productsPage.slug}`}
                    className="text-white mt-10 text-base hover:underline"
                  >
                    Click here to shop
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
            <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-[55%_1fr] gap-5 mt-16 bg-transparent lg:bg-[#19191974] lg:backdrop-blur-sm h-[600px] w-full px-3 md:px-10 pr-22 py-3 rounded-xl lg:border border-[#3e3e3ee8]">
              <div className="flex flex-col h-full">
                <Link href={`/`}>
                  <p className="text-[#BDBDBD] md:text-white md:text-sm flex items-center pb-3 pt-2 cursor-pointer border-[#4a4a4ae8] font-bold">
                    <span className="inline-flex mr-3 p-2 md:p-4 bg-[#494949] rounded-full">
                      <Image
                        src="/assets/icons/arrow-left.svg"
                        alt="minus"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="border-b-2 border-[#3e3e3ee8] w-full pb-1">
                      Continue shopping
                    </span>
                  </p>
                </Link>
                <p className="text-white text-xl md:text-2xl mt-2 font-bold">Your Cart</p>
                <p className="text-[#BDBDBD] text-sm mt-2 mb-2 md:mb-4">
                  You have {cartLength} items in your cart
                </p>

                <ul
                  className=" flex flex-row overflow-x-auto lg:flex-col lg:flex-grow lg:overflow-y-auto pr-4"
                  style={{
                    height: '300px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta },
                      } = item
                      const metaImage = meta?.image
                      return (
                        <CartItem
                          key={id}
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

              <div
                className="flex flex-col h-full px-4 py-2 rounded-xl min-h-80 xl:w-[24rem] border-2 border-[#3e3e3ee8] -mt-32 lg:-mt-0"
                style={{
                  background: 'linear-gradient(to bottom, #0000008d 65%, #7d72a847 100%)',
                }}
              >
                <div className="flex flex-col p-3 pt-5 ">
                  {!showCardDetails ? (
                    <div className="flex flex-col p-3 pt-5  border-[#252525] ">
                      <h2 className="text-[#BDBDBD] font-semibold mb-4">Select Address</h2>
                      {addresses.map(addr => (
                        <label key={addr.id} className="flex items-center mb-5 text-white">
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddress === addr.id}
                            onChange={() => setSelectedAddress(addr.id)}
                            className="mr-2"
                          />
                          {addr.address}
                        </label>
                      ))}
                      <h3 className="text-[#BDBDBD] -mt-3 text-sm pb-3">
                        Or add address{' '}
                        <span className="inline-flex underline cursor-pointer">here</span>
                      </h3>
                      <div className="hidden lg:block">
                        <div className="flex justify-between items-center border-t border-[#252525] pt-5 ">
                          <h6 className="text-white pt-1">Subtotal</h6>
                          <p className="text-white">$0</p>
                        </div>

                        <div className="flex justify-between items-center pt-1 ">
                          <p className="text-white">Delivery Charge</p>
                          <p className="text-white">$0</p>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                          <p className="text-white">Grand Total</p>
                          <p className="text-white">{cartTotal.formatted}</p>
                        </div>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-12"
                        label="Next"
                        onClick={handleNextClick}
                      />
                    </div>
                  ) : (
                    <div className="pb-3 ">
                      <div className="flex items-center">
                        <button
                          className="cursor-pointer duration-200 hover:scale-125 active:scale-100 -mt-3 "
                          title="Go Back"
                          onClick={() => setShowCardDetails(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            className="stroke-blue-300"
                          >
                            <path
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="1.5"
                              d="M11 6L5 12M5 12L11 18M5 12H19"
                            ></path>
                          </svg>
                        </button>

                        <h2 className="hidden lg:flex text-[#BDBDBD] font-semibold ml-2 -mt-3">
                          Card Type
                        </h2>
                        <h2 className="text-[#BDBDBD] font-semibold ml-2 -mt-3 lg:hidden">
                          Payment methods
                        </h2>
                      </div>
                      <div className="lg:flex items-center justify-center -mx-3 hidden ">
                        <button className="bg-transparent border border-[#252525] rounded-lg py-1.5 px-6 flex flex-grow mx-2  justify-center">
                          <svg
                            width="30"
                            height="8"
                            viewBox="0 0 30 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-2"
                          >
                            <path
                              d="M13.0792 7.27046H10.7444L12.2036 0.67633H14.5387L13.0792 7.27046ZM8.78019 0.67633L6.55425 5.21183L6.29086 4.23516L6.2911 4.23551L5.50546 1.27006C5.50546 1.27006 5.41046 0.67633 4.39789 0.67633H0.717985L0.674805 0.787984C0.674805 0.787984 1.80013 0.96014 3.11712 1.5417L5.14562 7.27064H7.57834L11.293 0.67633H8.78019ZM27.1449 7.27046H29.2888L27.4196 0.676154H25.5427C24.676 0.676154 24.4649 1.16757 24.4649 1.16757L20.9826 7.27046H23.4166L23.9033 6.29098H26.8714L27.1449 7.27046ZM24.5757 4.93789L25.8025 2.47021L26.4927 4.93789H24.5757ZM21.1652 2.26207L21.4984 0.846016C21.4984 0.846016 20.4702 0.558502 19.3984 0.558502C18.2397 0.558502 15.4882 0.93086 15.4882 2.7415C15.4882 4.44506 18.7176 4.46623 18.7176 5.36105C18.7176 6.25587 15.8209 6.09554 14.865 5.53127L14.5179 7.01188C14.5179 7.01188 15.5604 7.38424 17.1533 7.38424C18.7466 7.38424 21.1503 6.77763 21.1503 5.12663C21.1503 3.41213 17.8919 3.2525 17.8919 2.50707C17.8921 1.76148 20.1661 1.85726 21.1652 2.26207Z"
                              fill="#2566AF"
                            />
                          </svg>
                        </button>
                        <button className="bg-transparent border border-[#252525] rounded-lg py-1.5 px-6 flex flex-grow mx-2 justify-center">
                          <svg
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-2"
                          >
                            <path
                              d="M8.74457 4.9711C8.74457 7.29092 6.86398 9.17151 4.54416 9.17151C2.22434 9.17151 0.34375 7.29092 0.34375 4.9711C0.34375 2.65128 2.22434 0.770691 4.54416 0.770691C6.86398 0.770691 8.74457 2.65128 8.74457 4.9711Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M13.9619 4.9711C13.9619 7.29092 12.0813 9.17151 9.7615 9.17151C7.44168 9.17151 5.56109 7.29092 5.56109 4.9711C5.56109 2.65128 7.44168 0.770691 9.7615 0.770691C12.0813 0.770691 13.9619 2.65128 13.9619 4.9711Z"
                              fill="#F79E1B"
                              fillOpacity="0.82"
                            />
                          </svg>
                        </button>
                        <button className="bg-transparent border border-[#252525] rounded-lg py-1.5 px-6 flex flex-grow mx-2 justify-center">
                          <div className=" py-1.5">
                            <img src="/media/paypal.png" alt="" className="w-12" />
                          </div>
                        </button>
                      </div>

                      <div className="flex flex-col flex-grow mt-4">
                        <h2 className="text-[#BDBDBD] font-semibold text-sm">Card Holder</h2>
                        <input
                          type="text"
                          name="cardName"
                          className={`flex-grow bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 `}
                        />
                      </div>
                      <div className="flex flex-col flex-grow mt-3">
                        <h2 className="text-[#BDBDBD] font-semibold text-sm">Card Number</h2>
                        <input
                          name="cardNumber"
                          type="text"
                          className={`flex-grow bg-transparent rounded-lg border placeholder:text-[#777777] border-[#252525]  focus:outline-none p-2 `}
                        />
                      </div>

                      <div className="flex flex-grow items-center mt-3">
                        <div className="flex flex-col flex-grow min-w-0 mr-2">
                          <h2 className="text-[#BDBDBD] font-semibold text-sm">Expiry</h2>
                          <input
                            type="text"
                            name="expiryDate"
                            className={`  bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 `}
                          />
                        </div>

                        <div className="flex flex-col flex-grow ml-2 min-w-0 ">
                          <h2 className="text-[#BDBDBD] font-semibold text-sm">CVV</h2>
                          <input
                            type="text"
                            name="cvv"
                            className={` bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2`}
                          />
                        </div>
                      </div>
                      <div className="hidden lg:block">
                        <div className="flex justify-between items-center  pt-2 ">
                          <h6 className="text-white pt-1">Subtotal</h6>
                          <p className="text-white">$0</p>
                        </div>

                        <div className="flex justify-between items-center pt-1 ">
                          <p className="text-white">Delivery Charge</p>
                          <p className="text-white">$0</p>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                          <p className="text-white">Grand Total</p>
                          <p className="text-white">{cartTotal.formatted}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {showCardDetails && (
                    <Button
                      className="hidden lg:block bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-2"
                      href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                      label={user ? 'Proceed' : 'Login to checkout'}
                    />
                  )}
                </div>
              </div>

              <div className="lg:hidden border-2 border-[#252525] rounded-lg p-3 mb-3">
                <h2 className=" text-[#ffffff] font-semibold ">Price breakdown</h2>
                <div className="flex justify-between items-center  ">
                  <h6 className="text-white pt-1">Subtotal</h6>
                  <p className="text-white">$0</p>
                </div>

                <div className="flex justify-between items-center pt-1 ">
                  <p className="text-white">Delivery Charge</p>
                  <p className="text-white">$0</p>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <p className="text-white">Grand Total</p>
                  <p className="text-white">{cartTotal.formatted}</p>
                </div>
              </div>
              {showCardDetails && (
                <Button
                  className="lg:hidden bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-2"
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Proceed' : 'Login to checkout'}
                />
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
