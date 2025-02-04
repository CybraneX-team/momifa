'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

const priceFromJSON = priceJSON => {
  let price = '$25'
  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount
      price = `${parsed.currency === 'usd' ? '$' : ''}${Math.floor(priceValue / 100)}`
    } catch (e) {
      console.error('Cannot parse priceJSON')
    }
  }
  return price
}

export const Card = ({
  className,
  doc,
  doc: { slug, title, meta, priceJSON } = {},
  containerHeight = '300px',
  containerWidth = '300px',
  rotateAmplitude = 14,
  scaleOnHover = 1.1,
  showTooltip = true,
}) => {
  const { image: metaImage } = meta || {}
  const href = `/products/${slug}`
  const [price, setPrice] = useState(() => priceFromJSON(priceJSON))

  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  })
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    setPrice(priceFromJSON(priceJSON))
  }, [priceJSON])

  function handleMouse(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude
    rotateX.set(rotationX)
    rotateY.set(rotationY)
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.6)
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  // Get complete image URL
  const getImageUrl = () => {
    if (!metaImage) return null
    if (typeof metaImage === 'string') return metaImage

    // Handle different image URL formats
    const baseUrl =
      process.env.NEXT_PUBLIC_S3_URL || 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com'
    const imagePath = metaImage.filename || metaImage.url || ''

    // Ensure the path starts with '/'
    const formattedPath = imagePath.startsWith('https') ?
     imagePath.replace('https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com', "")
     : `/${imagePath}`
    console.log("formatted path ", formattedPath)
    return  formattedPath.startsWith(`https`) ?  `${formattedPath}`  :  `${baseUrl}${formattedPath}`
  }

  const imageUrl = getImageUrl()

  return (
    <Link href={href}>
      <figure
        ref={ref}
        className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
        style={{
          height: containerHeight,
          width: containerWidth,
        }}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{
            width: containerWidth,
            height: containerHeight,
            rotateX,
            rotateY,
            scale,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="relative w-full h-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title || 'Product image'}
                  className="rounded-[15px] will-change-transform [transform:translateZ(0)]"
                  style={{
                    objectFit: 'cover',
                    backgroundColor: 'white',
                    mixBlendMode: 'lighten',
                    filter: 'brightness(1.1) contrast(1.2)',
                  }}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-[15px] flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-xl">
                  -22%
                </span>
                <span className="text-gray-400 line-through text-sm">$40.00</span>
              </div>
              <motion.div className="absolute bottom-4 w-full px-4 flex justify-between items-center z-10 [transform:translateZ(30px)]">
                <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                  <p className="text-white text-sm">{title}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                  <p className="text-white text-sm">{price}</p>
                </div>
              </motion.div>
              {/* Vignette Effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black opacity-50" />
            </div>
          </div>
        </motion.div>

        {showTooltip && (
          <motion.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption,
            }}
          >
            {title}
          </motion.figcaption>
        )}
      </figure>
    </Link>
  )
}

export default Card
