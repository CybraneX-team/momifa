'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './index.module.scss'
import VariantPreview from '../VariantPreview'
import Image from 'next/image'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import { FlipWords } from '../ui/FlipWords'
// import { BackgroundColor } from '../BackgroundColor'

const ProductDisplay: React.FC = () => {
  const [currentColor, setCurrentColor] = useState('blue')
  const [currentVariant, setCurrentVariant] = useState('plain')
  const [isMobile, setIsMobile] = useState(false)
  const [href, sethref] = useState('')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    // Update state based on the initial match
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  //
  const getTopValue = color => {
    if (color === 'blue') {
      return '-13.7em'
    } else if (color === 'red') {
      return '-9.4em'
    } else if (color === 'white') {
      return '-11.9em'
    } else if (color === 'green') {
      return '-12.6em'
    } else if (color === 'darkblue') {
      return '-11.5em'
    } else if (color === 'gray') {
      return '-16em'
    }
  }

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
        minkGray: '#5F5249',
        aquablue: '#7ABAD3',
        frenchPink: '#d801c0',
        rolexGreen: '#3F613F',
        vistaWhite: '#F9F5ED',
        cobaltBlue: '#2B83B4',
        RichCream: '#F1DABD',
        onyxBlack: '#1C1913',
      },
    },
    branded: {
      colors: {
        blackHoodie: '#1B181B',
        redHoodie: '#BE2B35',
        whiteHoodie: 'white',
      },
    },
    brandedtshirt: {
      colors: {
        blackbranded: '#1B181B',
        whitebranded: 'white',
      },
    },
  }
  const [activeItem, setActiveItem] = useState('Branded Polos')
  const menuItems = [
    {
      name: 'branded polos',
      gradientClass: 'from-[#0A0610] via-[#2628B6]/50 to-[#7D2CFF]/60',
      varientName: 'polo',
    },
    {
      name: 'plain',
      // gradientClass: 'from-black via-blue-600/90 to-purple-500/90',
      gradientClass: 'from-[#0A0610] via-[#716CFF]/50 to-[#FF47FF]/60',
      varientName: 'plain',
    },
    {
      name: 'branded',
      gradientClass: 'from-[#0A0610] via-[#9E367A]/40 to-[#FF6CCC]/60',
      varientName: 'branded',
    },
    {
      name: 'brandedtshirt',
      gradientClass: 'from-[#0A0610] via-[#9E367A]/40 to-[#FF6CCC]/60',
      varientName: 'brandedtshirt',
    },
  ]
  const getDotPosition = itemName => {
    const index = menuItems.findIndex(item => item.name === itemName)
    return `${index * 60 + 30}px`
  }

  function getURL(colorKey) {
    const baseURL = 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/'

    switch (colorKey) {
      case 'minkGray':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/mink-gray.png`
      case 'frenchPink':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/french-pink.png`
      case 'rolexGreen':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/rolex-green.png`
      case 'onyxBlack':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/onyx-black.png`
      case 'cobaltBlue':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/cobalt-bluew.png`
      case 'vistaWhite':
        return `${baseURL}Vista%2BWhite%2B-%2B2-removebg-preview.png`
      case 'RichCream':
        return `${baseURL}Rich%2BCream%2B-%2B1-removebg-preview.png`
      case 'aquablue':
        return `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/aqual-blue.png`
      case 'blackHoodie':
        return `${baseURL}16064970992068608875_2048__1_-removebg-preview.png`
      case 'redHoodie':
        return `${baseURL}14223432531880195733_2048-removebg-preview.png`
      case 'blueHoodie':
        return `${baseURL}9879001911551987587_2048-removebg-preview.png`
      case 'whiteHoodie':
        return `${baseURL}9879001911551987587_2048-removebg-preview.png`
      case 'blackbranded':
        return `${baseURL}1-removebg-preview.png`
      case 'whitebranded':
        return `${baseURL}2-2-removebg-preview.png`
      default:
        return `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`
    }
  }

  let newLinesObject = {
    blue: 'True blue dreams',
    red: 'Seeing red with passion',
    white: 'Cloud nine in white',
    green: 'Fresh as a green leaf',
    darkblue: 'A sky full of dark blue',
    gray: 'Gray matter magic',
    minkGray: 'In the haze of gray',
    aquablue: 'A sky full of blue',
    frenchPink: 'Cotton candy skies',
    rolexGreen: 'Fresh as a green leaf',
    vistaWhite: 'Cloud nine in white',
    cobaltBlue: 'Lost in the blues',
    RichCream: 'RichCream: Pure Elegance.',
    onyxBlack: 'Dark and divine',
    blackHoodie: 'In the depth of black',
    redHoodie: 'Seeing red with passion',
    whiteHoodie: 'White-hot wonder',
    blackbranded: 'In the depth of black',
    whitebranded: 'White-hot wonder',
  }

  const variantList = Object.keys(variants)

  const handleColorChange = (color: string) => {
    setCurrentColor(color)
  }
  useEffect(() => {
    setCurrentColor(setVariantColor(currentVariant))
  }, [currentVariant])

  // function setVariant(currentVriant: string): string {
  //   let newVariant: string

  //   switch (currentVariant) {
  //     case 'plain':
  //       newVariant = 'polo'
  //       break
  //     case 'polo':
  //       newVariant = 'branded'
  //       break
  //     case 'branded':
  //       newVariant = 'brandedtshirt'
  //       break
  //     case 'brandedtshirt':
  //       newVariant = 'plain'
  //       break
  //     default:
  //       throw new Error('Unknown variant')
  //   }

  //   return newVariant
  // }
  function setVariantColor(currentVariant: string): string {
    let newVariant: string

    switch (currentVariant) {
      case 'plain':
        newVariant = 'blue'
        break
      case 'polo':
        newVariant = 'minkGray'
        break
      case 'branded':
        newVariant = 'blackHoodie'
        break
      case 'brandedtshirt':
        newVariant = 'blackbranded'
        break
      default:
        throw new Error('Unknown variant')
    }

    return newVariant
  }
  function buyNowRedirect() {
    if (currentColor === 'blue') {
      return '/products/aqua-plain-t-shirt-unisex'
    } else if (currentColor === 'blue') {
      return '/products/aqua-plain-t-shirt-unisex'
    }else if(currentColor === "red"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/redd.png'
    }else if(currentColor === "white"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/plainwhite.png'
    }else if(currentColor === "green"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/plain-green.png'
    }else if(currentColor === "darkblue"){
      return '/products/royal-blue-plain-t-shirt-unisex'
    } else if (currentColor === 'gray') {
      return '/products/grey-marl-plain-t-shirt-unisex'
    } else if (currentColor === 'minkGray') {
      return '/products/mink-gray'
    }
    else if(currentColor === "aquablue"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/aqual-blue.png'
    }
    else if(currentColor === "frenchPink"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/french-pink.png'
    }
    else if(currentColor === "rolexGreen"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/rolex-green.png'
    }else if(currentColor === "vistaWhite"){
      return '/products/vista-white'
    }else if(currentColor === "cobaltBlue"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/cobalt-bluew.png'
    }else if(currentColor === "RichCream"){
      return '/products/rich-cream'
    }else if(currentColor === "onyxBlack"){
      return 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/onyx-black.png'
    }
  }

  const initialColors = currentCol => {
    if (currentCol === 'blue') {
      return 'minkGray'
    } else {
      return 'black'
    }
  }
  // console.log("variants[currentVariant]", Object.keys(variants[currentVariant]))
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
      case 'branded':
        return 'Branded Hoodies'
      case 'brandedtshirt':
        return 'Branded T-Shirts'
      default:
        return 'Plain T-Shirts'
    }
  }

  function getBackgroundColor(currentColor) {
    return `linear-gradient(44.52deg, #111517 5.12%, ${variants[currentVariant]['colors'][currentColor]} 97.99%)`
  }
  const wordsArray = ['"Feel the vibes of 1990\'s streets."', '"Modern street fashion"']
  return (
    <div className="font-jakarta">
      <div className={styles.varientSelect}>
        <li
          onClick={() => {
            setCurrentVariant('polo')
          }}
        >
          Branded Polos
        </li>
        {currentVariant === 'polo' ? <hr className={styles.lineCode} /> : <></>}
        <li
          onClick={() => {
            setCurrentVariant('brandedtshirt')
          }}
        >
          Branded T-shirts
        </li>
        {currentVariant === 'brandedtshirt' ? <hr className={styles.line2} /> : ''}
        <li
          onClick={() => {
            setCurrentVariant('plain')
          }}
        >
          Plain
        </li>
        {currentVariant === 'plain' ? <hr className={styles.line3} /> : ' '}
        <li
          onClick={() => {
            setCurrentVariant('branded')
          }}
        >
          Branded
        </li>
        {currentVariant === 'branded' ? <hr className={styles.line4} /> : ''}
      </div>
      <div className="flex">
        <div className={styles.colorWheel}>
          {Object.keys(variants[currentVariant]['colors']).map(e => {
            return (
              <span
                style={{
                  backgroundColor: `${variants[currentVariant]['colors'][e]}`,
                  borderRadius: '100%',
                  height: '20px',
                  width: '20px',
                  alignSelf: 'center',
                  margin: '0 0.3em',
                }}
                onClick={() => {
                  setCurrentColor(e)
                }}
              >
                {' '}
              </span>
            )
          })}
        </div>
        <div className={styles.name}>
          <span className="text-lg relative top-2"> {currentColor} </span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.bgBlack}> </div>
        <div className={styles.coverUpDiv}> </div>
        <div className={styles.contentDiv}>
          <div className="">
            <h1 className={styles.FashionLine}>Fashion at Next level</h1>
            <h5 className={styles.tagLine}>Branded Polo T-Shirts</h5>
          </div>
          {/* <div className="h">
            <h2 className={styles.linehead}> “Feel the vibes of 1990’s streets.” </h2>
            <Link href={`${buyNowRedirect()}`}>
              <button className={styles.buyNowButton}>
                <span className="text-sm">Buy Now </span>
              </button>
            </Link>
          </div> */}
          <div className={styles.imgDiv}>
            <Image
              style={
                currentVariant === 'plain' && !isMobile
                  ? {
                      zIndex: -1,
                      top: getTopValue(currentColor),
                      position: 'absolute',
                      left: "8em"
                    }
                  : currentVariant === 'plain' && isMobile
                  ? {
                      zIndex: -1,
                      top: '-12.5em',
                      position: 'absolute',
                    }
                  : currentVariant === 'polo'
                  ? {
                      zIndex: -1,
                      top: '-13.6em',
                      position: 'absolute',
                      height: '35rem',
                      left: "1em",
                      width: '33rem',
                    }
                  : currentVariant === 'branded'
                  ? {
                    zIndex: 2,
                    position: "absolute",
                    left: "5em",
                    top: "-15.3em",
                    width: "30rem",
                    height: "34rem",
                    }
                  : currentVariant === 'brandedtshirt'
                  ? {
                    zIndex: 2,
                    position: "absolute",
                    left: "7em",
                    top: "-15.3em",
                    width: "32rem",
                    height: "34rem",
                    }
                  : undefined
              }
              alt="image"
              src={getURL(currentColor)}
              height={1000}
              width={416}
            />
          </div>
          <div
            className={styles.skewDiv}
            style={{
              background: getBackgroundColor(currentColor),
            }}
          ></div>
          <div className={styles.colorVarient}>
            {/* {Object.keys(variants[currentVariant]['colors']).map(colorKey => {
              return (
                <div
                  key={colorKey}
                  style={
                    currentVariant === 'polo' || currentVariant === 'plain'
                      ? {
                          background:
                            currentColor === colorKey
                              ? `linear-gradient(to right, ${variants[currentVariant]['colors'][colorKey]} 60%, rgba(0,0,0,0.3))`
                              : variants[currentVariant]['colors'][colorKey],
                          height: '28px',
                          width: currentColor === colorKey ? '155px' : '13px',
                          margin: '1.3em',
                          position: 'relative',
                          left: '21em',
                          cursor: 'pointer',
                          bottom: '59em',
                          textAlign: 'left',
                          transform:
                            currentColor === colorKey ? 'rotate(-12deg)' : 'skew(356deg, 12deg)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }
                      : {
                          background:
                            currentColor === colorKey
                              ? `linear-gradient(to right, ${variants[currentVariant]['colors'][colorKey]} 60%, rgba(0,0,0,0.3))`
                              : variants[currentVariant]['colors'][colorKey],
                          height: '31px',
                          width: currentColor === colorKey ? '150px' : '13px',
                          position: 'relative',
                          margin: '1.3em',
                          left: '23em',
                          cursor: 'pointer',
                          bottom: '59em',
                          transform:
                            currentColor === colorKey ? 'rotate(-12deg) ' : 'skew(356deg, 12deg)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }
                  }
                  onClick={() => {
                    setCurrentColor(colorKey)
                  }} */}
            {Object.keys(variants[currentVariant]['colors']).map(colorKey => {
              return (
                <div
                  key={colorKey}
                  style={{
                    background:
                      currentColor === colorKey
                        ? `linear-gradient(to right, ${variants[currentVariant]['colors'][colorKey]} 60%, rgba(0,0,0,0.3))`
                        : variants[currentVariant]['colors'][colorKey],
                    height: '28px',
                    width: currentColor === colorKey ? '170px' : '13px',
                    margin: '1em',
                    position: 'relative',
                    left: '21em',
                    cursor: 'pointer',
                    bottom: '59em',
                    textAlign: 'left',
                    transform: 'rotate(-10deg) skew(-9deg)', // Removed conditional transform
                    transformOrigin: 'left center', // Add this to keep expansion from left side
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: currentColor === colorKey ? '20px' : '0', // Add padding for text
                  }}
                  onClick={() => {
                    setCurrentColor(colorKey)
                  }}
                >
                  {currentColor === colorKey && (
                    <span
                      style={{
                        color:
                          variants[currentVariant]['colors'][colorKey] === '#ffffff' ||
                          variants[currentVariant]['colors'][colorKey] === 'white'
                            ? 'black'
                            : 'white',
                        fontSize: '15px',
                        fontWeight: '500',
                        transform: 'skew(20deg)', // Counter-skew the text
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {colorKey.toUpperCase()}
                    </span>
                  )}
                </div>
              )
            })}

            {/* <div className="bg-red-800 ">
              <h2 className={styles.linehead}> “Feel the vibes of 1990’s streets.” </h2>
              <Link href={`${buyNowRedirect()}`}>
                <button className={styles.buyNowButton}>
                  <span className="text-sm">Buy Now </span>
                </button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className={styles.sliderDiv}>
          <div className={styles.menu}>
            <div className="p-8 min-h-[300px] flex items-center">
              <nav className="relative w-[250px] flex">
                <div className="flex-1 pr-8">
                  {menuItems.map(item => (
                    <div
                      key={item.name}
                      className="relative group py-2 mt-2"
                      onMouseEnter={() => setActiveItem(item.name)}
                      onClick={() => {
                        setCurrentVariant(item.varientName)
                      }}
                    >
                      {/* Bg */}
                      <div className="absolute inset-0">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeItem === item.name
                              ? 'scale-110 opacity-100'
                              : 'scale-100 opacity-70'
                          }`}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradientClass}`}
                          >
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/90" />
                          </div>
                        </div>
                      </div>
                      <div className="relative p-1 space-y-2">
                        <button
                          className={`w-full text-right transition-all duration-300 ${
                            activeItem === item.name
                              ? 'text-white text-xl font-bold'
                              : 'text-[#888] text-md -p-5 px-1'
                          }`}
                        >
                          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Line & Dot */}
                <div className="relative w-px">
                  <div className="absolute right-0 top-0 w-px h-full bg-gray-700" />
                  <div
                    className="absolute -right-1 w-2 h-2 bg-purple-400 rounded-full transition-all duration-300"
                    style={{
                      top: getDotPosition(activeItem),
                    }}
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="relative top-0">
          <h2 className={styles.linehead}>
            <FlipWords
              words={wordsArray}
              duration={3000} // Optional: Time in milliseconds for each word
              className="" // Optional: Additional Tailwind classes
            />
          </h2>
          <Link href={`${buyNowRedirect()}`}>
            {/* <button
              className={styles.buyNowButton}
              style={{
                backgroundColor: variants[currentVariant]['colors'][currentColor],
                color:
                  variants[currentVariant]['colors'][currentColor] === '#ffffff' ||
                  variants[currentVariant]['colors'][currentColor] === 'white'
                    ? 'black'
                    : 'white',
              }}
            >
              <span className="text-sm">Buy Now </span>
            </button> */}
            <button
              className={`${styles.buyNowButton} group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-80 active:scale-95`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>

              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-[#ffffff8e] blur-xl"></div>
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="glitter-container">
                  <div className="glitter"></div>
                  <div className="glitter"></div>
                  <div className="glitter"></div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="wave"></div>
              </div>

              <span className="relative z-10 flex items-center gap-2">
                <span className="tracking-wider">Buy Now!</span>
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                </svg>
                <span className="absolute bottom-0 left-0 hover:left-8 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-50 transition-transform duration-300 origin-left"></span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay