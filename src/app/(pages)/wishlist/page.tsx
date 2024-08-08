"use client"

import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (item) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => addToWishlist('New Item')}>Add to Wishlist</button>
    </div>
  );
};

export default Wishlist;
