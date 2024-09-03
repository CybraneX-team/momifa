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
  const { id,title, categories, meta: { image: metaImage, description } = {} } = product
  const {user} = useAuth()
  const [wishlistID, setwishlistID] = useState("")
  const [colors, setcolors] = useState(["#262626","#B1FF64", "#A5FFFF"])
  const [added, setadded] = useState(false)
  console.log(user? `user id is: ${user.id} `:"no user")
  console.log(`image:`, metaImage, "descri", description)
  
  const [disabled, setdisabled] = useState(false)
  const [wishlist, setwishlist] = useState([])

  console.log(`added`, added)
  useEffect(() => {
    async function get(){
      console.log("idd", id)
      const res = await fetch(`http://localhost:3000/api/wishlist?where[product][equals]=${id}`)
      const response = await res.json()
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
      setadded(true)
      const data = await addToWishlist(id, user.id)
      setwishlistID(data.doc.id)
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
      height={150}
      width={70}
      className={classes.rotatedText}
    />
    <Gutter className={classes.productHero}>
      <div className={classes.mainn}>
      <div className={classes.mediaWrapper}>
      {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
            <Media  imgClassName={classes.image}  resource={metaImage}   / >
        )}
      </div>
      <div className={classes.detailsDiv} >
      <h3 className={classes.productTitle} >{title}</h3> 
      <h4 className='text-white' >Description </h4>
      <p className={classes.description}>  {description} </p>
      <h4 className='text-white text-sm mt-7' >Colors</h4>
      {colors.map((e)=>{
         const bgClass = `bg-[#262626]-400`; 
         return (
           <span
             key={e}
             style={{backgroundColor: e}}
             className={` cursor-pointer inline-block w-6 h-6 rounded-full m-1 border-white border-2`} 
           ></span>
         )
      })}
      <h4 className='text-white text-sm'>Quantity</h4>
      <div className="flex   lg:justify-start md:items-start sm:relative sm:ml-24 md:ml-0 lg:ml-0 md:justify-start lg:items-start mt-3">
      <div className="flex items-center justify-center mt-3 sm:justify-center sm:items-center md:justify-start md:items-start lg:justify-start lg:items-start">
  <div className="flex text-lg text-white text-center">
    <div className="text-xl w-10 h-10 bg-[#262626] text-center rounded-s-3xl cursor-pointer flex items-center justify-center">
      -
    </div>
    <div className="text-xl w-10 h-10 bg-[#262626] text-center flex items-center justify-center">1</div>
    <div className="text-xl w-10 h-10 bg-[#262626] text-center rounded-e-3xl cursor-pointer flex items-center justify-center">
      +
    </div>
  </div>
</div>

</div>


      <div className={classes.btns}>
        <AddToCartButton product={product} className={classes.addToCartButton} />
        <button  onClick={add} className={classes.wishlistButton} >{added? "Remove From Wishlist" : "Add To Wishlist" } </button>
      </div>
      </div>
      </div>
    </Gutter>
    </>
  )
}
