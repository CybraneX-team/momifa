'use client'
import React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import classes from './index.module.scss'
import img from './media/img.jpg'
import img02 from './media/img02.jpg'
import img03 from './media/img03.jpg'
import img04 from './media/img04.jpg'

const CategoryCard = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  })

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  }

  const MotionLink = motion(Link)

  return (
    <div className={classes.container} ref={ref}>
      <MotionLink
        href="/products"
        data-text="Explore Branded"
        style={{ height: '700px', width: '800px' }}
        className={classes.glass}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <Image className={classes.image} src={img} alt="Branded" layout="fill" objectFit="cover" />
        <div className={classes.title}>Branded</div>
      </MotionLink>

      {/* <div className={classes.cardGroup}> */}
      <MotionLink
        href="/products"
        data-text="Explore Plain"
        // style={{ height: "250px", width: "600px" }}
        style={{ height: '700px', width: '800px' }}
        className={classes.glass}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* <div className={classes.imageContainer}> */}
        <Image className={classes.image2} src={img02} alt="Plain" layout="fill" objectFit="cover" />
        <div className={classes.title}>Plain</div>
        {/* </div>      */}
      </MotionLink>
      <MotionLink
        href="/products"
        data-text="Explore Accessories"
        // style={{ height: "250px", width: "600px" }}
        style={{ height: '700px', width: '800px' }}
        className={classes.glass}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* <div className={classes.imageContainer}> */}
        <Image
          className={classes.image2}
          src={img03}
          alt="Accessories"
          layout="fill"
          objectFit="cover"
        />
        <div className={classes.title}>Polos</div>
        {/* </div>  */}
      </MotionLink>
      {/* </div> */}

      <MotionLink
        href="/products"
        data-text="Explore Accessories"
        // style={{ height: "250px", width: "600px" }}
        style={{ height: '700px', width: '800px' }}
        className={classes.glass}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* <div className={classes.imageContainer}> */}
        <Image
          className={classes.image2}
          src={img04}
          alt="Accessories"
          layout="fill"
          objectFit="cover"
        />
        <div className={classes.title}>Accessories</div>
        {/* </div>  */}
      </MotionLink>
    </div>
  )
}

export default CategoryCard
