'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()

  return (
    <div className="p-10 ">
      <div className={classes.profile}>
        <Image src="/media/user.png" alt="profile" width={50} height={50} />

        <div className={classes.profileInfo}>
          <p className={classes.name}>{user?.name}</p>
        </div>
      </div>
    </div>
  )
}
