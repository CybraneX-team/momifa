"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../_providers/Auth';
import Image from 'next/image';
import { useAppContext } from '../../Context/AppContext';

const Wishlist = () => {
  const {user} = useAuth()
  const [wishlistData, setwishlistData] = useState([])
  let {value, setValue} = useAppContext()
  useEffect(() => {
    async function getWishlistData(){
      try {
        const res = await fetch("http://localhost:3000/api/wishlist")
        const response = await res.json()
        console.log("response", response)
        console.log("response.docs[0].user.id", response.docs[0].user.id, typeof(response.docs[0].user.id))
        console.log("user.id", user.id, typeof(user.id))
        const usersWislistProducts = response.docs.filter((e)=>{return e.user.id === user.id})
        console.log("wishlistdata", usersWislistProducts)
        setwishlistData(usersWislistProducts)
      } catch (error) {
        console.log(`some error: ${error}`)
      }
    }
    if(user?.id){
      getWishlistData()
      console.log("user", user.id)
    }
  }, [user?.id]);

  async function deleteItem(id: string){
    try {
      const deleteReq = await fetch(`http://localhost:3000/api/wishlist/${id}`, {
        method: "DELETE"
      })
      const res = await deleteReq.json()
      const filtered = wishlistData.filter(e=>  e.id != id)
      setwishlistData(filtered)
      setValue(prev=> prev-1)
    } catch (error) {
      console.log(`some error: ${error}`)
    }
  }
  // console.log(JSON.parse(wishlistData[0]?.product?.priceJSON) || "")
  return (
    <div style={{color: "white", marginTop: "7%"}}>
      <h1 style={{margin: "10px"}}> Your  Wishlist Items</h1>
      <table width={"90%"}  style={{textAlign: "center", borderCollapse: "collapse", position: "relative", left: "5%"}}>
        <thead>
        <tr  style={{padding: "5%", textTransform: "capitalize", margin: "0px 20px"}}>
          <th   style={{borderTop: "2px solid white", borderBottom: "2px solid white", padding: "20px 20px"}} > image </th>
          <th   style={{borderTop: "2px solid white", borderBottom: "2px solid white", padding: "20px 20px"}} > title </th>
          <th   style={{borderTop: "2px solid white", borderBottom: "2px solid white", padding: "20px 20px"}} > price </th>
          <th   style={{borderTop: "2px solid white", borderBottom: "2px solid white", padding: "20px 20px"}} > remove </th>
        </tr>
        </thead>
        <tbody>
        {wishlistData.map((item, index) => (
        <tr style={{borderBottom: "2px soild white"}}>
          <td style={{padding: "10px 10px",borderBottom: "2px solid white"}}>
            <Image style={{borderRadius: "15px"}} src={item.product.meta.image.url} alt={item.product.meta.image.alt} height={120} width={120} />
          </td>
          <td style={{padding: "10px 10px",borderBottom: "2px solid white"}}>
            {item.product.title}
          </td>
          <td style={{padding: "10px 10px",borderBottom: "2px solid white"}}>
          {item.product.priceJSON ? JSON.parse(item.product.priceJSON).data[0].unit_amount : "23.75"}
        </td>
           <td  style={{cursor: "pointer", padding: "10px 10px", borderBottom: "2px solid white"}} onClick={()=>{deleteItem(item.id)}}>
           <svg style={{width: "20px", height: "25px"}} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
         <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        </td>
        </tr>
        ))}
        </tbody>
      </table>

    </div>
  );
};

export default Wishlist;