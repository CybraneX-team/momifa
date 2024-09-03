"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { motion, useAnimation, useInView } from "framer-motion"

import classes from './index.module.scss'
import Link from 'next/link'

export const CustomHero: React.FC<Page['hero']> = ({ richText, links }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    threshold: 0.3,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const textAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const imageAnimation = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  }

  return (
    <section className={classes.hero} ref={ref}>
      <div className={classes.heroWrapper}>
        <div
          className={classes.heroImageBox}
        >
          {/* <Image
            src="/media/heroIm.png"
            alt="Polo T-shirt"
            height={1080}
            width={1920}
            /> */}
            <Link href={"/wishlist"}>
             <Image 
              src="/media/heartIcon.png"
              alt='MOMIFA'
              height={0}
               width={0}
               className={classes.heartIcon}
            />
            </Link>
             <Image 
              src="/media/phood.png"
              alt='MOMIFA'
              height={470}
               width={970}
               className={classes.textt}
            />
            <Image 
              src="/media/sl.png"
              alt='MOMIFA'
              height={48}
               width={393}
               className={classes.texttt}
            />
            <Image 
              src="/media/MOMIFA.png"
              alt='MOMIFA'
              height={150}
               width={70}
               className={classes.rotatedText}
            />
            {/* <p className={classes.rotatedText}> MOMI/FA </p> */}
        </div>
      </div>
    </section>
  )
}