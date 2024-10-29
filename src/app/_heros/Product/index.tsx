"use client"
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
import toHex from 'colornames'
import Link from 'next/link'
import ReviewForm from '../../_components/ReviewForm'
import { useCart } from '../../_providers/Cart'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { id,title, categories, meta: { image: metaImage, description } = {} } = product
  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()
  const {user} = useAuth()
  const [wishlistID, setwishlistID] = useState("")
  const [cartvalue, setcartvalue] = useState(0)
  const [colors, setcolors] = useState([])
  const [added, setadded] = useState(false)
  console.log("id", id)
  const [disabled, setdisabled] = useState(false)
  const [wishlist, setwishlist] = useState([])
  const [showReviewForm, seshowReviewForm] = useState(false)
  const [feedback, setfeedback] = useState([])
  const [selectedSize, setSelectedSize] = useState('S')
  const [imagess, setimagess] = useState([])
  const [displayedImage, setdisplayedImage] = useState(metaImage)
  const [sleeveLength, setSleeveLength] = useState(17)
  const [chest, setChest] = useState(19)
  const [imagesLoding, setimagesLoading] = useState(true)

  console.log(cart)
  function setvalue(op){
    if(op === "reduce" && cartvalue !== 0){
      setcartvalue(prev=>prev-1)
    }else if(op === "reduce" && cartvalue === 0){
      setcartvalue(0)
    }else{
       setcartvalue(prev=>prev+1)
    }
  }
  
  function addHyphenToSpace(str) {
    return str.toLowerCase().replace(/\s+/g, '-');
  }
  useEffect(() => {
    cart?.items?.map((cartItem)=>{
      if(cartItem.product.id === id){
        setcartvalue(cartItem.quantity)
      }
    })
  }, [])
  useEffect(() => {
    async function getImages(){
      const images = await fetch(`http://localhost:3000/api/images?productId=${id}`)
      const imagesArray = await images.json()
      setimagess(imagesArray)
      setimagesLoading(prev=> prev === true ?false : prev)
    }
    getImages()
  }, [])
  
  useEffect(() => {
    async function get() {
      try {
  
        // Fetch all requests concurrently
        const [res, res2, res3] = await Promise.all([
          fetch(`http://localhost:3000/api/wishlist?where[product][equals]=${id}&where[user][equals]=${user?.id}`),
          fetch(`http://localhost:3000/api/feedback?where[product][equals]=${id}&depth=2`),
          fetch(`http://localhost:3000/api/products?limit=100`)
        ]);
  
        // Parse responses concurrently
        const [response, response2, response3] = await Promise.all([
          res.json(),
          res2.json(),
          res3.json()
        ]);
  
        setfeedback(response2.docs);
        // setimagess(response3.images)
        // Reduce color array
        const colorArr = response3?.docs?.reduce((acc, e) => {
          if (e.categories[0].title === categories[0].title) {
            acc.push({ color: e.color, link: addHyphenToSpace(e.title) });
          }
          return acc;
        }, []);
  
        setcolors(colorArr);
  
        // Set wishlist status
        if (response.docs.length) {
          setadded(true);
          setwishlistID(response.docs[0].id);
        } else {
          setadded(false);
          setwishlistID("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    get();
  }, [id, user?.id, categories]); // Add dependencies for re-execution when necessary
  
  async function PostReview(bodyObject){
    const postReview = await fetch(`http://localhost:3000/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(bodyObject)
    })
    const postedResult = await postReview.json()
    const newUpdatedFeedbacks = [...feedback, postedResult.doc]
    setfeedback(newUpdatedFeedbacks)
  }

  async function add(){
    if(added === false){
      if(user?.id){
        setadded(true)
        const data = await addToWishlist(id, user.id)
        setwishlistID(data.doc.id)
      }else{
        return 
      }
    }else{
      setadded(false)
      const req = await fetch(`http://localhost:3000/api/wishlist/${wishlistID}`, {method: "DELETE"})
      const res = await req.json()
    }    
  }
  function swapImage(image) {
    if (image) {
      const splittedURLArray = image.split("/");
  
      if (metaImage) {
        const indexToReplace = imagess.indexOf(`http://localhost:3000/media/${splittedURLArray[splittedURLArray.length - 1]}`)
        imagess.splice(indexToReplace, 1)
        const newImages = [...imagess, `http://localhost:3000/media/${displayedImage.filename}`]
        setimagess(newImages)
        const newObjext  = {...displayedImage, filename: splittedURLArray[splittedURLArray.length - 1]}
        setdisplayedImage(newObjext)
      }
    }
  }
  function setSizeAndSliderValue(size){
    setSelectedSize(size)
    if(size === "S"){
      setSleeveLength(17)
      setChest(19)
    }else if(size === "M"){
      setSleeveLength(19)
      setChest(20)

    }else if(size === "L"){
      setSleeveLength(20)
      setChest(21)
    }else{
      setSleeveLength(21)
      setChest(22)
    }
  }
  return (
    <>
     <Image 
      src="/media/MOMIFA.png"
      alt='MOMIFA'
      // layout="fill" // Adjust this based on your desired layout
      // objectFit="cover"
      height={150}
      width={70}
      className={classes.rotatedText}
    />
    <Gutter className={classes.productHero}>
      <div className={classes.mainn}>
      {imagesLoding ? <div className={classes.loading} /> :
      <div className={classes.imagess}>
          {imagess.map((image)=>{
            return <div onClick={()=>{swapImage(image)}} className={`${classes.imagessImage} rounded-lg`}>
                <Image className={classes.imageclass} src={image} width={100} height={50} alt='image'/>
            </div>
          })}
      </div>
      }
      <div className={classes.vig}>
      <Media imgClassName={classes.image}  resource={displayedImage}   / >
      </div>
      <div className={classes.detailsDiv} >
      <div className={classes.responsivee}>
      <h3 className={classes.productTitle} >{title}</h3> 
      <h4 className={classes.dText} >Description </h4>
      <p className={classes.description}>  {description} </p>
      </div>
      <br />
      <div className={classes.responsivee2}>
      <h4 className='text-white text-md mt-2' >Colors</h4>
      {colors.map((e)=>{
         const bgClass = `bg-[#262626]-400`; 
         return (
          <Link href={`/products/${e.link}`} >
           <span
             key={e}
             style={{backgroundColor: e.color}}
             className={` cursor-pointer inline-block w-8 h-8 rounded-full m-1 border-white border-2`} 
           ></span>
           </Link>
         )
      })}
      </div>
      <div className={classes.sizeButtons}>
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSizeAndSliderValue(size)}
                    className={`${classes.sizeButton} ${selectedSize === size ? classes.activeSize : ''}`}
                  >
                    {size}
                  </button>
                ))}
      </div>
      <div className={classes.sliderContainer}>
                <label className={classes.sliderLabel}>Chest: {sleeveLength === 17? '17-18' : 
                  sleeveLength  === 19 ? '18-19':  sleeveLength === 20  ? '19-20' : '20-21'
                  } Inches</label>
                <input
                  type="range"
                  min="17"
                  max="21"
                  disabled
                  value={sleeveLength}
                  onChange={(e) => setSleeveLength(Number(e.target.value))}
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
                  onChange={(e) => setChest(Number(e.target.value))}
                  className={classes.slider}
                />
              </div>
      <div className={classes.quan}>
      <div className={classes.quan2} >
      <h4 className="text-white sm:flex  text-sm inline lg:block">Quantity</h4>

      <div className='relative lg:block lg:left-0 lg:top-0  sm:left-[7em] sm:top-[-2.2em] sm:mx-3 sm:my-2'>
      <div className="flex items-center justify-center mt-3 sm:justify-center sm:items-center md:justify-start md:items-start lg:justify-start lg:items-start">
      <div className="flex text-lg text-white text-center">
       <div 
        className="text-xl 
        w-10 h-10 bg-[#262626] text-center rounded-s-3xl cursor-pointer flex items-center justify-center"
    >
       <span onClick={()=>{setvalue("reduce")}} >-</span>
    </div>
    <div className="text-xl  w-10 h-10 bg-[#262626] text-center flex items-center justify-center">{cartvalue}</div>
    <div className="text-xl w-10 h-10 bg-[#262626] text-center rounded-e-3xl cursor-pointer flex items-center justify-center">
     <span onClick={()=>{setvalue("inc")}} >+</span>
    </div>
  </div>
      </div>
      </div>
   {/* <Price product={product} button={false} /> */}
</div>
    </div>
      <div className={classes.btns}>
        <AddToCartButton  quantity={cartvalue === 0 ? cartvalue +1 : cartvalue} product={product} className={classes.addToCartButton} />
        
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
      <div className='flex justify-center mt-[12.5rem] mb-5 md:mt-[0rem]' >
       <h2 className='text-3xl text-white  text-center lg:text-4xl' >Reviews</h2>
       <h2 className='text-3xl text-white mx-2 text-center lg:text-4xl' > | </h2>
       <button
         onClick={()=>{seshowReviewForm(!showReviewForm)}}
         className={`${classes.postReviewButton} `}
        >
        {showReviewForm === false  ? <span>Post a Review</span> : <span>Cancel Review</span> }
      </button>
    </div>
    <ReviewForm showReviewForm={seshowReviewForm} productId={id} postReview={PostReview} value={showReviewForm}/>
    {feedback.map((e, i) => {
  return (
    <div key={i}>
      <div className="flex items-center text-center lg:ml-40 ml-10 p-2">
        <h3 className="text-white text-2xl capitalize font-bold">
          {e.user.name ? e.user.name : e.user}
        </h3>
        <h3 className="text-2xl text-yellow-500 font-bold ml-2">
          {"★".repeat(e.rating)}
        </h3>
      </div>
      <hr className="border-white mx-11 lg:mx-32 lg:hidden" />
      <p className="text-white text-lg p-2 lg:mx-40 mx-10 lg:text-md">
        {e.review}
      </p>
    </div>
  );
})}
    </>
  )
}