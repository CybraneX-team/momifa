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
        <div className="">
          <p className="text-white text-xl ">
            Enter your registered email address. We'll send you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Message error={error} className={classes.message} />
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="Your email address"
              required
              className="text-[#A19B9B] text-lg focus:outline-none w-full p-3 py-4 mt-1 bg-transparent border border-[#363636] rounded-lg"
            />
            <Button
              type="submit"
              appearance="primary"
              label="Recover Password"
              className={classes.submit}
            />
          </form>
        </div>
      )}
      {success && (
        <React.Fragment>
          <h1>Request submitted</h1>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
