'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Gutter } from '../Gutter'
import classes from './index.module.scss'
import { CollectionArchive } from '../CollectionArchive'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'] })

const ProductsOnHome = () => {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { triggerOnce: false, threshold: 0.5 })

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50, // Start 50 pixels below its final position
    },
    visible: {
      opacity: 1,
      y: 0, // Move to its final position
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  // Replace with the actual ID of the "Plain T-Shirts" category from your Payload CMS.
  const plainTShirtsCategoryId = 'your-plain-t-shirts-category-id'

  return (
    <div className="relative pt-16 md:pt-24 pb-1 md:pb-10  bg-[url('/media/cart-mob.jpg')] md:bg-[url('/media/cart2.png')] bg-no-repeat bg-cover">
      <Gutter className={classes.productCards}>
        <h2
    className={`text-white mb-10 sm:mx-auto sm:block lg:block md:block md:mb-0 md:-rotate-90 md:top-48 md:absolute md:-left-5 font-bold text-xl sm:text-2xl lg:text-3xl`}
     >
    Polo T-Shirts
  </h2>

        <div className="-pr-20">
          <CollectionArchive
            relationTo="products"
            showPageRange={false}
            // Pass the category ID to filter products
          />
        </div>
        <img
          src="/media/MOMIFA.png"
          alt=""
          className="hidden md:block absolute md:-right-[0rem] md:w-16 md:-mt-[32em]"
        />
      </Gutter>
    </div>
  )
}

export default ProductsOnHome
