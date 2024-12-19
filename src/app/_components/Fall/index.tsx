import React from 'react'
import { InfiniteMovingCards } from '../ui/MovingCards'

function MovingCards() {
  const items = [
    {
      quote: 'This is an example quote.',
      name: 'John Doe',
      title: 'abz',
    },
    {
      quote: 'Another example quote.',
      name: 'Jane Smith',
      title: 'abz',
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
