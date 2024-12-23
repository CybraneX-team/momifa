'use client'

import { cn } from '../../lib/utils'
import React, { useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: { title: string; desc: string }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse')
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] h-[200px] mt-28 max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[450px]"
            style={{
              background: 'linear-gradient(to bottom, #6F8EFF 0%, #F2ABFF 100%)', // Border gradient
              padding: '1px', // Thickness of the gradient border
              borderRadius: '1rem', // Matches the inner rounded corners
            }}
            key={idx}
          >
            {/* Inner Content with Background Gradient */}
            <div
              className="w-full h-full rounded-[inherit] bg-gradient-to-b border border-b-0 border-slate-700"
              style={{
                background: 'linear-gradient(to bottom, #1B0F26 0%, #110F16 100%)', // Inner background gradient
              }}
            >
              <blockquote className="flex  flex-col justify-center items-center h-full">
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 leading-[1.6] text-gray-100 font-bold text-xl">
                  {item.title}
                </span>
                <span className="relative z-20 leading-[1.6] text-gray-100 font-light text-lg mt-1">
                  {item.desc}
                </span>
              </blockquote>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
