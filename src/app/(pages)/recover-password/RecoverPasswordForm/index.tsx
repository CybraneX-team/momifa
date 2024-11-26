'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <div className="border border-[#a2a2a2] rounded-xl bg-[#020a0b] p-5 flex flex-col backdrop-blur-sm items-center w-full md:w-screen max-w-2xl lg:max-w-4xl h-[30rem]">
          <p className="text-[#E0D6FF] text-lg text-center">
            Enter your registered email address <br /> We'll send you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 relative">
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="Your email address"
              required
              className="text-[#5A618C] text-lg focus:outline-none w-full p-3 py-2 pl-14 mt-1 bg-transparent border border-[#416d7187] rounded-lg"
            />          
            <span>
                <img src="/media/sms.svg" alt="" className='absolute left-5 w-5 top-4'/>
              </span>  
              <Message error={error} className={classes.message} />
              <button
              type="submit"
              className="rounded-full w-full md:w-44 md:ml-60 py-3 mt-10 text-center bg-[#51515166] backdrop:blur-md text-white font-medium"
            >
              Reset password
              </button>
          </form>
        </div>
      )}
      {success && (
        <React.Fragment>
          <div className="border border-[#a2a2a2] rounded-xl bg-[#0f26265f] p-5 flex flex-col backdrop-blur-sm items-center w-full md:w-screen max-w-2xl lg:max-w-4xl h-[30rem]">
          <p className="text-[#E0D6FF] text-lg text-center">
            Enter your registered email address <br /> We'll send you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 relative">
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="Your email address"
              required
              className="text-[#5A618C] text-lg focus:outline-none w-full p-3 py-2 pl-14 mt-1 bg-transparent border border-[#416d7187] rounded-lg"
            />          
            <span>
                <img src="/media/sms.svg" alt="" className='absolute left-5 w-5 top-4'/>
              </span>  

              <p className='text-[#32FFCC] text-lg text-center mt-5'>Check your email for a link that will allow you to securely reset your password.</p>
              <Message error={error} className={`${classes.message} mt-3`} />
              <button
              type="submit"
              className="rounded-full w-full md:w-44 py-3 mt-5 md:ml-56 text-center bg-[#51515166] backdrop:blur-md text-white font-medium"
            >
              Open inbox
              </button>
          </form>
         
        </div>
          
        </React.Fragment>
      )}
    </Fragment>
  )
}
