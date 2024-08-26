"use client"
import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'
import { useAuth } from '../../_providers/Auth'
import { addToWishlist } from '../../../payload/utilities/addToWishlist'
import { motion, useAnimation, useInView } from 'framer-motion'
import Wishlist from '../../(pages)/wishlist/page'
import { useAppContext } from '../../Context/AppContext'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { id,title, categories, meta: { image: metaImage, description } = {} } = product
  const {user} = useAuth()
  const [wishlistID, setwishlistID] = useState("")
  const [added, setadded] = useState(false)
  const [active, setactive] = useState(0)
  const {value,setValue} = useAppContext()
  console.log(user? `user id is: ${user.id} `:"no user")
  console.log(`image:`, metaImage, "descri", description)
  const controls = useAnimation()
  const descriptionREF = useRef()
  const h3ref = useRef()
  const inView = useInView(descriptionREF, {once: true})
  const inView2 = useInView(h3ref, {once: true})
  
  const [disabled, setdisabled] = useState(false)
  const [wishlist, setwishlist] = useState([])
  const [feedbacks,setfeedbacks] = useState([])
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);
  useEffect(() => {
    if (inView2) {
      controls.start({ opacity: 1, y: 0});
    }
  }, [inView2, controls]);
  useEffect(() => {
    if(!user?.id){
      const alreadyExistingItems = JSON.parse(localStorage.getItem("wishlistItems"))
      console.log(alreadyExistingItems)
      if(!alreadyExistingItems){
        setadded(false)
        return 
      }
      setValue(alreadyExistingItems.length)
      const res = alreadyExistingItems.find(e=> e.product.id === id)
      console.log(res)
      if(res){
        setadded(true)
        return
      }else{
        setadded(false)
        return
      }
    }
      async function getWishlistData(){
        const req = await fetch("http://localhost:3000/api/wishlist")
        const feedbackReq = await fetch(`http://localhost:3000/api/feedback?where[product][equals]=${id}&depth=1`)
        const res = await req.json()
        const feedbackRes = await feedbackReq.json()
        console.log("Resss", res.docs)
        res.docs.some((e)=>{
          console.log("e.product.id", e.product.id, "iddddddddddddddd", id)
          if(e.product.id === id){
            e.product.id === id ? setadded(true) : setadded(false)
          }
        }
        )
        console.log("adddddedddddd", added)
        setwishlist(res.docs)
        setfeedbacks(feedbackRes.docs)
        console.log("feeeedddddd", feedbackRes.docs)
        setValue(res.docs.length)
      }
      getWishlistData()
    
  }, [added])
  async function add(){
    if(added === false){
      if(wishlist.find(e => e.product.id === id )){
        // setadded(false)
        return 
      }else{
        if(!user?.id && added===false ){
          if(!localStorage.getItem("wishlistItems")){
                 localStorage.setItem("wishlistItems", JSON.stringify([]))
                const wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) 
                wishlistArr.push({product:{id,title, categories}})
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr))
                setadded(true)
                setValue(prev=> prev+1)
          }else{
            let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems"))
            console.log(wishlistArr)
            if( wishlistArr.length === 0){
                // localStorage.setItem("wishlistItems", JSON.stringify([]))
                 wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) 
                wishlistArr.push({product:{id,title, categories}})
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr))
                setadded(true)
                setValue(prev=> prev+1)
            }else{
               wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) 
                  wishlistArr.push({product:{id,title, categories}})
                  localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr))
                  setadded(true)
                  setValue(prev=> prev+1) 
                  return 
            }
          }
        }else{
          setadded(true)
          const data = await addToWishlist(id, user.id)
          setwishlistID(data.doc.id)
          setValue(prev=> prev+1) 
        }
      }
    }else{
      if(!user?.id && added === true){
        let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems"))
        let newwishlistItems = wishlistArr.filter(e=>  e.product.id !== id)
        localStorage.setItem("wishlistItems", JSON.stringify(newwishlistItems))
        setadded(false)
        setValue(prev=> prev - 1)
      }else{
        setadded(false)
        const data = await fetch(`http://localhost:3000/api/wihslist`)
        const dataa = await data.json()
        let wishlistToDelete =  dataa.docs.find(e=> e.product.id === id).id
        const req = await fetch(`http://localhost:3000/api/wishlist/${wishlistToDelete}`, {method: "DELETE"})
        const res = await req.json()
        setValue(prev=> prev-1)
      }
    }    
  }
  useEffect(() => {
    const handleScroll = () => {
    const scrollY = window.scrollY 
    if(scrollY < 1000){
      setactive(0)
    }else if(scrollY  >= 1000 && scrollY < 1600){
      setactive(1)
    }else{
      setactive(2)
    }
  }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  
  console.log("feedbacks", feedbacks)
  return (
    <Gutter> 
     <div className={classes.main} >
      <div className={classes.sectionn}> 
        <p style={active === 0? { color: "white" }: {color: "rgba(255, 255, 255, 0.1)"}} >
          {  active ===0 ? <p> <span className='active'>------</span>product description </p>: 
           <p> product description </p>}</p>
        <p style={active === 1? { color: "white" }: {color: "rgba(255, 255, 255, 0.1)"}} >{  active ===1 ? <p> <span className='active'>------</span>Reviews</p>:  <p> Reviews</p>} </p>
        <p style={active === 2? { color: "white" }: {color: "rgba(255, 255, 255, 0.1)"}} >{  active ===2 ? <p> <span className='active'>------</span>Suggested Products </p>:  <p> Suggested Products </p>} </p> 
      </div>
       <div className={classes.mediaWrapper}>
         {!metaImage && <div className={classes.placeholder}>No image</div>}
         {metaImage && typeof metaImage !== 'string' && (
          <>
            <Media  imgClassName={classes.image}  resource={metaImage}   / >
            <motion.div 
              initial={{opacity:0, y: -120}}
              animate={controls}
              ref={h3ref} 
              transition={{duration:1.5,ease:"easeOut"}}
            >
             <div className={classes.title}>  
              <div> 
                {added == false ? 
                <span  className={ classes.wishlistBTN } onClick={add}> 
                <svg style={{width: "35px", height: "25px"}} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                </svg>  </span>:
                <span className={ classes.wishlistBTN }  onClick={add} >
                   <svg style={{width: "35px", height: "25px"}} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                 </svg>
                </span>
                }  
               <AddToCartButton product={product} className={classes.addToCartButton} />
              </div>
                {title}
               </div> 
        </motion.div>
          </>
        )}          
       <motion.div initial={{opacity:0, y: 120}}
        animate={controls}
        ref={descriptionREF} 
        className={classes.description}
        transition={{duration:1.5,ease:"easeOut"}}
        >
          <h4 style={{textAlign: "center"}} >Product description:</h4>
          <p style={{textAlign: "center"}} >{description}</p>
          <div className={classes.content}>
          <div className={classes.categories}>
               {categories?.map((category, index) => {
                 const { title: categoryTitle } = category as Category
   
                 const titleToUse = categoryTitle || 'Generic'
                 const isLast = index === categories.length - 1
   
                 return (
                   <p key={index} className={classes.category}>
                     {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                     <span className={classes.separator}>|</span>
                     <span className={classes.stock}> In stock</span>
                    <span style={{display: "flex", marginLeft : "56em",position: "absolute",bottom: "10px", marginTop: "5px"}}>
                     <Price product={product} button={false} />
                     </span>
                   </p>
                 )
               })}
             </div>
           </div>
        </motion.div>
        </div> 
           {/* <div className={classes.content}>
           <div className={classes.categoryWrapper}>
             <div className={classes.categories}>
               {categories?.map((category, index) => {
                 const { title: categoryTitle } = category as Category
   
                 const titleToUse = categoryTitle || 'Generic'
                 const isLast = index === categories.length - 1
   
                 return (
                   <p key={index} className={classes.category}>
                     {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                     <span className={classes.separator}>|</span>
                   </p>
                 )
               })}
             <p className={classes.stock}> In stock</p>
             </div>
             <div style={{display: "flex", marginLeft : "6em", marginTop: "5px"}}>
             <Price product={product} button={false} />
             </div>
           </div>
           </div>
           <div style={{display: "flex", marginTop: "15px"}}> 
         <div className={classes.details}>
           <div style={{display: 'flex', justifyContent: "space-around",  margin: "0px 10px"}} >
             <AddToCartButton product={product} className={classes.addToCartButton} />
           {added === false ? <button className={classes.wishlistButton}  onClick={add} > 
              <svg style={{width: "20px", height: "15px"}} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
             </svg>
             <p style={{width: "auto"}}> add to wishlist </p> 
           </button> 
             :
             <button onClick={add}  className={classes.wishlistButton}>
             <svg style={{width: "20px", height: "15px"}} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
             </svg>
             <p  style={{width: "200px"}}> remove from wishlist </p> 
             </button>
           }
           </div>
           </div>
         </div>  */}
    </div>
    <h3 className={classes.reviewHeading} > Your Reviews </h3>
    <hr className={classes.line}  />
    <div className={classes.feedbackDiv} >
    {feedbacks.map(e=>  <div className={classes.feedbackDivChild}> 
        <h3  className={classes.feedbackUser} > {e.user.name} </h3>
        <div className={classes.starRating}>
        {'★'.repeat(e.rating)}{'☆'.repeat(5 - e.rating)}
        </div>
        <p> {e.review} </p>
       </div>)}
     </div>
    </Gutter>
  //   <Gutter className={classes.productHero}>
  //   <div className={classes.mediaWrapper}>
  //     {!metaImage && <div className={classes.placeholder}>No image</div>}
  //     {metaImage && typeof metaImage !== 'string' && (
  //       <Media imgClassName={classes.image} resource={metaImage} fill />
  //     )}
  //   </div>

  //   <div className={classes.details}>
  //     <h3 className={classes.title}>{title}</h3>

  //     <div className={classes.categoryWrapper}>
  //       <div className={classes.categories}>
  //         {categories?.map((category, index) => {
  //           const { title: categoryTitle } = category as Category

  //           const titleToUse = categoryTitle || 'Generic'
  //           const isLast = index === categories.length - 1

  //           return (
  //             <p key={index} className={classes.category}>
  //               {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
  //               <span className={classes.separator}>|</span>
  //             </p>
  //           )
  //         })}
  //       </div>
  //       <p className={classes.stock}> In stock</p>
  //     </div>

  //     <Price product={product} button={false} />

  //     <div className={classes.description}>
  //       <h6>Description</h6>
  //       <p>{description}</p>
  //     </div>

  //     <AddToCartButton product={product} className={classes.addToCartButton} />
  //   </div>
  // </Gutter>
  )
}
