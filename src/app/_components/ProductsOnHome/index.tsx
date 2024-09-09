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
  return (
    <div className="relative pt-16 md:pt-24 md:pb-20">
      <Gutter className={classes.productCards}>
        <h2
          className={`${syne.className} text-white mb-10 md:mb-0 md:-rotate-90 md:text-4xl md:top-52 md:absolute md:-left-10 text-3xl font-extrabold`}
        >
          Plain T-Shirts
        </h2>
        <CollectionArchive
          relationTo="products"
          showPageRange={false}
          limit={7} // Adjust this number as needed
        />
        <img
          src="/media/MOMIFA.png"
          alt=""
          className="hidden md:block absolute right-24 w-16 -mt-[560px]"
        />
      </Gutter>
    </div>
  )
}

export default ProductsOnHome
