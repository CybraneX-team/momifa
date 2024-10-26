// 'use client'
// // import React, { useEffect, useRef } from 'react'
// // import Image from 'next/image'
// // import { Page } from '../../../payload/payload-types'
// // import { CMSLink } from '../../_components/Link'
// // import RichText from '../../_components/RichText'
// // import { motion, useAnimation, useInView } from "framer-motion"

// // import classes from './index.module.scss'
// // import Link from 'next/link'

// // export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
// //   const controls = useAnimation()
// //   const ref = useRef(null)
// //   const inView = useInView(ref, {
// //     threshold: 0.3,
// //     triggerOnce: false
// //   })

// //   useEffect(() => {
// //     if (inView) {
// //       controls.start("visible")
// //     } else {
// //       controls.start("hidden")
// //     }
// //   }, [controls, inView])

// //   const textAnimation = {
// //     hidden: { y: 50, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: { duration: 0.8, ease: "easeOut" }
// //     }
// //   }

// //   const imageAnimation = {
// //     hidden: { x: 50, opacity: 0 },
// //     visible: {
// //       x: 0,
// //       opacity: 1,
// //       transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
// //     }
// //   }

// //   return (
// //     <section className={classes.hero} ref={ref}>
// //       <div className={classes.heroWrapper}>
// //         <div
// //           className={classes.heroImageBox}
// //         >
// //           {/* <Image
// //             src="/media/heroIm.png"
// //             alt="Polo T-shirt"
// //             height={1080}
// //             width={1920}
// //             /> */}
// //             <Link href={"/wishlist"} >
// //             <Image src="/media/heart.png"
// //             alt='wishlistIcon'
// //              height={40}
// //              width={40}
// //              style={{position: "absolute", left: "80em", top: "2em"}}
// //               />
// //             {/* <button className={classes.button}  style={{width: "4.7em", position: "relative" , left: "90%", top: "1em"}} >
// //               <svg height="25" width="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
// //             </button> */}
// //             </Link>
// //              <Image
// //               src="/media/phood.png"
// //               alt='MOMIFA'
// //               height={470}
// //                width={970}
// //                className={classes.textt}
// //             />
// //             <Image
// //               src="/media/sl.png"
// //               alt='MOMIFA'
// //               height={48}
// //                width={393}
// //                className={classes.texttt}
// //             />
// //             <Image
// //               src="/media/MOMIFA.png"
// //               alt='MOMIFA'
// //               height={150}
// //                width={70}
// //                className={classes.rotatedText}
// //             />
// //             {/* <p className={classes.rotatedText}> MOMI/FA </p> */}
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // import React, { useEffect, useRef, useState } from 'react'
// // import Image from 'next/image'
// // import { Page } from '../../../payload/payload-types'
// // import { CMSLink } from '../../_components/Link'
// // import RichText from '../../_components/RichText'
// // import { motion, useAnimation, useInView } from 'framer-motion'

// // import classes from './index.module.scss'
// // import Link from 'next/link'

// // export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
// //   const controls = useAnimation()
// //   const ref = useRef(null)
// //   const inView = useInView(ref, {
// //     threshold: 0.3,
// //     triggerOnce: false,
// //   })

// //   const [currentImage, setCurrentImage] = useState(0)
// //   const images = ['/media/heroIm.png', '/media/hero2.jpg', '/media/hero3.jpg', '/media/hero4.jpg']

// //   useEffect(() => {
// //     if (inView) {
// //       controls.start('visible')
// //     } else {
// //       controls.start('hidden')
// //     }

// //     const interval = setInterval(() => {
// //       setCurrentImage(prevImage => (prevImage + 1) % images.length)
// //     }, 3000)

// //     return () => clearInterval(interval)
// //   }, [controls, inView, images.length])

// //   return (
// //     <section className={classes.hero} ref={ref}>
// //       <div className={classes.heroWrapper}>
// //         <div className={classes.carouselContainer}>
// //           {images.map((image, index) => (
// //             <div
// //               key={index}
// //               className={classes.carouselSlide}
// //               style={{
// //                 backgroundImage: `url(${image})`,
// //                 transform: `translateX(${(index - currentImage) * 100}%)`,
// //               }}
// //             >
// //               <Link href={'/wishlist'}>
// //                 <Image
// //                   src="/media/heart.png"
// //                   alt="wishlistIcon"
// //                   height={40}
// //                   width={40}
// //                   style={{ position: 'absolute', left: '80em', top: '2em' }}
// //                 />
// //               </Link>
// //               <Image
// //                 src="/media/phood.png"
// //                 alt="MOMIFA"
// //                 height={470}
// //                 width={970}
// //                 className={classes.textt}
// //               />
// //               <Image
// //                 src="/media/sl.png"
// //                 alt="MOMIFA"
// //                 height={48}
// //                 width={393}
// //                 className={classes.texttt}
// //               />
// //               <Image
// //                 src="/media/MOMIFA.png"
// //                 alt="MOMIFA"
// //                 height={150}
// //                 width={70}
// //                 className={classes.rotatedText}
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image'
// import { Page } from '../../../payload/payload-types'
// import { CMSLink } from '../../_components/Link'
// import RichText from '../../_components/RichText'
// import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'

// import classes from './index.module.scss'
// import Link from 'next/link'

// export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
//   const controls = useAnimation()
//   const ref = useRef(null)
//   const inView = useInView(ref, {
//     threshold: 0.3,
//     triggerOnce: false,
//   })

//   const [currentImage, setCurrentImage] = useState(0)
//   const [currentText, setCurrentText] = useState(0)
//   const images = ['/media/heroIm.png', '/media/hero2.jpg', '/media/hero3.jpg', '/media/hero4.jpg']
//   const textImages = ['/media/phood.png', '/media/sl.png']
//   const taglines = ['Elevate Your Style', 'Discover Unique Fashion']

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible')
//     } else {
//       controls.start('hidden')
//     }

//     const interval = setInterval(() => {
//       setCurrentImage(prevImage => (prevImage + 1) % images.length)
//     }, 3000)

//     const textInterval = setInterval(() => {
//       setCurrentText(prevText => (prevText + 1) % 3)
//     }, 3000)

//     return () => {
//       clearInterval(interval)
//       clearInterval(textInterval)
//     }
//   }, [controls, inView, images.length])

//   const textVariants = {
//     enter: { opacity: 0, y: 20 },
//     center: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 },
//   }

//   return (
//     <section className={classes.hero} ref={ref}>
//       <div className={classes.heroWrapper}>
//         <div className={classes.carouselContainer}>
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={classes.carouselSlide}
//               style={{
//                 backgroundImage: `url(${image})`,
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//               }}
//             />
//           ))}
//           <Image
//             src="/media/MOMIFA.png"
//             alt="MOMIFA"
//             height={150}
//             width={70}
//             className={classes.rotatedText}
//           />
//         </div>
//         <div className={classes.textContainer}>
//           <Link href={'/wishlist'}>
//             <Image
//               src="/media/heart.png"
//               alt="wishlistIcon"
//               height={40}
//               width={40}
//               className={classes.heartIcon}
//             />
//           </Link>

//           <motion.div
//             key={currentText}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             variants={textVariants}
//             transition={{ duration: 0.5 }}
//           >
//             <Image
//               src={textImages[currentText % 2]}
//               alt="MOMIFA"
//               height={470}
//               width={970}
//               className={classes.textt}
//             />
//             <motion.h2 className={classes.tagline} variants={textVariants}>
//               {taglines[currentText]}
//             </motion.h2>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
'use client'
// import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'
// import { Page } from '../../../payload/payload-types'
// import { CMSLink } from '../../_components/Link'
// import RichText from '../../_components/RichText'
// import { motion, useAnimation, useInView } from "framer-motion"

// import classes from './index.module.scss'
// import Link from 'next/link'

// export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
//   const controls = useAnimation()
//   const ref = useRef(null)
//   const inView = useInView(ref, {
//     threshold: 0.3,
//     triggerOnce: false
//   })

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible")
//     } else {
//       controls.start("hidden")
//     }
//   }, [controls, inView])

//   const textAnimation = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   }

//   const imageAnimation = {
//     hidden: { x: 50, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
//     }
//   }

//   return (
//     <section className={classes.hero} ref={ref}>
//       <div className={classes.heroWrapper}>
//         <div
//           className={classes.heroImageBox}
//         >
//           {/* <Image
//             src="/media/heroIm.png"
//             alt="Polo T-shirt"
//             height={1080}
//             width={1920}
//             /> */}
//             <Link href={"/wishlist"} >
//             <Image src="/media/heart.png"
//             alt='wishlistIcon'
//              height={40}
//              width={40}
//              style={{position: "absolute", left: "80em", top: "2em"}}
//               />
//             {/* <button className={classes.button}  style={{width: "4.7em", position: "relative" , left: "90%", top: "1em"}} >
//               <svg height="25" width="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
//             </button> */}
//             </Link>
//              <Image
//               src="/media/phood.png"
//               alt='MOMIFA'
//               height={470}
//                width={970}
//                className={classes.textt}
//             />
//             <Image
//               src="/media/sl.png"
//               alt='MOMIFA'
//               height={48}
//                width={393}
//                className={classes.texttt}
//             />
//             <Image
//               src="/media/MOMIFA.png"
//               alt='MOMIFA'
//               height={150}
//                width={70}
//                className={classes.rotatedText}
//             />
//             {/* <p className={classes.rotatedText}> MOMI/FA </p> */}
//         </div>
//       </div>
//     </section>
//   )
// }

// import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image'
// import { Page } from '../../../payload/payload-types'
// import { CMSLink } from '../../_components/Link'
// import RichText from '../../_components/RichText'
// import { motion, useAnimation, useInView } from 'framer-motion'

// import classes from './index.module.scss'
// import Link from 'next/link'

// export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
//   const controls = useAnimation()
//   const ref = useRef(null)
//   const inView = useInView(ref, {
//     threshold: 0.3,
//     triggerOnce: false,
//   })

//   const [currentImage, setCurrentImage] = useState(0)
//   const images = ['/media/heroIm.png', '/media/hero2.jpg', '/media/hero3.jpg', '/media/hero4.jpg']

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible')
//     } else {
//       controls.start('hidden')
//     }

//     const interval = setInterval(() => {
//       setCurrentImage(prevImage => (prevImage + 1) % images.length)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [controls, inView, images.length])

//   return (
//     <section className={classes.hero} ref={ref}>
//       <div className={classes.heroWrapper}>
//         <div className={classes.carouselContainer}>
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={classes.carouselSlide}
//               style={{
//                 backgroundImage: `url(${image})`,
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//               }}
//             >
//               <Link href={'/wishlist'}>
//                 <Image
//                   src="/media/heart.png"
//                   alt="wishlistIcon"
//                   height={40}
//                   width={40}
//                   style={{ position: 'absolute', left: '80em', top: '2em' }}
//                 />
//               </Link>
//               <Image
//                 src="/media/phood.png"
//                 alt="MOMIFA"
//                 height={470}
//                 width={970}
//                 className={classes.textt}
//               />
//               <Image
//                 src="/media/sl.png"
//                 alt="MOMIFA"
//                 height={48}
//                 width={393}
//                 className={classes.texttt}
//               />
//               <Image
//                 src="/media/MOMIFA.png"
//                 alt="MOMIFA"
//                 height={150}
//                 width={70}
//                 className={classes.rotatedText}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'

import classes from './index.module.scss'
import Link from 'next/link'

export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    threshold: 0.3,
    triggerOnce: false,
  })

  const [currentImage, setCurrentImage] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  const images = ['/media/heroIm.png', '/media/hero2.jpg', '/media/hero3.jpg', '/media/hero4.jpg']
  const textImages = ['/media/phood.png', '/media/sl.png']
  const taglines = ['Elevate Your Style', 'Discover Unique Fashion']

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }

    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length)
    }, 3000)

    const textInterval = setInterval(() => {
      setCurrentText(prevText => (prevText + 1) % 3)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [controls, inView, images.length])

  const textVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block px-8 lg:px-28 bg-[url('/media/hero-bg.png')] bg-no-repeat bg-cover">
        <div className="relative w-full h-[40rem]">
          <div className="absolute top-0 left-0 w-1/2 h-2/3 p-8">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 right-36 -left-40 inset-0 z-10 bg-[#1111119c] backdrop-blur-sm"></div>
              <h1 className="absolute top-1/2 -left-10 -translate-y-1/2 z-20 text-white  text-5xl font-bold leading-tight tracking-wide">
                EXCLUSIVE
                <br />
                MOMIFA
                <br />
                COLLECTION
              </h1>
              <div className="relative w-[35rem] h-full mt-16">
                <Image
                  src="/media/hero2.jpg"
                  alt="Fashion Collection"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-[35rem] h-1/2 mt-5 border border-[#8d7890] border-b-0 rounded-lg"></div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[45%] h-[37rem] p-8 pl-0 rounded-lg -ml-16">
            <div className="relative w-full h-full rounded-lg mt-16">
              <Image
                src="/media/hero.jpg"
                alt="Premium Hoodies"
                layout="fill"
                objectFit="cover"
                className="rounded-lg "
                priority
              />
              <div className="absolute top-[25rem] right-0 left-28 inset-0 z-10 bg-[#1111119c] backdrop-blur-sm"></div>
              <h2 className="absolute bottom-4 z-20 right-8 text-white text-3xl text-right font-bold leading-tight">
                PREMIUM LINE OF
                <br />
                POLOS
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[url('/media/hero-bg.png')] bg-no-repeat bg-cover min-h-screen px-8 pt-36 pb-24">
        {/* Top Image Section */}
        <div className="relative w-full h-64 rounded-xl">
          <Image
            src="/media/hero2.jpg"
            alt="Fashion Collection"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute top-1/2 right-36 -left-20 bottom-5 inset-0 z-10 bg-[#1111119c] backdrop-blur-sm"></div>
          <h1 className="absolute top-1/2 left-3 -translate-y-1/2 z-20 text-white text-3xl font-bold leading-tight tracking-wide">
            EXCLUSIVE
            <br />
            MOMIFA
            <br />
            COLLECTION
          </h1>
        </div>

        {/* Bottom Image Section */}
        <div className="relative w-full h-[32rem] mt-10">
          <Image
            src="/media/hero.jpg"
            alt="Premium Hoodies"
            layout="fill"
            objectFit="cover"
            className="rounded-xl w-full"
          />
          <div className="absolute top-[25rem] right-0 left-28 inset-0 z-10 bg-[#1111119c] backdrop-blur-sm"></div>
          <h2 className="absolute bottom-4 z-20 right-8 text-white text-2xl text-right font-bold leading-tight">
            PREMIUM LINE OF
            <br />
            HOODIES
          </h2>
        </div>
      </div>
    </div>
  )
}
