'use client'
import React, { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const dummyProduct = {
  id: 'dummy-product-001',
  title: 'Dummy Product',
  price: 1999,
  stripeProductID: 'prod_dummy123',
  stripePriceID: 'price_dummy456',
  description: 'This is a dummy product for testing purposes',
  image: '/path/to/dummy-image.jpg'
}

const SavedCard = ({ id, last4, expMonth, expYear, brand, isSelected, onClick }) => (
  <div 
    className={`w-full p-4 border rounded-lg shadow cursor-pointer mb-2 ${
      isSelected ? 'border-[#C71E90] bg-[#C71E9020]' : 'border-gray-200 bg-[#19191974]'
    }`}
    onClick={() => onClick(id)}
  >
    <div className="flex justify-between items-center mb-2">
      <h5 className="text-lg font-bold text-white">{brand} **** {last4}</h5>
    </div>
    <p className="text-sm text-gray-400">Expires: {expMonth}/{expYear}</p>
  </div>
)

const PaymentForm = ({ onSuccess, onSaveCard }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [saveCard, setSaveCard] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart`,
      },
      redirect: 'if_required',
    })

    if (result.error) {
      setError(result.error.message)
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccess()
        if (saveCard) {
          onSaveCard()
        }
      }
    }
    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="saveCard"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="saveCard" className="text-white">Save this card for future purchases</label>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-4 w-full"
        label={processing ? 'Processing...' : 'Pay Now'}
      />
    </form>
  )
}

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
  const [clientSecret, setClientSecret] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [savedCard, setSavedCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState('')
  const [loadingSavedCards, setLoadingSavedCards] = useState(false)

  const addresses = [
    { id: '1', address: 'sector 123, Lalbagh, Bangalore 560027' },
    { id: '2', address: 'sector 123, Lalbagh, Bangalore 560027' },
  ]

  useEffect(() => {
    if (cartIsEmpty && hasInitializedCart) {
      addItemToCart({ product: dummyProduct, quantity: 1 })
    }
  }, [cartIsEmpty, hasInitializedCart, addItemToCart])

  useEffect(() => {
    if (showCardDetails && user) {
      setLoadingSavedCards(true)
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: [{ product: dummyProduct, quantity: 1 }],
          saveCard: true
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error('Error creating PaymentIntent:', error))
  
      fetch("/api/get-saved-cards")
        .then((res) => res.json())
        .then((data) => {
          if (data.savedCards && data.savedCards.length > 0) {
            setSavedCard(data.savedCards[0])
          }
          setLoadingSavedCards(false)
        })
        .catch((error) => {
          console.error('Error fetching saved cards:', error)
          setLoadingSavedCards(false)
        })
    }
  }, [showCardDetails, user])

  const handleNextClick = () => {
    if (selectedAddress) {
      setShowCardDetails(true)
    } else {
      alert('Please select an address before proceeding.')
    }
  }

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
    const mockSavedCard = {
      id: 'card_mock123',
      brand: 'Visa',
      last4: '5556',
      expMonth: '12',
      expYear: '2025'
    }
    setSavedCard(mockSavedCard)
    localStorage.setItem('savedCard', JSON.stringify(mockSavedCard))
  }

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId)
  }

  const handlePayWithSelectedCard = async () => {
    if (!selectedCard) {
      alert('Please select a card before proceeding.')
      return
    }
    
    try {
      const response = await fetch("/api/pay-with-saved-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: selectedCard }),
      })
      const result = await response.json()
      if (result.success) {
        setPaymentSuccess(true)
      } else {
        alert('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleSaveCard = () => {
    fetch("/api/get-saved-cards")
      .then((res) => res.json())
      .then((data) => {
        if (data.savedCards && data.savedCards.length > 0) {
          setSavedCard(data.savedCards[0])
        }
      })
      .catch((error) => console.error('Error fetching saved cards:', error))
  }

  useEffect(() => {
    const savedCardData = localStorage.getItem('savedCard')
    if (savedCardData) {
      setSavedCard(JSON.parse(savedCardData))
    }
  }, [])

  let cartLength = cart.items.length
  return (
    <Fragment>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d;
          border-radius: 4px;a
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6B14D0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C71E90;
        }
      `}</style>
      <br />
      {!hasInitializedCart ? (
        <div className="flex justify-center items-center h-full">
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className="flex flex-col justify-center items-center mt-4 md:mt-16 bg-[#19191974] backdrop-blur-0 h-[400px] md:h-[600px] w-full px-4 md:px-10 py-3 rounded-xl border border-[#3e3e3ee8]">
              <h1 className="text-white text-2xl md:text-3xl font-semibold text-center">Oops..Your cart is empty :(</h1>
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  <Link
                    href={`/${productsPage.slug}`}
                    className="text-white mt-6 md:mt-10 text-base hover:underline"
                  >
                    Click here to shop
                  </Link>
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  <Link
                    href={`/login?redirect=%2Fcart`}
                    className="text-primary-500 hover:underline mt-4"
                  >
                    Log in
                  </Link>
                  <span className="text-white"> to view a saved cart.</span>
                </Fragment>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-[55%_1fr] gap-5 mt-4 md:mt-16 bg-transparent lg:bg-[#19191974] lg:backdrop-blur-sm h-auto md:h-[600px] w-full px-3 md:px-10 py-3 rounded-xl lg:border border-[#3e3e3ee8] overflow-hidden">
              <div className="flex flex-col h-full overflow-hidden">
                <Link href={`/`}>
                  <p className="text-[#BDBDBD] md:text-white text-sm flex items-center pb-3 pt-2 cursor-pointer border-[#4a4a4ae8] font-bold">
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

                <ul className="flex flex-col md:flex-row md:overflow-x-auto lg:flex-col lg:flex-grow lg:overflow-y-auto pr-4 h-full custom-scrollbar">
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
                className="flex flex-col h-full px-4 py-2 rounded-xl min-h-80 xl:w-[24rem] border-2 border-[#3e3e3ee8] mt-4 lg:mt-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, #0000008d 65%, #7d72a847 100%)',
                }}
              >
                <div className="flex flex-col p-3 pt-5 h-full overflow-y-auto custom-scrollbar">
                  {paymentSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="bg-green-500 text-white p-4 rounded-md mb-4 text-center">
                        Payment successful! Thank you for your purchase.
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-4"
                        label="Continue Shopping"
                        onClick={() => window.location.href = '/'}
                      />
                    </div>
                  ) : !showCardDetails ? (
                    <div className="flex flex-col p-3 pt-5 border-[#252525]">
                      <h2 className="text-[#BDBDBD] font-semibold mb-4">Select Address</h2>
                      <div onChange={(e) => setSelectedAddress(e.target.value)}>
                        {addresses.map(addr => (
                          <div key={addr.id} className="flex items-center space-x-2 mb-2">
                            <input
                              type="radio"
                              id={`address-${addr.id}`}
                              name="address"
                              value={addr.id}
                              checked={selectedAddress === addr.id}
                              className="text-[#C71E90]"
                            />
                            <label htmlFor={`address-${addr.id}`} className="text-white">{addr.address}</label>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-[#BDBDBD] mt-2 text-sm pb-3">
                        Or add address{' '}
                        <span className="inline-flex underline cursor-pointer">here</span>
                      </h3>
                      <div className="block lg:hidden">
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
                        className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-3 px-6 rounded-md mt-6 lg:mt-12"
                        label="Next"
                        onClick={handleNextClick}
                      />
                    </div>
                  ) : (
                    <div className="pb-3">
                      <div className="flex items-center">
                        <button
                          className="cursor-pointer duration-200 hover:scale-125 active:scale-100 -mt-3"
                          title="Go Back"
                          onClick={() => setShowCardDetails(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            className="stroke-blue-300">
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M11 6L5 12M5 12L11 18M5 12H19"
                            ></path>
                          </svg>
                        </button>
                        <h2 className="text-[#BDBDBD] font-semibold ml-2 -mt-3">
                          Payment Details
                        </h2>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-[#BDBDBD] font-semibold mb-2">Saved Card</h3>
                        
                        {loadingSavedCards ? (
                          <p className="text-white">Loading saved card...</p>
                        ) : savedCard ? (
                          <SavedCard
                            {...savedCard}
                            isSelected={selectedCard === savedCard.id}
                            onClick={handleCardSelect}
                          />
                        ) : (
                          <p className="text-white mb-4">No saved card found.</p>
                        )}
                        
                        {savedCard && (
                          <Button
                            className="bg-gradient-to-r from-[#C71E90] to-[#6B14D0] text-white py-2 px-4 rounded-md mt-2 w-full"
                            label="Pay with Saved Card"
                            onClick={handlePayWithSelectedCard}
                          />
                        )}
                      </div>
                      <div className="mt-6">
                        <h3 className="text-[#BDBDBD] font-semibold mb-2">Or Add a New Card</h3>
                        {clientSecret && (
                          <Elements stripe={stripePromise} options={{ 
                            clientSecret,
                            appearance: {
                              theme: 'night',
                              variables: {
                                colorPrimary: '#C71E90',
                                colorBackground: '#19191974',
                                colorText: '#ffffff',
                                colorDanger: '#ff0000',
                                fontFamily: 'Roboto, sans-serif',
                              },
                            },
                          }}>
                            <PaymentForm onSuccess={handlePaymentSuccess} onSaveCard={handleSaveCard} />
                          </Elements>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:hidden border-2 border-[#252525] rounded-lg p-3 mb-3 mt-4">
                <h2 className="text-[#ffffff] font-semibold">Price breakdown</h2>
                <div className="flex justify-between items-center">
                  <h6 className="text-white pt-1">Subtotal</h6>
                  <p className="text-white">$0</p>
                </div>
                <div className="flex justify-between items-center pt-1">
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
        </Fragment>
      )}
    </Fragment>
  )
}

export default CartPage