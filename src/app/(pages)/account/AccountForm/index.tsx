'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  const buttonText = isLoading
    ? 'Processing'
    : changePassword
    ? 'Change Password'
    : 'Update Account'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      {!changePassword ? (
        <div className="p-10 text-white">
          <Fragment>
            <Input
              name="email"
              label="Email Address"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Input name="name" label="Name" register={register} error={errors.name} />

            <p className="mt-3">
              {'Change your account details below, or '}
              <button
                type="button"
                className={classes.changePassword}
                onClick={() => setChangePassword(!changePassword)}
              >
                click here
              </button>
              {' to change your password.'}
            </p>
          </Fragment>
        </div>
      ) : (
        <Fragment>
          <p>
            {'Change your password below, or '}
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              cancel
            </button>
            .
          </p>
          <div className="w-2/3 ml-8 m-5 pb-10 ">
            <Input
              name="password"
              type="password"
              label="Password"
              required
              register={register}
              error={errors.password}
            />
            <Input
              name="passwordConfirm"
              type="password"
              label="Confirm Password"
              required
              register={register}
              validate={value => value === password.current || 'The passwords do not match'}
              error={errors.passwordConfirm}
            />
          </div>
        </Fragment>
      )}

      {/* <Button
        type="submit"
        label={isLoading ? 'Processing' : changePassword ? 'Change Password' : 'Update Account'}
        disabled={isLoading}
        appearance="primary"
        className="rounded-full border border-white px-3 py-2"
      /> */}

      <div className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-800/30 backdrop-blur-lg px-4 py-2 text-base font-medium text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
        <Button
          type="submit"
          disabled={isLoading}
          className=" border-none text-base font-medium text-white"
        >
          {buttonText}
        </Button>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/20"></div>
        </div>
      </div>
    </form>
  )
}

export default AccountForm
