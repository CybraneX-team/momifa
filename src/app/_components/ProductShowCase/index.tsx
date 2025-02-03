'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './index.module.scss'
import VariantPreview from '../VariantPreview'
import Image from 'next/image'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import { FlipWords } from '../ui/FlipWords'

const ProductDisplay: React.FC = () => {
  const [baseURL, setbaseURL] = useState(
    'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/',
  )

  const [currentColor, setCurrentColor] = useState('blue')
  const [currentVariant, setCurrentVariant] = useState('plain')
  const [isHovered, setisHovered] = useState<Record<string, boolean>>({})

  const variants = {
    plain: {
      colors: {
        blue: {
          color: '#9fcbd6',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/aqua-plain-t-shirt-unisex',
        },
        red: {
          color: '#f46e65',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/cherry-red-plain-t-shirt-unisex',
        },
        white: {
          color: '#ffffff',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/vanilla-plain-t-shirt-unisex',
        },
        green: {
          color: '#a2b7a1',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/mint-plain-t-shirt-unisex',
        },
        darkblue: {
          color: '#0464b8',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/royal-blue-plain-t-shirt-unisex',
        },
        gray: {
          color: '#626063',
          imageUrl: `/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`,
          buyNowLink: '/products/grey-marl-plain-t-shirt-unisex',
        },
      },
    },
    polo: {
      colors: {
        minkGray: {
          color: '#5F5249',
          imageUrl: `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/mink-gray.png`,
          buyNowLink: `/products/mink-gray`,
        },
        aquablue: {
          color: '#7ABAD3',
          imageUrl: 'https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/aqual-blue.png',
          buyNowLink: `/products/aqua-blue`,
        },
        frenchPink: {
          color: '#d801c0',
          imageUrl: `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/french-pink.png`,
          buyNowLink: `/products/french-pink`,
        },
        rolexGreen: {
          color: '#3F613F',
          imageUrl: `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/rolex-green.png`,
          buyNowLink: `/products/rolex-green`,
        },
        vistaWhite: {
          color: '#F9F5ED',
          imageUrl: `${baseURL}Vista%2BWhite%2B-%2B2-removebg-preview.png`,
          buyNowLink: `/products/vista-white`,
        },
        cobaltBlue: {
          color: '#2B83B4',
          imageUrl: `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/cobalt-bluew.png`,
          buyNowLink: `/products/cobalt-blue`,
        },
        RichCream: {
          color: '#F1DABD',
          imageUrl: `${baseURL}Rich%2BCream%2B-%2B1-removebg-preview.png`,
          buyNowLink: `/products/rich-cream`,
        },
        onyxBlack: {
          color: '#1C1913',
          imageUrl: `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/onyx-black.png`,
          buyNowLink: `/products/onyx-black`,
        },
      },
    },
    branded: {
      colors: {
        blackHoodie: {
          color: '#1B181B',
          imageUrl: `${baseURL}16064970992068608875_2048__1_-removebg-preview.png`,
          buyNowLink: '',
        },
        redHoodie: {
          color: '#BE2B35',
          imageUrl: `${baseURL}14223432531880195733_2048-removebg-preview.png`,
          buyNowLink: '',
        },
        whiteHoodie: {
          color: 'white',
          imageUrl: `${baseURL}9879001911551987587_2048-removebg-preview.png`,
          buyNowLink: '',
        },
      },
    },
    brandedtshirt: {
      colors: {
        blackbranded: {
          color: '#1B181B',
          imageUrl: `${baseURL}1-removebg-preview.png`,
          buyNowLink: '/products/black-flex-t-shirt',
        },
        whitebranded: {
          color: 'white',
          imageUrl: `${baseURL}2-2-removebg-preview.png`,
          buyNowLink: '/products/white-flex-t-shirt-',
        },
      },
    },
  }

  const [isMobile, setIsMobile] = useState(false)
  const [href, sethref] = useState('')
  const [imgUrl, setimgUrl] = useState(`/media/tshirt/tshirt-${currentColor}-${currentVariant}.png`)
  const [buyNowLink, setbuyNowLink] = useState('/products/aqua-plain-t-shirt-unisex')

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

  const rotateColor = useCallback(() => {
    const colorKeys = Object.keys(variants[currentVariant].colors)
    const currentIndex = colorKeys.indexOf(currentColor)
    const nextIndex = (currentIndex + 1) % colorKeys.length
    const nextColor = colorKeys[nextIndex]

    setCurrentColor(nextColor)
  }, [currentVariant, currentColor, variants])

  // Rotation Interval
  useEffect(() => {
    const rotationInterval = setInterval(rotateColor, 3000)
    return () => clearInterval(rotationInterval)
  }, [rotateColor])

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

  useEffect(() => {
    if (!variants[currentVariant]?.colors?.[currentColor]) {
      const newColor = setVariantColor(currentVariant)
      setCurrentColor(newColor)
    }
  }, [currentVariant])

  useEffect(() => {
    if (variants[currentVariant]?.colors?.[currentColor]) {
      setimgUrl(variants[currentVariant].colors[currentColor].imageUrl)
      setbuyNowLink(variants[currentVariant].colors[currentColor].buyNowLink)
    }
  }, [currentColor, currentVariant])

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

  function getBackgroundColor(currentColor) {
    return `linear-gradient(44.52deg, #111517 5.12%, ${variants[currentVariant]['colors'][currentColor]?.color} 97.99%)`
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
                  backgroundColor: `${variants[currentVariant]['colors'][e].color}`,
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
          <div className={styles.imgDiv}>
            <motion.div
              key={imgUrl}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Image
                style={
                  currentVariant === 'plain' && !isMobile
                    ? {
                        zIndex: -1,
                        top: getTopValue(currentColor),
                        position: 'absolute',
                        left: '8em',
                      }
                    : currentVariant === 'plain' && isMobile
                    ? {
                        position: 'absolute',
                        bottom: '55.1em',
                        zIndex: -1,
                      }
                    : currentVariant === 'polo' && isMobile
                    ? {
                        position: 'absolute',
                        top: '-32em',
                        width: '38rem',
                        height: '40rem',
                      }
                    : currentVariant === 'polo'
                    ? {
                        zIndex: -1,
                        top: '-13.6em',
                        position: 'absolute',
                        height: '35rem',
                        left: '1em',
                        width: '33rem',
                      }
                    : currentVariant === 'branded'
                    ? {
                        zIndex: 2,
                        position: 'absolute',
                        left: '5em',
                        top: '-15.3em',
                        width: '30rem',
                        height: '34rem',
                      }
                    : currentVariant === 'brandedtshirt' && isMobile
                    ? {
                        left: '1em',
                        top: '-35.3em',
                        width: '34rem',
                        height: '34rem',
                      }
                    : currentVariant === 'brandedtshirt'
                    ? {
                        zIndex: 2,
                        position: 'absolute',
                        left: '7em',
                        top: '-15.3em',
                        width: '32rem',
                        height: '34rem',
                      }
                    : currentVariant === 'brandedtshirt' && isMobile
                    ? {
                        left: '1em',
                        top: '-42.3em',
                        width: '32rem',
                        height: '47rem',
                      }
                    : undefined
                }
                alt="image"
                src={imgUrl}
                height={1000}
                width={416}
              />
            </motion.div>
          </div>
          <div
            className={styles.skewDiv}
            style={{
              background: getBackgroundColor(currentColor),
            }}
          ></div>
          <div className={styles.colorVarient}>
            {Object.keys(variants[currentVariant]['colors']).map(colorKey => {
              return (
                <div
                  key={colorKey}
                  style={{
                    background:
                      currentColor === colorKey || isHovered[colorKey]
                        ? `linear-gradient(to right, ${variants[currentVariant]['colors'][colorKey].color} 60%, rgba(0,0,0,0.3))`
                        : variants[currentVariant]['colors'][colorKey].color,
                    height: '28px',
                    width: currentColor === colorKey || isHovered[colorKey] ? '170px' : '13px',
                    margin: '1em',
                    position: 'relative',
                    left: '21em',
                    cursor: 'pointer',
                    bottom: '59em',
                    textAlign: 'left',
                    transform: 'rotate(-10deg) skew(-9deg)',
                    transformOrigin: 'left center',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: currentColor === colorKey || isHovered[colorKey] ? '20px' : '0', // Add padding for text
                  }}
                  onMouseEnter={() => setisHovered(prev => ({ ...prev, [colorKey]: true }))}
                  onMouseLeave={() => setisHovered(prev => ({ ...prev, [colorKey]: false }))}
                  onClick={() => {
                    setCurrentColor(colorKey)
                  }}
                >
                  {currentColor === colorKey || isHovered[colorKey] ? (
                    <span
                      style={{
                        color:
                          variants[currentVariant]['colors'][colorKey].color === '#ffffff' ||
                          variants[currentVariant]['colors'][colorKey].color === 'white'
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
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="ml-10">
          <div className={styles.menu}>
            <div className="p-8 min-h-[300px] flex items-center mb-10">
              <nav className="relative w-[250px] flex">
                <div className="flex-1 pr-8">
                  {menuItems.map(item => (
                    <div
                      key={item.name}
                      className="relative group py-1 mt-2"
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
                              ? 'text-white text-lg font-bold'
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
          <Link href={buyNowLink}>
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
