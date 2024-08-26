"use client"

import React, {useRef} from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Gutter } from '../Gutter'
import classes from "./index.module.scss"
import { CollectionArchive } from '../CollectionArchive';


const ProductsOnHome = () => {
    const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { triggerOnce: false, threshold: 0.5 });

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 // Start 50 pixels below its final position
    },
    visible: { 
      opacity: 1, 
      y: 0, // Move to its final position
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };
  return (
    <div>
      <Gutter className={classes.productCards}>
        <h2 className={classes.heading}>Best Sellers :)</h2>
        <CollectionArchive
          relationTo="products"
          showPageRange={false}
          limit={6} // Adjust this number as needed
        />
      </Gutter>
    </div>
  )
}

export default ProductsOnHome
