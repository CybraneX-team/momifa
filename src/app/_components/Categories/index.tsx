'use client'

import React from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import classes from './index.module.scss'

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="flex flex-col  ">
      <div className={classes.titleWrapper}>
        <motion.div
          className={classes.title}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
          }}
        >
          Shop by Categories
        </motion.div>
        <Link style={{ color: 'white' }} href="/products">
          Show All
        </Link>
      </div>

      <div className={classes.list}>
        <CategoryCard />
      </div>
    </section>
  )
}

export default Categories
