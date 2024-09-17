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

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { id,title, categories, meta: { image: metaImage, description }, images = {} } = product
  const {user} = useAuth()
  const [wishlistID, setwishlistID] = useState("")
  const [cartvalue, setcartvalue] = useState(0)
  const [colors, setcolors] = useState(["#262626","#B1FF64", "#A5FFFF"])
  const [added, setadded] = useState(false)
  
  const [disabled, setdisabled] = useState(false)
  const [wishlist, setwishlist] = useState([])
  const [feedback, setfeedback] = useState([])
  function setvalue(op){
    if(op === "reduce" && cartvalue !== 0){
      setcartvalue(prev=>prev-1)
    }else if(op === "reduce" && cartvalue === 0){
      setcartvalue(0)
    }else{
       setcartvalue(prev=>prev+1)
    }
  }
  console.log(`added`, added)
  useEffect(() => {
    async function get(){
      console.log("idd", id)
      const res = await fetch(`http://localhost:3000/api/wishlist?where[product][equals]=${id}&where[user][equals]=${user?.id}`)
      const res2 = await fetch(`http://localhost:3000/api/feedback?where[product][equals]=${id}&depth=2`)
      const response = await res.json()
      const response2 = await res2.json()
      setfeedback(response2.docs)
      console.log("response2.docs", response2.docs)
      if(response.docs.length){
        setadded(true)
        setwishlistID(response.docs[0].id)
      }else{
        setadded(false)
        setwishlistID("")
      }
    }
    get()
  }, [])

  
  async function add(){
    console.log(`added`, added)
    if(added === false){
      if(user?.id){
        setadded(true)
        const data = await addToWishlist(id, user.id)
        setwishlistID(data.doc.id)
      }else{
        console.log("please login to access wishlist")
        return 
      }
    }else{
      setadded(false)
      const req = await fetch(`http://localhost:3000/api/wishlist/${wishlistID}`, {method: "DELETE"})
      const res = await req.json()
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
      <div className={classes.vig}>
      <Media imgClassName={classes.image}  resource={metaImage}   / >
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
           <span
             key={e}
             style={{backgroundColor: e}}
             className={` cursor-pointer inline-block w-8 h-8 rounded-full m-1 border-white border-2`} 
           ></span>
         )
      })}
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
      {/* <button   className={`${classes.pulse} btn`}>Pulse</button> */}
      </div>
      </div>
      </div>
    </Gutter>

    <h1 className='text-3xl text-white text-center lg:text-4xl' > Reviews </h1>
    {feedback.map((e,i)=>{
      return <div>
        <div className='lg:flex block lg:self-center lg:items-center lg:text-center' >
        <h3 className='text-white  lg:text-center text-2xl capitalize lg:ml-40 ml-10 p-2 font-bold' >{e.user.name ? e.user.name : e.user  }</h3>
        <h3 className='text-2xl  sm:ml-7  lg:ml-5 text-yellow-500 p-2 font-bold mt-3' >{"*".repeat(e.rating)  }</h3>
        </div>
        <hr className='border-white mx-11 lg:mx-32 lg:hidden' />
        <p className='text-white text-lg p-2 lg:mx-40 mx-10 lg:text-md' > {e.review} </p>
      </div>
    })}
    </>
  )
}
