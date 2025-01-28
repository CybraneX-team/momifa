'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
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
    <div className="relative w-full h-screen bg-[#1A151E] overflow-hidden font-montserrat">
      {/* Background Image for Lines */}
      <div className="absolute inset-0 z-40 bg-[url('/media/mobile-hero.svg')] h-full w-full bg-no-repeat bg-cover md:bg-none">
        <img
          src="/media/Group 2 (1).svg"
          alt="Bg"
          className="hidden md:block w-[80%] h-[160%]  z-40"
        />
      </div>

      {/* Main Content */}
      <div className="flex h-full w-full pt-20 md:pt-0 md:pl-16">
        {/* Left Content */}
        <div className=" flex flex-col md:justify-center pt-20 md:pt-0 px-6 md:px-12 z-50">
          <div className="w-screen md:w-full">
            <img
              src="/media/h-img.png"
              alt=""
              className="rounded-xl mx-auto h-96 w-[20rem] ml-8 md:hidden"
            />
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight md:mb-4 z-40 -mt-20 ">
            Clothes For Every
            <br />
            Occasion Every Moment
          </h1>
          <p className="text-gray-300 text-xl mb-8">Explore Momifa Store</p>

          {/* Glass Card */}
          {/* <div className="bg-[#0f0f0f74] backdrop-blur-md rounded-xl p-5 md:p-8 w-[120%] md:max-w-lg h-60 z-50 shadow-inner inset-0 border-[#58598aa2] border-[1px] shadow-[#58598a96] stroke-[#58598A] stroke-2">
            <h3 className="text-[#B7B0FF] text-xl md:text-2xl font-semibold mb-4">
              Premium Quality at Fingertips.
            </h3>
            <p className="text-gray-300">
              Branded products and accessories. With contribution towards nature and cleanliness.
              Now at affordable pricing.
            </p>
          </div> */}
        </div>

        {/* Right Content - Image Section */}
        <div className="relative w-1/2">
          {/* Diagonal Overlay */}
          <div className="absolute inset-0 md:bg-gray-900 transform -skew-x-12 origin-top-right translate-x-32"></div>

          {/* Image */}
          <div className="absolute inset-0  transform translate-x-28 hidden md:block">
            <img
              src="/media/hero.png"
              alt="Model wearing casual business attire"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
