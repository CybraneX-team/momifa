// 'use client'
// import React from 'react'
// import Link from 'next/link'
// import { motion, useInView } from 'framer-motion'
// import { Category } from '../../../../payload/payload-types'
// import { useFilter } from '../../../_providers/Filter'

// import classes from './index.module.scss'
// import Categories from './../../../../payload/collections/Categories'

// const CategoryCard = () => {
//   const ref = React.useRef(null)
//   const isInView = useInView(ref, {
//     once: false,
//     amount: 0.1,
//   })

//   const cardVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { scale: 1, opacity: 1 },
//   }

//   const MotionLink = motion(Link)

//   return (
//     <div className={classes.div} ref={ref}>
//       <MotionLink
//         href="/products"
//         className={classes.card}
//         variants={cardVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//         transition={{ duration: 0.6 }}
//       >
//         <p className={classes.title}>Title</p>
//       </MotionLink>
//       <div style={{ display: 'flex', flexDirection: "column", gap: "20px" }}>
//         <MotionLink
//           href="/products"
//           className={classes.card2}
//           variants={cardVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <p className={classes.title}>Title</p>
//         </MotionLink>
//         <MotionLink
//           href="/products"
//           className={classes.card2}
//           variants={cardVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <p className={classes.title}>Title</p>
//         </MotionLink>
//       </div>
//     </div>
//   )
// }

// export default CategoryCard

'use client'
import React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import classes from './index.module.scss'
import img from './media/img.png'
import img02 from './media/img02.png'
import img03 from './media/img03.png'

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
        style={{ height: "500px", width: "400px" }}
        className={`${classes.glass} `} 
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6 }}
      >
        <Image className={classes.image} src={img} alt="Branded" layout="fill" objectFit="cover" />
      </MotionLink>

      <div style={{ display: 'flex', flexDirection: "column", gap: "20px" }}>
        <MotionLink
          href="/products"
          data-text="Explore Plain"
          style={{ height: "250px", width: "600px" }}
          className={`${classes.glass}`} 
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
<div style={{ position: 'relative', height: "200px", width: "200px" }}>  {/* Adjusted size */}
      <Image className={classes.image2} src={img02} alt="Plain" layout="fill" objectFit="cover" />
    </div>     
       </MotionLink>
        <MotionLink
          href="/products"
          data-text="Explore Accessories"
          style={{ height: "250px", width: "600px" }}
          className={`${classes.glass}`} 
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
<div style={{ position: 'relative', height: "200px", width: "200px" }}>  {/* Adjusted size */}
      <Image className={classes.image2} src={img03} alt="Plain" layout="fill" objectFit="cover" />
    </div> 
            </MotionLink>
      </div>
    </div>
  )
}

export default CategoryCard
