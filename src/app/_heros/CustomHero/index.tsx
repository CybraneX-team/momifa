"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { motion, useAnimation, useInView } from "framer-motion"

import classes from './index.module.scss'

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
        <motion.div
          className={classes.heroTextBox}
          initial="hidden"
          animate={controls}
          variants={textAnimation}
        >
          <RichText content={richText} />
          
          {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </motion.div>
        
        <motion.div
          className={classes.heroImageBox}
          initial="hidden"
          animate={controls}
          variants={imageAnimation}
        >
          <Image
            src="/media/polo-tshirt.png"
            alt="Polo T-shirt"
            width={1200}
            height={900}
            objectFit="contain"
          />
        </motion.div>
      </div>
    </section>
  )
}