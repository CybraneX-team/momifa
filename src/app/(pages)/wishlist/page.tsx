'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../_providers/Auth'
import { useAppContext } from '../../Context/AppContext'
import { Gutter } from '../../_components/Gutter'
import { CollectionArchive } from '../../_components/CollectionArchive' // Use correct import based on the export type
import classes from './index.module.scss'
import { Card } from '../../_components/Card'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'] })

const Wishlist = () => {
  const { user } = useAuth()
  const [wishlistData, setwishlistData] = useState([])
  const { value, setValue } = useAppContext()

  useEffect(() => {
    if (!user?.id) return // Ensure user is authenticated

    async function getWishlistData() {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist?where[user][equals]=${user.id}&depth=2&populate=product`,
        )
        const res = await req.json()
        setwishlistData(res.docs) // Set wishlist items for the logged-in user
        console.log(res)
      } catch (error) {
        console.log(`some error: ${error}`)
      }
    }

    getWishlistData()
  }, [user?.id])

  async function deleteItem(id) {
    try {
      const deleteReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist/${id}`, {
        method: 'DELETE',
      })
      await deleteReq.json()
      const filtered = wishlistData.filter(e => e.id !== id)
      setwishlistData(filtered)
      setValue(prev => prev - 1)
    } catch (error) {
      console.log(`some error: ${error}`)
    }
  }

  return (
    <div className="relative pt-16 md:pt-32 px-5 md:px-0 ">
      <Gutter className={classes.productCards}>
        <h2
          className={`${syne.className} text-white mt-10 md:mb-0 md:-rotate-90 md:text-4xl md:top-52 md:mt-20 md:absolute md:-left-10 text-3xl font-extrabold`}
        >
          Your Wishlist
        </h2>

        {wishlistData.map(e => {
          return (
            <Card
              key={e.id}
              doc={e.product}
              relationTo="products"
              title={e.product.title}
              className={classes.card}
            />
          )
        })}
        <img
          src="/media/MOMIFA.png"
          alt=""
          className="hidden md:block -z-10 absolute right-24  w-12 "
        />
      </Gutter>
    </div>
  )
}

export default Wishlist
