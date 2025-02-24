// import React from 'react'

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>
// }

'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../../_providers/Auth'
import { useAppContext } from '../../Context/AppContext'
import { UserInfo } from './UserInfo'
import { profileNavItems } from '../../constants/'
import { useCart } from '../../_providers/Cart'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const { value } = useAppContext()
  const { cart } = useCart()
  const items = cart.items
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)
  const [underlineStyle, setUnderlineStyle] = useState({})
  const navRefs = useRef([])
  const [addresses, setAddresses] = useState([])
  const [loadingSavedCards, setLoadingSavedCards] = useState(false)
  const [savedCards, setSavedCards] = useState([])

  const SavedCard = ({ id, last4, expMonth, expYear, brand, isSelected }) => (
    <div
      className={`w-full p-4 shadow cursor-pointer mb-2 ${
        isSelected ? 'border-[#C71E90] bg-[#C71E9020]' : 'border-gray-200 bg-[#19191974]'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg text-white">
          {brand} **** {last4}
        </h5>
      </div>
      <p className="text-sm text-gray-400">
        Expires: {expMonth}/{expYear}
      </p>
    </div>
  )

  useEffect(() => {
    if (!user?.id) return

    async function fetchWishlistData() {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist?where[user][equals]=${user.id}&depth=2&populate=product`,
        )
        // const res = await req.json()
        // setWishlistItems(res.docs.map(item => item.product.title))
        const res = await req.json()
        setWishlistItems(
          res.docs.map(item => ({
            title: item.product.title,
            price: item.product.price,
          })),
        )
      } catch (error) {
        console.log(`Error fetching wishlist: ${error}`)
      }
    }

    fetchWishlistData()
  }, [user?.id, value])

  useEffect(() => {
    const index = profileNavItems.findIndex(item => item.url === pathname)
    setActiveIndex(index !== -1 ? index : 0)
  }, [pathname])

  useEffect(() => {
    const activeNavItem = navRefs.current[activeIndex]
    if (activeNavItem) {
      const { offsetLeft, offsetWidth } = activeNavItem
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/address?where[user][equals]=${user.id}`,
        )
        if (response.ok) {
          const data = await response.json()
          setAddresses(data.docs) // Assuming the API returns an array of address objects in 'docs'
        } else {
          throw new Error('Failed to fetch addresses')
        }
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    }

    if (user?.id) {
      fetchAddresses() // Call the function if user is logged in
    }
  }, [user])
  const fetchSavedCards = () => {
    setLoadingSavedCards(true)
    fetch('/api/get-saved-cards')
      .then(res => res.json())
      .then(data => {
        if (data.savedCards) {
          setSavedCards(data.savedCards)
        } else {
          setSavedCards([])
        }
        setLoadingSavedCards(false)
      })
      .catch(error => {
        console.error('Error fetching saved cards:', error)
        setLoadingSavedCards(false)
      })
  }

  useEffect(() => {
    if (user) {
      fetchSavedCards()
    }
  }, [user])

  return (
    <div className="bg-black min-h-screen text-white w-full md:px-5 pb-10">
      <div className="max-w-screen-2xl md:mx-auto px-8 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 pt-12 md:pt-24 ">
          <div className="md:w-2/3 md:pr-5 md:border-r border-[#5D5D5D]">
            <div className="rounded-xl md:p-8">
              <div className="bg-transparent mt-10 md:-mt-20 -ml-12">
                <UserInfo />
              </div>
              <nav className="mb-5 -mt-3 relative">
                <ul className="flex flex-wrap gap-4">
                  {profileNavItems.map((item, index) => (
                    <li key={item.title}>
                      <Link
                        href={item.url}
                        className={`flex md:items-center gap-2 text-white hover:text-gray-300 p-1`}
                        ref={el => (navRefs.current[index] = el)}
                      >
                        <Image src={item.icon} alt={item.title} width={24} height={24} />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <span
                  className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#97A1FF] to-[#65FFDA] rounded-full transition-all duration-300 ease-in-out"
                  style={underlineStyle}
                ></span>
              </nav>
              {children}
            </div>
          </div>

          <div className="md:w-1/3 space-y-8 ">
            <Link href={'/cart'}>
              <div className="bg-[#181818] border border-[#404040] md:bg-transparent rounded-xl p-6">
                <h4 className="text-2xl font-medium mb-4 text-white">Your Cart</h4>
                <ul className="space-y-2">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-[#B7B7B7] text-sm">{item?.product?.title}</span>
                      </li>
                    ))
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                </ul>
                <Link
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  className="flex md:hidden justify-end"
                >
                  <button className="w-fit px-5 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded mt-8">
                    Checkout
                  </button>
                </Link>
              </div>
            </Link>

            <Link href={'/wishlist'}>
              <div className="bg-[#181818] border border-[#404040] md:bg-transparent rounded-xl p-6 mt-10">
                <h4 className="text-2xl font-medium mb-4 text-white">Wishlist ❤️</h4>
                <ul className="space-y-2">
                  {wishlistItems.map((item, index) => (
                    <li key={index} className="flex justify-between text-[#B7B7B7] text-sm">
                      <span>{item.title}</span>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
            <div className="bg-transparent rounded-xl p-6">
              <h4 className="text-2xl  mb-4">Saved Information</h4>
              <h5 style={{ textDecoration: 'underline' }}> Saved Addresses</h5>
              {addresses.map(addr => (
                <div key={addr.id} className="flex items-center space-x-2 mb-2">
                  <label
                    htmlFor={`address-${addr.id}`}
                    className="text-white"
                  >{`${addr.street}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`}</label>
                </div>
              ))}
              <h5 style={{ textDecoration: 'underline' }}>Saved Cards</h5>
              {loadingSavedCards ? (
                <p>Loading saved cards...</p>
              ) : savedCards.length > 0 ? (
                savedCards.map(card => <SavedCard key={card.id} {...card} />)
              ) : (
                <p>No saved cards found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
