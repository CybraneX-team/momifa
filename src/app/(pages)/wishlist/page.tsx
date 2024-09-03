"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../_providers/Auth';
import { useAppContext } from '../../Context/AppContext';
import { Gutter } from '../../_components/Gutter';
import { CollectionArchive } from '../../_components/CollectionArchive'; // Use correct import based on the export type
import classes from './index.module.scss';
import { Card } from '../../_components/Card';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistData, setwishlistData] = useState([]);
  const { value, setValue } = useAppContext();

  useEffect(() => {
    if (!user?.id) return; // Ensure user is authenticated

    async function getWishlistData() {
      try {
        const req = await fetch(
          `http://localhost:3000/api/wishlist?where[user][equals]=${user.id}&depth=2&populate=product`
        );
        const res = await req.json();
        setwishlistData(res.docs); // Set wishlist items for the logged-in user
        console.log(res);
      } catch (error) {
        console.log(`some error: ${error}`);
      }
    }

    getWishlistData();
  }, [user?.id]);

  async function deleteItem(id) {
    try {
      const deleteReq = await fetch(`http://localhost:3000/api/wishlist/${id}`, {
        method: 'DELETE',
      });
      await deleteReq.json();
      const filtered = wishlistData.filter((e) => e.id !== id);
      setwishlistData(filtered);
      setValue((prev) => prev - 1);
    } catch (error) {
      console.log(`some error: ${error}`);
    }
  }

  return (
    <div className='inline-flex m-10 flex-col w-full'>
      <h1 className="mx-5 text-white p-4 mt-20 text-2xl">Your Wishlist Items</h1>
      <div className="flex ">
        <Gutter className={classes.gutter}>
          {wishlistData.map((e)=>{
            return <Card 
            doc={e.product} 
            relationTo="products"
            title={e.product.title}
            className={classes.card}/>
          })}
        </Gutter>
      </div>
    </div>
  );
};

export default Wishlist;
