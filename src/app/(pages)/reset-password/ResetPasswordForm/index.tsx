'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  password: string
  token: string
}

export const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to `/account` with success message in URL
        router.push('/account?success=Password reset successfully.')
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex flex-col ">
      <Message error={error} className={classes.message} />
      <label htmlFor="password" className="text-white text-xl font-medium">
        New Password
      </label>
      <input
        {...register('password', { required: true })}
        type="password"
        id="password"
        placeholder="Your password"
        required
        className="text-[#A19B9B] text-xl max-w-3xl font-medium focus:outline-none w-full p-3 py-4 mt-3 bg-transparent border border-[#363636] rounded-lg"
      />
      <input type="hidden" {...register('token')} />
      <button
        type="submit"
        className="hover:bg-transparent w-40 mt-5 text-white p-2 py-3 rounded-lg hover:border hover:border-white bg-[#212121]  duration-300"
      >
        {' '}
        Reset Password
      </button>
    </form>
  )
}
