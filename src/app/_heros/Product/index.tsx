'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'
import classes from './index.module.scss'
import { useAuth } from '../../_providers/Auth'
import { addToWishlist } from '../../../payload/utilities/addToWishlist'
import Image from 'next/image'
import Link from 'next/link'
import ReviewForm from '../../_components/ReviewForm'
import { useCart } from '../../_providers/Cart'
import { Media as mediaType } from '../../../payload/payload-types'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product: initialProduct }) => {
  // State management
  const [product, setProduct] = useState(initialProduct)
  const { id, title, categories, meta: { image: metaImage, description } = {}, variants } = product
  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()
  console.log("meta iamge", metaImage)
  const { user } = useAuth()
  const [wishlistID, setwishlistID] = useState('')
  const [cartvalue, setcartvalue] = useState(0)
  const [colors, setcolors] = useState([])
  const [colorProducts, setColorProducts] = useState({})
  const [added, setadded] = useState(false)
  const [wishlist, setwishlist] = useState([])
  const [showReviewForm, seshowReviewForm] = useState(false)
  const [feedback, setfeedback] = useState([])
  const [selectedSize, setSelectedSize] = useState('small')
  const [imagess, setimagess] = useState([])
  const [displayedImage, setdisplayedImage] = useState(metaImage)
  const [sleeveLength, setSleeveLength] = useState(17)
  const [sizeActive, setsizeActive] = useState('S')
  const [chest, setChest] = useState(19)
  const [imagesLoading, setimagesLoading] = useState(true)
  const [sizeName, setsizeName] = useState('Small')
  const [preloadedImages, setPreloadedImages] = useState({})
  const [initialSizeData, setinitialSizeData] = useState({
    small: { val: 1 },
    medium: { val: 1 },
    large: { val: 1 },
    XL: { val: 1 },
  })

  const [stockData , setstockData] = useState(variants)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Review functionality
  
  async function PostReview(bodyObject) {
    const postReview = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObject),
    })
    const postedResult = await postReview.json()
    setfeedback([...feedback, postedResult.doc])
  }

  // Wishlist functionality
  async function add() {
    if (!user?.id) return

    if (!added) {
      setadded(true)
      const data = await addToWishlist(id, user.id)
      setwishlistID(data.doc.id)
    } else {
      setadded(false)
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist/${wishlistID}`, {
        method: 'DELETE',
      })
    }
  }

  // Check wishlist status
  useEffect(() => {
    async function checkWishlist() {
      if (user?.id) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist?where[product][equals]=${id}&where[user][equals]=${user.id}`,
        )
        const response = await res.json()

        if (response.docs.length) {
          setadded(true)
          setwishlistID(response.docs[0].id)
        } else {
          setadded(false)
          setwishlistID('')
        }
      }
    }

    checkWishlist()
  }, [id, user?.id])
  useEffect(() => {
    if (!id) return 
    const storedData = localStorage.getItem(`${id}-initializedData`)
    if (storedData) {
      setinitialSizeData(JSON.parse(storedData))
    }
  }, [id])
  // Cart quantity management
  function setvalue(op) {
    setinitialSizeData(prevData => {
      const newData = { ...prevData }

      if (op === 'inc') {
        newData[selectedSize] = {
          ...prevData[selectedSize],
          val: prevData[selectedSize].val + 1,
        }
      } else {
        if (prevData[selectedSize].val > 1) {
          newData[selectedSize] = {
            ...prevData[selectedSize],
            val: prevData[selectedSize].val - 1,
          }
        }
      }

      localStorage.setItem(`${id}-initializedData`, JSON.stringify(newData)) // Save updated data
      return newData
    })
  }

  
  function addHyphenToSpace(str) {
    return str.toLowerCase().replace(/\s+/g, '-')
  }

  // Image management
  const swapImage = (image: string) => {
    if (image) {
      const imgToReplace = imagess.indexOf(image)
      const newImages = [...imagess]
      newImages.splice(imgToReplace, 1)
      console.log("displayedImage", displayedImage)
      if(displayedImage.filename.startsWith("https")){
        console.log("got true")
        newImages.push(
          displayedImage.filename
        )
      }else{
        newImages.push(
          `https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/${displayedImage.filename}`,
        )
      }
      setimagess(newImages)

      const newDisplayedImage: mediaType = {
        ...metaImage,
        filename: image.replace('https://momifa-storage-bucket.s3.eu-west-2.amazonaws.com/', ''),
      }
      setdisplayedImage(newDisplayedImage)
    }
  }

  // Size management
  function setSizeAndSliderValue(size) {
    if (size === 'S') {
      setSelectedSize('small')
      setSleeveLength(17)
      setChest(19)
      setsizeName('Small')
      setsizeActive(size)
    } else if (size === 'M') {
      setSelectedSize('medium')
      setSleeveLength(19)
      setChest(20)
      setsizeName('medium')
      setsizeActive(size)
    } else if (size === 'L') {
      setSleeveLength(20)
      setChest(21)
      setsizeName('large')
      setSelectedSize('large')
      setsizeActive(size)
    } else if (size === 'XL') {
      setSleeveLength(21)
      setChest(22)
      setSelectedSize('XL')
      setsizeName('XL')
      setsizeActive(size)
    }
  }

  // Preload images for color variants
  const preloadColorImages = async productId => {
    try {
      const imagesRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/images?productId=${productId}`,
      )
      const imagesArray = await imagesRes.json()
      return imagesArray
    } catch (error) {
      console.error('Error preloading images:', error)
      return []
    }
  }

  // Initial data load
  useEffect(() => {
    async function loadInitialData() {
      try {
        setimagesLoading(true)
        const [productsRes, feedbackRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?limit=100`),
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/feedback?where[product][equals]=${id}&depth=2`,
          ),
        ])

        const [productsData, feedbackData] = await Promise.all([
          productsRes.json(),
          feedbackRes.json(),
        ])

        setfeedback(feedbackData.docs)

        const variants = {}
        const colorArr = []
        const imagePromises = []

        productsData.docs.forEach(prod => {
          if (prod.categories[0].title === categories[0].title) {
            variants[prod.color] = prod
            colorArr.push({
              color: prod.color,
              link: addHyphenToSpace(prod.title),
            })
            imagePromises.push(preloadColorImages(prod.id))
          }
        })

        const preloadedImagesData = await Promise.all(imagePromises)
        const preloadedImagesMap = {}
        colorArr.forEach((color, index) => {
          preloadedImagesMap[color.color] = preloadedImagesData[index]
        })

        setPreloadedImages(preloadedImagesMap)
        setColorProducts(variants)
        setcolors(colorArr)

        const imagesRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/images?productId=${id}`,
        )
        const imagesArray = await imagesRes.json()
        setimagess(imagesArray)
        setimagesLoading(false)
      } catch (error) {
        console.error('Error loading initial data:', error)
        setimagesLoading(false)
      }
    }

    loadInitialData()
  }, [id, categories])

  // Color change handler with optimized image loading
  const handleColorChange = async colorData => {
    const newProduct = colorProducts[colorData.color]

    if (newProduct) {
      setIsTransitioning(true) // Add this line
      setProduct(newProduct)

      const preloadedProductImages = preloadedImages[colorData.color]
      if (preloadedProductImages) {
        setimagess(preloadedProductImages)
      }

      if (newProduct.meta?.image) {
        setdisplayedImage(newProduct.meta.image)
      }

      setcartvalue(0)
      setSelectedSize('S')
      setSizeAndSliderValue('S')
      setinitialSizeData({
        small: { val: 1 },
        medium: { val: 1 },
        large: { val: 1 },
        XL: { val: 1 },
      })
    }

    setTimeout(() => {
      setIsTransitioning(false)
      setimagesLoading(false)
    }, 100)
  }

  return (
    <div className="overflow-x-hidden flex flex-col justify-center items-center md:justify-start md:items-start  pt-6">
      <Image
        src="/media/MOMIFA.png"
        alt="MOMIFA"
        height={150}
        width={70}
        className={`${classes.rotatedText}`}
      />
      <Gutter className={classes.productHero}>
        <div className={classes.mainn}>
          <div className={classes.imagess}>
            {imagess.map(image => (
              <div
                key={image}
                onClick={() => swapImage(image)}
                className={`${classes.imagessImage} rounded-xl`}
              >
                <Image
                  className={classes.imageclass}
                  src={image}
                  width={100}
                  height={40}
                  alt="image"
                  loading="eager" // Added this
                  priority // Added this
                />
              </div>
            ))}
          </div>
          <div className={classes.vig}>
            <Media imgClassName={classes.image} resource={displayedImage} />
           
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black opacity-30 rounded-xl" />
          </div>
          <div className={`${classes.detailsDiv}`}>
            <div className={classes.responsivee}>
              <h3 className={classes.productTitle}>{title}</h3>
              <h4 className={classes.dText}>Description </h4>
              <p className={classes.description}>{description}</p>
            </div>
            <h2 className="text-white my-2 text-2xl">
              <Price product={product} button={false} />
            </h2>
            <div className={classes.responsivee2}>
              <h4 className="text-white text-md mt-2">Colors</h4>
              {colors.map(colorData => (
                <span
                  key={colorData.color}
                  onClick={() => handleColorChange(colorData)}
                  style={{ backgroundColor: colorData.color }}
                  className={`cursor-pointer inline-block w-8 h-8 rounded-full m-1 border-white border-2`}
                />
              ))}
            </div>
            <p className={classes.stockText}> 
              In Stock :
               {variants.find((e) => sizeActive === e.size)?.stock ? 
                variants.find((e) => sizeActive === e.size).stock :
                "No stock Data Found" 
              } </p>
            <div className={classes.sizeButtons}>
              {stockData.length > 0 
              ? (
                stockData.map((elemet: any) => {
                  return (
                    <button
                      key={elemet.size}
                      onClick={() => setSizeAndSliderValue(elemet.size)}
                      className={`${classes.sizeButton} ${
                        sizeActive === elemet.size ? classes.activeSize : ''
                      }`}
                    >
                      {elemet.size}
                    </button>
                  )
                })
              ) : (
                <p>no size data available for this product </p>
              )}
            </div>
            <div className={classes.sliderContainer}>
              <label className={classes.sliderLabel}>
                Chest:{' '}
                {sleeveLength === 17
                  ? '17-18'
                  : sleeveLength === 19
                  ? '18-19'
                  : sleeveLength === 20
                  ? '19-20'
                  : '20-21'}{' '}
                Inches
              </label>
              <input
                type="range"
                min="17"
                max="21"
                disabled
                value={sleeveLength}
                onChange={e => setSleeveLength(Number(e.target.value))}
                className={classes.slider}
              />
            </div>
            <div className={classes.sliderContainer}>
              <label className={classes.sliderLabel}>Waist: {chest} Inches</label>
              <input
                type="range"
                min="19"
                max="22"
                disabled
                value={chest}
                onChange={e => setChest(Number(e.target.value))}
                className={classes.slider}
              />
            </div>
            <div className={classes.quan}>
              <div className={classes.quan2}>
                <h4 className="text-white sm:flex text-sm inline lg:block">Quantity</h4>
                <div className="relative lg:block lg:left-0 lg:top-0 sm:left-[7em] sm:top-[-2.2em] sm:mx-3 sm:my-2">
                  <div className="flex items-center justify-center mt-3 sm:justify-center sm:items-center md:justify-start md:items-start lg:justify-start lg:items-start">
                    <div className="flex text-lg text-white text-center">
                      <div className="text-xl w-10 h-10 bg-[#262626] text-center rounded-s-3xl cursor-pointer flex items-center justify-center">
                        <span onClick={() => setvalue('reduce')}>-</span>
                      </div>
                      <div className="text-xl w-10 h-10 bg-[#262626] text-center flex items-center justify-center">
                        {initialSizeData[selectedSize].val}
                      </div>
                      <div className="text-xl w-10 h-10 bg-[#262626] text-center rounded-e-3xl cursor-pointer flex items-center justify-center">
                        <span onClick={() => setvalue('inc')}>+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.btns}>
              <AddToCartButton
                quantity={
                  initialSizeData[selectedSize].val === 0
                    ? initialSizeData[selectedSize].val + 1
                    : initialSizeData[selectedSize].val
                }
                product={product}
                className={classes.addToCartButton}
                size={`${sizeName} : Chest - ${sleeveLength} Waist - ${chest}`}
              />
              <button
                onClick={add}
                className={`${classes.wishlistButton} ${added ? 'added' : 'not-added'}`}
              >
                {added ? (
                  <span key="remove">❤️ Remove From Wishlist</span>
                ) : (
                  <span key="add">❤️ Add To Wishlist</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </Gutter>
      <div className="flex justify-center mx-auto mt-[13.5rem] mb-5 md:mt-[0rem]">
        <h2 className="text-3xl text-white mx-auto text-center lg:text-4xl">Reviews</h2>
        <h2 className="text-3xl text-white mx-2 text-center lg:text-4xl"> | </h2>
        <button
          onClick={() => {
            seshowReviewForm(!showReviewForm)
          }}
          className={`${classes.postReviewButton}`}
        >
          {showReviewForm === false ? <span>Post a Review</span> : <span>Cancel Review</span>}
        </button>
      </div>
      <ReviewForm
        showReviewForm={showReviewForm}
        productId={id}
        postReview={PostReview}
        value={showReviewForm}
      />
      {feedback.map((e, i) => {
        return (
          <div key={i}>
            <div className="flex items-center text-center lg:ml-40 ml-10 p-2">
              <h3 className="text-white text-2xl capitalize font-bold">
                {e.user.name ? e.user.name : e.user}
              </h3>
              <h3 className="text-2xl text-yellow-500 font-bold ml-2">{'★'.repeat(e.rating)}</h3>
            </div>
            <hr className="border-white mx-11 lg:mx-32 lg:hidden" />
            <p className="text-white text-lg p-2 lg:mx-40 mx-10 lg:text-md">{e.review}</p>
          </div>
        )
      })}
    </div>
  )
}
