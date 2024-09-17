'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { useTheme } from '../../../_providers/Theme'
import cssVariables from '../../../cssVariables'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [clientSecret, setClientSecret] = React.useState()
  const hasMadePaymentIntent = React.useRef(false)
  const { theme } = useTheme()

  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  useEffect(() => {
    if (user && cart && hasMadePaymentIntent.current === false) {
      hasMadePaymentIntent.current = true

      const makeIntent = async () => {
        try {
          const paymentReq = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
            {
              method: 'POST',
              credentials: 'include',
            },
          )

          const res = await paymentReq.json()

          if (res.error) {
            setError(res.error)
          } else if (res.client_secret) {
            setError(null)
            setClientSecret(res.client_secret)
          }
        } catch (e) {
          setError('Something went wrong.')
        }
      }

      makeIntent()
    }
  }, [cart, user])

  if (!user || !stripe) return null

  const [activeButton, setActiveButton] = useState('shipping')
  const [inputs, setInputs] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    fullName: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const getInputClass = (value: string) => {
    return value ? 'text-white border-[#fff]' : 'text-[#777777] border-[#252525]'
  }

  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#0e0e0ea5] rounded-2xl  text-white min-h-screen min-w-full w-full">
        <div className="md:w-full p-8 mt-10">
          <h1 className="text-3xl font-semi-bold mb-8">Check-out</h1>

          {cartIsEmpty && (
            <div>
              {'Your '}
              <Link href="/cart" className="text-blue-400 hover:underline">
                cart
              </Link>
              {' is empty.'}
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`} className="text-blue-400 hover:underline">
                    Continue shopping?
                  </Link>
                </Fragment>
              )}
            </div>
          )}

          {!cartIsEmpty && (
            <Fragment>
              <h3 className="text-xl font-medium mb-4">Your preferred Payment Method</h3>
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center ">
                  <div className="flex flex-col md:flex-grow w-full">
                    <label htmlFor="Credit card" className="text-[#606060]">
                      Credit/Debit Card
                    </label>
                    <input
                      name="cardNumber"
                      type="text"
                      placeholder="0000 1234 5678 9012"
                      className={`flex-grow bg-transparent rounded-lg border  placeholder:text-[#777777] border-[#252525]  focus:outline-none p-2 ${getInputClass(
                        inputs.cardNumber,
                      )}`}
                      value={inputs.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col md:flex-grow w-full">
                    <label htmlFor="Credit card" className="text-[#606060]">
                      Name on card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      className={`flex-grow bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 ${getInputClass(
                        inputs.cardName,
                      )}`}
                      value={inputs.cardName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="Credit card" className="text-[#606060] text-base">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="02/28"
                      name="expiryDate"
                      className={` md:w-20   bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 ${getInputClass(
                        inputs.expiryDate,
                      )}`}
                      value={inputs.expiryDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="Credit card" className="text-[#606060] text-base">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      className={`md:w-16  w-full bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 ${getInputClass(
                        inputs.cvv,
                      )}`}
                      value={inputs.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 ">
                <div className="flex items-center justify-between space-x-2 p-2 bg-transparent border border-[#252525] rounded-lg md:w-1/2">
                  <span className="text-[#777777]">Shop Pay</span>
                  <img src="/apple-pay-logo.png" alt="Shop Pay" className="h-5 text-[#414141]" />
                </div>
                <div className="flex items-center justify-between space-x-2 p-2 bg-transparent border border-[#252525] rounded-lg md:w-1/2">
                  <span className="text-[#777777]">PayPal</span>
                  <img src="/paypal-logo.png" alt="PayPal" className="h-5 text-[#414141]" />
                </div>
              </div>
            </Fragment>
          )}

          <div className="mt-16">
            <div className="flex space-x-8 mb-4 bg-[#202020] w-fit p-2 rounded-lg border border-[#161616]">
              <button
                onClick={() => setActiveButton('shipping')}
                className={`relative text-white p-1 rounded ${
                  activeButton === 'shipping' ? '' : ''
                }`}
              >
                Shipping
                {activeButton === 'shipping' && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#97A1FF] to-[#65FFDA] rounded-full transition-all duration-300"></span>
                )}
              </button>

              <button
                onClick={() => setActiveButton('pickup')}
                className={`relative text-white p-1 rounded ${activeButton === 'pickup' ? '' : ''}`}
              >
                Pickup
                {activeButton === 'pickup' && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#97A1FF] to-[#65FFDA] rounded-full transition-all duration-300"></span>
                )}
              </button>
            </div>
            <div className="flex flex-col md:flex-row space-x-4 items-center mt-10">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                className={`w-full bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none mb-4 md:mb-0 p-2 ${getInputClass(
                  inputs.fullName,
                )}`}
                value={inputs.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                className={`w-full bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none  p-2 ${getInputClass(
                  inputs.address,
                )}`}
                value={inputs.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="md:w-full bg-[#000000] p-8 m-5 border border-[#252525] rounded-lg">
          <h2 className="text-xl font-medium mb-14">Cart Summary</h2>
          {!cartIsEmpty && (
            <ul className="space-y-2 flex flex-col justify-center">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object' && item.quantity) {
                  return (
                    <li key={index} className="flex justify-between">
                      <span className="text-[#B7B7B7]">{item.product.title}</span>
                      {/* <span>${item.product.price * item.quantity}</span> */}
                    </li>
                  )
                }

                return null
              })}
              <li>
                <span className="text-[#B7B7B7]">taxes</span>
              </li>
            </ul>
          )}
          <div className="border-t border-gray-700 mt-4 pt-4">
            <div className="flex justify-between">
              <span>Grand Total</span>
              <span>{cartTotal.formatted}</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded mt-8">
            Pay {cartTotal.formatted}
          </button>
        </div>

        {/* {!clientSecret && !error && (
          <div className="w-full p-8">
            <LoadingShimmer number={2} />
          </div>
        )} */}
      </div>
      {!clientSecret && error && (
        <div className="w-full p-8">
          <p className="text-red-500 mb-4">{`Error: ${error}`}</p>
          <Button label="Back to cart" href="/cart" appearance="secondary" />
        </div>
      )}
    </>
  )
}
