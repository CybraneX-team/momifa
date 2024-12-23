import React from 'react'
import { InfiniteMovingCards } from '../ui/MovingCards'

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
