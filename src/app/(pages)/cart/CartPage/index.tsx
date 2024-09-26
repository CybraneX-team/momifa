'use client'

import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion, AnimatePresence } from 'framer-motion'
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
import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()
  const [showSavedPayment, setShowSavedPayment] = useState(false)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState('')
  const [addresses, setAddresses] = useState([
    { id: '1', address: 'sector 123, Lalbagh, Bangalore 560027' },
    { id: '2', address: 'sector 123, Lalbagh, Bangalore 560027' },
  ])
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const savedPayments = [
    {
      id: 1,
      cardNumber: 'XXXX 1005',
      expiryDate: '10/25',
      cardType: 'Visa',
    },
    {
      id: 2,
      cardNumber: 'XXXX 1005',
      expiryDate: '10/25',
      cardType: 'Mastercard',
    },
    {
      id: 2,
      cardNumber: 'XXXX 1005',
      expiryDate: '10/25',
      cardType: 'Mastercard',
    },
  ]

  const handleNextClick = () => {
    if (selectedAddress) {
      setShowCardDetails(true)
      setShowSavedPayment(true)
    } else {
      toast.error('Please select an address before proceeding.', {
        className: 'bg-transparent',
      })
    }
  }

  const handleAddNewPayment = () => {
    setShowSavedPayment(false)
    setShowCardDetails(true)
  }

  const handleCardSelect = cardId => {
    setSelectedCard(cardId)
  }

  const handleAddAddress = () => {
    if (
      newAddress.street &&
      newAddress.city &&
      newAddress.state &&
      newAddress.postalCode &&
      newAddress.country
    ) {
      const newId = (addresses.length + 1).toString()
      const formattedAddress = `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.postalCode}, ${newAddress.country}`
      const newAddressObj = { id: newId, address: formattedAddress }
      setAddresses(prevAddresses => [...prevAddresses, newAddressObj])
      setSelectedAddress(newId)
      setShowAddAddress(false)
      setNewAddress({ street: '', city: '', state: '', postalCode: '', country: '' })
      toast.success('Address added successfully!', {
        className: 'bg-transparent',
      })
    } else {
      toast.error('Please fill all address fields.', {
        className: 'bg-transparent',
      })
    }
  }

  let cartLength = cart.items.length

  const slideAnimation = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <>
      <ToastContainer />
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
              <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-[55%_1fr] gap-5 mt-16 bg-transparent lg:bg-[#19191974] lg:backdrop-blur-sm h-[600px] w-full px-3 md:px-10 -pr-4 py-3 rounded-xl lg:border border-[#3e3e3ee8]">
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
                  className="flex flex-col h-full  px-2 py-2 rounded-xl min-h-1/2 xl:w-[26rem] border-2 border-[#3e3e3ee8] -mt-32 lg:-mt-0 "
                  style={{
                    background: 'linear-gradient(to bottom, #0000008d 65%, #7d72a847 100%)',
                  }}
                >
                  <motion.div className="flex flex-col p-3 pt-5 " {...slideAnimation}>
                    {showAddAddress && (
                      <motion.div {...slideAnimation}>
                        <h2 className="text-[#BDBDBD] font-semibold mb-4">Add New Address</h2>
                        <input
                          type="text"
                          placeholder="Street"
                          value={newAddress.street}
                          onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="bg-transparent border border-[#252525] rounded-lg p-2 mb-2 text-white w-full"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="bg-transparent border border-[#252525] rounded-lg p-2 mb-2 text-white w-full"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="bg-transparent border border-[#252525] rounded-lg p-2 mb-2 text-white w-full"
                        />
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={newAddress.postalCode}
                          onChange={e =>
                            setNewAddress({ ...newAddress, postalCode: e.target.value })
                          }
                          className="bg-transparent border border-[#252525] rounded-lg p-2 mb-2 text-white w-full"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={newAddress.country}
                          onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                          className="bg-transparent border border-[#252525] rounded-lg p-2 mb-2 text-white w-full"
                        />

                        <div className="flex justify-center items-center mb-3 mt-2">
                          <input
                            type="checkbox"
                            id="saveAddress"
                            // checked={saveAddress}
                            // onChange={() => setSaveAddress(!saveAddress)}
                            className="mr-2 accent-[#C71E90]"
                          />
                          <label htmlFor="saveAddress" className="text-[#BDBDBD]">
                            Save this information for next time
                          </label>
                        </div>
                        <div className="flex flex-col justify-center">
                          <Button
                            className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-2 w-full"
                            label="Add Address"
                            onClick={handleAddAddress}
                          />
                          <button
                            className="text-[#BDBDBD] mt-2 underline "
                            onClick={() => setShowAddAddress(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {!showCardDetails && !showAddAddress ? (
                      <motion.div
                        className="flex flex-col p-3 pt-5  border-[#252525] "
                        {...slideAnimation}
                      >
                        <h2 className="text-[#BDBDBD] font-semibold mb-4">Select Address</h2>
                        {addresses.map(addr => (
                          <label key={addr.id} className="flex items-center mb-5 text-white">
                            <input
                              type="radio"
                              name="address"
                              value={addr.id}
                              checked={selectedAddress === addr.id}
                              onChange={() => setSelectedAddress(addr.id)}
                              className="mr-2 accent-[#591e6a] w-5 h-3 cursor-pointer"
                            />
                            {addr.address}
                          </label>
                        ))}
                        <h3 className="text-[#BDBDBD] -mt-3 text-sm pb-3">
                          Or add address{' '}
                          <span
                            className="inline-flex underline cursor-pointer"
                            onClick={() => setShowAddAddress(true)}
                          >
                            here
                          </span>
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
                        {/* <Button
                          className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-12"
                          label="Next"
                          onClick={handleNextClick}
                        /> */}
                        <button
                          className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-[#1c1c1c63] hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-[#00000086]  border text-center  text-gray-50 text-base font-semibold   overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg px-2 py-3 w-full rounded-md mt-12"
                          onClick={handleNextClick}
                        >
                          Next
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div className="pb-3 " {...slideAnimation}>
                        {!showAddAddress && !showSavedPayment ? (
                          <motion.div className=" " {...slideAnimation}>
                            <motion.div className="pb-3 " {...slideAnimation}>
                              <div className="flex items-center">
                                <button
                                  className="cursor-pointer duration-200 hover:scale-125 active:scale-100 -mt-3 "
                                  title="Go Back"
                                  onClick={() => setShowSavedPayment(true)}
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

                              <div className="-px-3  rounded-lg shadow flex  items-center mt-3 gap-2">
                                <button className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-[#363636] bg-[#242424] has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-[#242424] has-[:checked]:font-bold hover:bg-[#000000] transition-all cursor-pointer [&_p]:has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:translate-x-[80%] [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 [&amp;_p]:has-[:checked]:text-5xl overflow-hidden">
                                  <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                      fill="#fff"
                                      className="hover:fill-black"
                                    >
                                      <path d="M32 13.333l-4.177 9.333h-1.292l1.552-3.266-2.75-6.068h1.359l1.99 4.651h0.026l1.927-4.651zM14.646 16.219v3.781h-1.313v-9.333h3.474c0.828-0.021 1.63 0.266 2.25 0.807 0.615 0.505 0.953 1.219 0.943 1.974 0.010 0.766-0.339 1.5-0.943 1.979-0.604 0.531-1.354 0.792-2.25 0.792zM14.641 11.818v3.255h2.198c0.484 0.016 0.958-0.161 1.297-0.479 0.339-0.302 0.526-0.714 0.526-1.141 0-0.432-0.188-0.844-0.526-1.141-0.349-0.333-0.818-0.51-1.297-0.495zM22.63 13.333c0.833 0 1.495 0.234 1.979 0.698s0.724 1.099 0.724 1.906v3.859h-1.083v-0.87h-0.047c-0.469 0.714-1.089 1.073-1.865 1.073-0.667 0-1.219-0.203-1.667-0.615-0.438-0.385-0.682-0.948-0.672-1.531 0-0.646 0.234-1.161 0.708-1.547 0.469-0.38 1.099-0.573 1.885-0.573 0.672 0 1.224 0.13 1.656 0.385v-0.271c0.005-0.396-0.167-0.776-0.464-1.042-0.297-0.276-0.688-0.432-1.094-0.427-0.63 0-1.13 0.276-1.5 0.828l-0.995-0.646c0.547-0.818 1.359-1.229 2.432-1.229zM21.167 17.88c-0.005 0.302 0.135 0.583 0.375 0.766 0.25 0.203 0.563 0.313 0.88 0.307 0.474 0 0.932-0.198 1.271-0.547 0.359-0.333 0.563-0.802 0.563-1.292-0.354-0.292-0.844-0.438-1.474-0.438-0.464 0-0.844 0.115-1.151 0.344-0.307 0.234-0.464 0.516-0.464 0.859zM5.443 10.667c1.344-0.016 2.646 0.479 3.641 1.391l-1.552 1.521c-0.568-0.526-1.318-0.813-2.089-0.797-1.385 0.005-2.609 0.891-3.057 2.198-0.229 0.661-0.229 1.38 0 2.042 0.448 1.307 1.672 2.193 3.057 2.198 0.734 0 1.365-0.182 1.854-0.505 0.568-0.375 0.964-0.958 1.083-1.625h-2.938v-2.052h5.13c0.063 0.359 0.094 0.719 0.094 1.083 0 1.625-0.594 3-1.62 3.927-0.901 0.813-2.135 1.286-3.604 1.286-2.047 0.010-3.922-1.125-4.865-2.938-0.771-1.505-0.771-3.286 0-4.792 0.943-1.813 2.818-2.948 4.859-2.938z"></path>
                                    </svg>
                                    <p className="font-medium absolute inset-0 w-full whitespace-nowrap  translate-x-[500%] top-2 left-2 transition-all duration-500 opacity-50 text-white text-xs">
                                      GooglePay
                                    </p>
                                  </div>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="google"
                                    className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current cursor-pointer"
                                  />
                                </button>
                                <button className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-[#363636] bg-[#242424] has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-[#242424] has-[:checked]:font-bold hover:bg-[#000000] transition-all  has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:translate-x-[80%] [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                                  <div className="inline-flex items-center justify-center gap-2 relative">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 640 512"
                                      fill="#fff"
                                    >
                                      <path d="M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"></path>
                                    </svg>
                                    <p className="font-medium absolute inset-0 w-full whitespace-nowrap  -translate-x-[500%] top-2 left-2 transition-all duration-500 opacity-50 text-white text-xs">
                                      ApplePay
                                    </p>
                                  </div>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="apple"
                                    className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current cursor-pointer"
                                  />
                                </button>
                                <button className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-[#363636] bg-[#242424] has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-[#242424] has-[:checked]:font-bold hover:bg-[#000000] transition-all  has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:translate-x-[90%] [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                                  <div className="inline-flex items-center justify-center gap-2 relative">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 576 512"
                                      width="32"
                                      height="32"
                                      fill="#fff"
                                    >
                                      <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5.5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3.5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5.1-9.8-6.9-15.5-16.2-15.5z"></path>
                                    </svg>
                                    <p className="font-medium absolute inset-0 w-full whitespace-nowrap  -translate-x-[500%] top-2 left-2 transition-all duration-500 opacity-50 text-white text-xs">
                                      Pay Pal
                                    </p>
                                  </div>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="apple"
                                    className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current cursor-pointer"
                                  />
                                </button>
                              </div>

                              <div className="flex flex-col flex-grow mt-4">
                                <h2 className="text-[#BDBDBD] font-semibold text-sm">
                                  Card Holder
                                </h2>
                                <input
                                  type="text"
                                  name="cardName"
                                  className={`flex-grow bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 text-white`}
                                />
                              </div>
                              <div className="flex flex-col flex-grow mt-3">
                                <h2 className="text-[#BDBDBD] font-semibold text-sm">
                                  Card Number
                                </h2>
                                <input
                                  name="cardNumber"
                                  type="text"
                                  placeholder="4111 1111 1111 1111"
                                  className={`flex-grow bg-transparent rounded-lg border placeholder:text-[#777777] border-[#252525]  focus:outline-none p-2 text-white font-bold font-mono`}
                                />
                              </div>
                              <div className="flex flex-grow items-center mt-3">
                                <div className="flex flex-col flex-grow min-w-0 mr-2">
                                  <h2 className="text-[#BDBDBD] font-semibold text-sm">Expiry</h2>
                                  <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    className={`  bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2  text-white font-semibold font-mono`}
                                  />
                                </div>

                                <div className="flex flex-col flex-grow ml-2 min-w-0 ">
                                  <h2 className="text-[#BDBDBD] font-semibold text-sm">CVV</h2>
                                  <input
                                    type="text"
                                    name="cvv"
                                    placeholder="123"
                                    className={` bg-transparent rounded-lg placeholder:text-[#777777] border border-[#252525] focus:outline-none p-2 text-white font-bold font-mono`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ) : (
                          showSavedPayment &&
                          !showAddAddress && (
                            <motion.div {...slideAnimation}>
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

                                <h2 className=" text-[#BDBDBD] font-semibold ml-2 -mt-3">
                                  Saved Payment Methods
                                </h2>
                              </div>
                              <div
                                className="mt-1 overflow-y-auto "
                                style={{
                                  height: '250px',
                                  scrollbarWidth: 'none',
                                  msOverflowStyle: 'none',
                                }}
                              >
                                {savedPayments.map(payment => (
                                  <div
                                    key={payment.id}
                                    className={`border bg-[#6470ab30] has-[:checked]:border-white shadow-md rounded-md p-3 mb-3 ${
                                      selectedCard === payment.id
                                        ? 'border-white'
                                        : 'border-transparent'
                                    }`}
                                    onClick={() => handleCardSelect(payment.id)}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <img
                                          src={`/media/${payment.cardType.toLowerCase()}.png`}
                                          alt={payment.cardType}
                                          className="w-10 h-8 mr-2"
                                        />
                                        <p className="text-[#BDBDBD] font-medium font-mono">
                                          {payment.cardNumber
                                            .slice(-4)
                                            .padStart(payment.cardNumber.length, 'X')}
                                        </p>
                                      </div>
                                      <p className="text-[#BDBDBD] font-medium">
                                        {payment.expiryDate}
                                      </p>
                                    </div>
                                    <h2 className="text-white">Zareen</h2>
                                  </div>
                                ))}
                              </div>
                              <button
                                className="text-[#BDBDBD] mt-3 underline text-sm "
                                onClick={handleAddNewPayment}
                              >
                                Add New Card/Payment method +
                              </button>

                              <div className="flex justify-between items-center border-t border-[#252525] mt-1">
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

                              {showSavedPayment && (
                                <button
                                  className={classes.Paybutton}
                                  // href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                                >
                                  {user ? 'Pay now' : 'Login to checkout'}
                                </button>
                              )}
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    )}

                    {showCardDetails && !showSavedPayment && (
                      <Button
                        className="hidden lg:block bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md "
                        href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                        label={user ? 'Save' : 'Login to checkout'}
                        onClick={() => setShowSavedPayment(true)}
                      />
                    )}
                  </motion.div>
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
    </>
  )
}
