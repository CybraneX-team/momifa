'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SparklesCore } from '../../ui/sparkle'
import { noHeaderFooterUrls } from '../../../constants'
import classes from './index.module.scss'

const FooterComponent = ({ footer }) => {
  const pathname = usePathname()
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const footerLinks = [
    {
      title: 'Useful Links',
      items: [
        { item: 'About us', url: '/about' },
        { item: 'Our Story', url: '/our-story' },
        { item: 'Quality', url: '/quality' },
        { item: 'Contact us', url: '/contact-us' },
      ],
    },
    {
      title: 'Information',
      items: [
        { item: 'Privacy Policy', url: '/privacy' },
        { item: 'Terms of Service', url: '/terms-of-service' },
        { item: 'Refund Policy', url: '/refund-policy' },
        { item: 'Apply for Collabs', url: '/collab' },
      ],
    },
    {
      title: 'Contact',
      items: [
        { item: '+1 732-232-5549', url: '#' },
        { item: 'hello@momifa.com', url: 'mailto:support@sendpotion.com' },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: '/media/icon.svg',
      url: 'https://www.instagram.com/momifa.official/profilecard/?igsh=bGg0b3d5YTJiZDVo',
    },
    { icon: '/media/icon2.svg', url: 'https://x.com/MomifaOfficial' },
    { icon: '/media/pinterest.svg', url: 'https://in.pinterest.com/momifaofficial/' },
    { icon: '/media/fb.svg', url: 'https://www.facebook.com/MomifaOfficial?mibextid=ZbWKwL' },
    { icon: '/media/medium.svg', url: 'https://medium.com/@momifa.official' },
    { icon: '/media/tiktok.svg', url: 'https://www.tiktok.com/@momifa.official' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  const MotionDiv = motion.create('div')
  const MotionH2 = motion.create('h2')
  const MotionH3 = motion.create('h3')

  return (
    <footer
      ref={ref}
      className={`z-999 relative bg-transparent text-white py-16 px-4 md:px-12 lg:px-48 shadow-[inset_1px_1px_10px_#f0e4ff95] rounded-t-[30px] mt-5 ${
        noHeaderFooterUrls?.includes(pathname) ? 'hidden' : ''
      }`}
    >
      <MotionDiv
        className="relative flex flex-col items-center z-999"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <SparklesCore className="absolute inset-0 z-[-1]" />
        
        {/* Logo Section */}
        <MotionDiv className="text-center mb-12" variants={itemVariants}>
          <Link href="/" className="inline-block mb-4">
          <motion.svg
              className={classes.logo}
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 496.93 121.26"
              variants={itemVariants}
            >
              <path
                d="M291.8,310.19H273.4l-.14-.14a.44.44,0,0,1-.08-.11.51.51,0,0,1,0-.13,1.24,1.24,0,0,1,0-.27.57.57,0,0,1,0-.13V209a.57.57,0,0,0,0-.13v-.14s0-.09,0-.13a.65.65,0,0,0,0-.13.61.61,0,0,0-.05-.12c-.94-.28-15.58-.38-17.87-.12a5.31,5.31,0,0,0-.18.85c0,.45,0,.9,0,1.35V310c-1.06.32-16.2.43-18.7.15-.15-3.33-.05-6.7-.07-10.05s0-6.85,0-10.28V208.33c-1.1-.31-16.64-.39-18.6-.11-.13,3.06,0,6.15,0,9.24s0,6.13,0,9.19v83.49H198.73V189.3c1-.28,90.68-.39,93-.13C292,190.11,292.11,308.41,291.8,310.19Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M76.41,208.16H58.2c0,3.45,0,6.81,0,10.17v91.84H39.38V208.39c-1.05-.38-16-.51-18.53-.2a4.57,4.57,0,0,0-.16.85c0,.45,0,.9,0,1.36V310c-1.1.29-17.32.34-18.76.06V189.17H95.16v121H76.41Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M179.8,189.21v121H114.11V189.3C115.13,189,177.92,188.94,179.8,189.21ZM160.91,291.1c.26-1.8.17-81.91-.07-82.88-1.84-.3-27-.2-27.9.13V291.1Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M480.09,259.23H451.8c-.16,1.7-.06,3.4-.07,5.09s0,3.34,0,5V310c-1.05.32-17.08.39-18.75.1V189.3c1-.29,64.45-.33,65.87,0V310.14H480.16c0-.53-.07-1.09-.07-1.66q0-23.72,0-47.45Zm-28.37-51.05v16c0,2.65,0,5.31,0,8s-.15,5.27.11,7.89H480V208.18Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M367.29,310.18h-18.6c-.31-1.07-.35-119.59-.05-121h65.47v18.91H367.36v32c1.82.06,3.61,0,5.39,0s3.7,0,5.55,0h27.22v19l-4.71,0H367.29Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M329.45,310.19h-18.4a1,1,0,0,1-.14-.13s-.08-.07-.08-.11c0-.36-.08-.71-.08-1.07q0-59.62,0-119.25a1.57,1.57,0,0,1,.16-.46h18.45C329.66,190.1,329.76,308.31,329.45,310.19Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
            </motion.svg>
          </Link>
          <MotionH2 className="text-xl md:text-2xl" variants={itemVariants}>
            Shop Branded Goods From Here
          </MotionH2>
        </MotionDiv>

        {/* Links Section - Grid with center alignment */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 justify-items-center text-center">
          {footerLinks.map((column, index) => (
            <MotionDiv key={index} variants={itemVariants} className="flex flex-col items-center">
              <MotionH3 variants={itemVariants} className="font-semibold text-lg md:text-xl mb-6">
                {column.title}
              </MotionH3>
              <ul className="space-y-4">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link 
                      href={item.url}
                      className="text-[#eee3ff] hover:underline decoration-[#eee3ffad] transition-colors duration-300"
                    >
                      {item.item}
                    </Link>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>

        {/* Social Links Section */}
        <MotionDiv className="text-center w-full" variants={containerVariants}>
          <MotionH3 variants={itemVariants} className="font-bold text-xl mb-6">
            Socials
          </MotionH3>
          <MotionDiv className="flex justify-center gap-6 flex-wrap" variants={containerVariants}>
            {socialLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.url}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <Image 
                  src={link.icon} 
                  alt="social icon" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
              </Link>
            ))}
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
    </footer>
  )
}

export default FooterComponent