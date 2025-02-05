'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const HorizontalScroll = () => {
  const services = [
    {
      title: 'Better Payments',
      items: [
        'Different ways to pay',
        'Shop Pay',
        'Google Pay',
        'Apple Pay',
        'Debit and Credit Cards'
      ]
    },
    {
      title: 'Humane Core Values',
      items: [
        'Nature Friendly Fabric',
        'Donations towards Autism',
        'Donations to Veterans',
        'Sustainable Clothing'
      ]
    },
    {
      title: 'Premium Quality',
      items: [
        'Crafted with love',
        'Made by Sri Lankan Artisans',
        'Finest fabrics used',
        '100% Cotton'
      ]
    },
    {
      title: '24/7 Customer Service',
      items: [
        'Faster reach with different platforms',
        'Phone at 732-232-5549',
        'info@momifa.com',
        'Multiple Social Media handles'
      ]
    }
  ]

  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const serviceCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full flex flex-col items-center px-4 md:px-6 lg:px-8"
    >
      <motion.h1
        variants={titleVariants}
        className="text-4xl font-semibold text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-8"
      >
        Momifa Cares
      </motion.h1>

      <motion.div
        variants={iconContainerVariants}
        className="w-full max-w-6xl bg-[#0F0F0F] border border-[#2E2E2E] rounded p-4 flex items-center justify-center space-x-4 mb-8"
      >
        <Image
          width={40}
          height={40}
          src="/media/Group 11.svg"
          alt="icon"
          className="w-10 h-10"
        />
        <Image
          width={64}
          height={64}
          src="/media/Group 14.svg"
          alt="icon"
          className="w-16 h-16"
        />
        <Image
          width={40}
          height={40}
          src="/media/Group 15.svg"
          alt="icon"
          className="w-10 h-10"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="w-full max-w-6xl bg-[#0F0F0F] border border-[#2E2E2E] rounded p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={serviceCardVariants}
              className="relative"
            >
              <motion.h2
                variants={titleVariants}
                className="text-lg font-bold mb-4"
              >
                {service.title}
              </motion.h2>
              <motion.ul
                variants={containerVariants}
                className="space-y-2"
              >
                {service.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    variants={listItemVariants}
                    className="text-sm font-light"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              {index < services.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HorizontalScroll