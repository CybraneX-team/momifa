'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {/* {navItems.map(({ link }, i) => {
        return <CMSLink  key={i} {...link} appearance="none" />
      })} */}
      {/* <CartLink /> */}
      {/* <Link href={"/wishlist"}> 
      <div style={{display: "flex", width: "50px"}} >
        <svg style={{width: "20px", height: "18px"}} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
        </svg>
        <p> {value} </p>
      </div>
      </Link> */}
      <div className="-mt-3 flex items-center justify-around text-white space-x-6 md:space-x-16 -mr-3  md:mr-12">
        <Link href="/" className="mt-1.5 text-white ">
          Home
        </Link>
        <Link href="/products" className="mt-1.5 text-white  font-medium">
          Collection
        </Link>

        {user && <CartLink />}
        {user && (
          <Link
            href="/account"
            className="bg-[#7c2c71a1] px-4 py-2 mt-1.5 md:mt-0 rounded-full font-bold text-white mx-4"
          >
            {user.name.charAt(0)}
          </Link>
        )}
        <div className="mt-2 flex items-center justify-center text-white space-x-6 md:space-x-16">
          {!user && <CartLink />}
          {!user && (
            <div className="bg-[#ffffff] p-1 cursor-pointer text-black rounded-sm">
              <button onClick={() => (window.location.href = '/login')} className="px-4 md:px-10">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
