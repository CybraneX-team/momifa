'use client'
import React from 'react'
import { InfiniteMovingCards } from '../ui/MovingCards'
import Menu from '../ui/Menu'

function MovingCards() {
  const items = [
    {
      title: 'Premium Fabric',
      desc: 'Exclusive woven Fabric from sri lanka ',
    },
    {
      title: '100% cotton',
      desc: 'Durable material',
    },
    {
      title: 'Super Quality',
      desc: 'Affordable',
    },
  ]
  return (
    <div>
      {/* <Menu /> */}
      <InfiniteMovingCards
        items={items}
        direction="left"
        speed="normal"
        pauseOnHover={true}
        className=""
      />
    </div>
  )
}

export default MovingCards
