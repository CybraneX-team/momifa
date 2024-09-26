'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './index.module.scss'
import VariantPreview from '../VariantPreview'

const ProductDisplay: React.FC = () => {
  const [currentColor, setCurrentColor] = useState('blue')
  const [currentVariant, setCurrentVariant] = useState('plain')

  const variants = {
    plain: {
      colors: {
        blue: '#9fcbd6',
        red: '#f46e65',
        white: '#ffffff',
        green: '#a2b7a1',
        darkblue: '#0464b8',
        gray: '#626063',
      },
    },
    polo: {
      colors: {
        beige: '#caba98',
        blue: '#0000bb',
        pink: '#d801c0',
      },
    },
  }

  const variantList = Object.keys(variants)

  const handleColorChange = (color: string) => {
    setCurrentColor(color)
  }

  const handlePreviousVariant = () => {
    const currentIndex = variantList.indexOf(currentVariant)
    const newIndex = (currentIndex - 1 + variantList.length) % variantList.length
    setCurrentVariant(variantList[newIndex])
    setCurrentColor(Object.keys(variants[variantList[newIndex] as keyof typeof variants].colors)[0])
  }

  const handleNextVariant = () => {
    const currentIndex = variantList.indexOf(currentVariant)
    const newIndex = (currentIndex + 1) % variantList.length
    setCurrentVariant(variantList[newIndex])
    setCurrentColor(Object.keys(variants[variantList[newIndex] as keyof typeof variants].colors)[0])
  }

  const imageVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const getGradientStyle = (color: string, variant: string) => {
    const colorHex =
      variants[variant as keyof typeof variants].colors[
        color as keyof (typeof variants)[keyof typeof variants]['colors']
      ]
    return {
      backgroundColor: 'hsla(0,0%,0%,0)',
      backgroundImage: `
              radial-gradient(at 0% 100%, ${colorHex} 0px, transparent 50%),
              radial-gradient(at 0% 0%, ${colorHex} 0px, transparent 50%)
            `,
      '--bg-color': colorHex,
    } as React.CSSProperties
  }
  const getTitle = (variant: string) => {
    switch (variant) {
      case 'polo':
        return 'Polo T-Shirts'
      default:
        return 'Plain T-Shirts'
    }
  }

  return (
    <div className={styles.container} style={getGradientStyle(currentColor, currentVariant)}>
      <motion.div
        className={styles.colorText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={`${currentColor}-${currentVariant}`}
      >
        <div className={styles.colorTextLine}>
          <div className={styles.colorLine}></div>
          <p>In</p>
        </div>
        <p>love with</p>
        <p className={styles.colorName}>{currentColor}</p>
      </motion.div>

      <h2 className={styles.title} data-content={getTitle(currentVariant)}>
        {getTitle(currentVariant)}
        <motion.span
          className={styles.titleDot}
          animate={{
            color:
              variants[currentVariant as keyof typeof variants].colors[
                currentColor as keyof (typeof variants)[keyof typeof variants]['colors']
              ],
          }}
          transition={{ duration: 0.2 }}
        >
          .
        </motion.span>
      </h2>

      <div className={styles.imageContainer}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`${currentColor}-${currentVariant}`}
            className={`${styles.productImage} ${
              currentVariant === 'polo' ? styles.poloImage : ''
            } max-h-[50rem]`}
            src={`/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`}
            alt={`T-shirt in ${currentColor} - ${currentVariant} style`}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'relative', top: currentColor === 'red' ? '1.567rem' : '1.1rem' }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
        <div className={styles.colorDots}>
          {Object.entries(variants[currentVariant as keyof typeof variants].colors).map(
            ([color, hex]) => (
              <button
                key={color}
                className={`${styles.colorDot} ${color === currentColor ? styles.selected : ''}`}
                style={{ backgroundColor: hex }}
                onClick={() => handleColorChange(color)}
              />
            ),
          )}
        </div>
      </div>

      {/* <VariantPreview
        variants={Object.keys(variants)}
        currentVariant={currentVariant}
        onPrevious={handlePreviousVariant}
        onNext={handleNextVariant}
      /> */}
    </div>
  )
}

export default ProductDisplay
