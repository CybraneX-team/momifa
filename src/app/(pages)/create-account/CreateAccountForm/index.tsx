'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// import { Button } from '../../../_components/Button'
// import { Input } from '../../../_components/Input'
// import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        toast.error('There was an error creating the account.')
        return
      } else {
        toast.success( `Account created, ${data.name}! Welcome aboard!`)
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/`)
        window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <>
      <div className="flex w-screen  overflow-hidden mt-5 md:-mt-10">
        {/* Left Section Image*/}

        <motion.div
          className="relative hidden 2xl:flex p-10 px-12 overflow-hidden w-screen bg-transparent h-full text-white "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={containerVariants} className="flex flex-col  justify-center p-10">
            <motion.img
              variants={itemVariants}
              src="/media/Login.jpg"
              className="lg:h-full max-h-1/2 absolute bottom-0 pt-12 hover:scale-105 duration-300 transition"
              alt="Login illustration"
            />
          </motion.div>
        </motion.div>

        {/* Right Section Form */}
        <motion.div
          className=" p-10 -pt-5 px-12  w-screen "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            overflowY: 'hidden',
            background: 'linear-gradient(to bottom, #000 10%, #392a5b 300%)',
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="bg-transparent text-white"
          />
          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center p-10 md:px-24 -mt-10 md:mt-14 lg:-mt-10"
          >
            <motion.h2 variants={itemVariants} className="text-white text-2xl mb-3 md:text-4xl">
              Create an Account!
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={containerVariants}
              className={classes.form}
            >
              <motion.div
                variants={containerVariants}
                className="flex flex-col md:flex-row items-center justify-center  w-full"
              >
                <div className="flex flex-col  mr-2 w-full">
                  <motion.label
                    htmlFor="name"
                    variants={itemVariants}
                    className="text-white  text-lg md:text-xl font-medium"
                  >
                    Full Name
                  </motion.label>
                  <motion.input
                    {...register('name', { required: true })}
                    type="text"
                    id="name"
                    variants={itemVariants}
                    placeholder="Your Full Name"
                    required
                    className="text-[#A19B9B] mt-3 md:mt-2 text-lg focus:outline-none w-full p-3  bg-transparent border border-[#363636] rounded-lg"
                  />
                </div>

                {/* <div className="w-full "> */}
                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
                <div className="flex flex-col mt-4 md:mt-0 mx-2 w-full">
                  <motion.label
                    htmlFor="email"
                    variants={itemVariants}
                    className="text-white text-lg md:text-xl font-medium"
                  >
                    Email
                  </motion.label>
                  <motion.input
                    {...register('email', { required: true })}
                    type="email"
                    id="email"
                    variants={itemVariants}
                    placeholder="Your email address"
                    required
                    className="text-[#A19B9B] text-lg focus:outline-none w-full p-3  mt-3 md:mt-2 bg-transparent border border-[#363636] rounded-lg"
                  />
                </div>
              </motion.div>

              <motion.label
                htmlFor="password"
                variants={itemVariants}
                className="text-white mt-1 text-lg md:text-xl font-medium"
              >
                Password
              </motion.label>
              <motion.input
                {...register('password', { required: true })}
                type="password"
                id="password"
                placeholder="Your password"
                variants={itemVariants}
                required
                className="text-[#A19B9B] text-xl font-medium focus:outline-none w-full p-3  -mt-1 bg-transparent border border-[#363636] rounded-lg"
              />
              <motion.label
                htmlFor="password"
                variants={itemVariants}
                className="text-white mt-1 text-lg md:text-xl font-medium"
              >
                Confirm Password
              </motion.label>
              <motion.input
                {...register('passwordConfirm', { required: true })}
                type="password"
                id="password"
                variants={itemVariants}
                placeholder="Confirm password"
                required
                className="text-[#A19B9B] text-xl font-medium focus:outline-none w-full p-2 py-3 -mt-1 bg-transparent border border-[#363636] rounded-lg"
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                variants={itemVariants}
                className="relative w-full mt-3 p-2  text-center flex items-center px-6 overflow-hidden font-medium transition-all bg-[#0F0F0F] rounded-md group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#1D1D1D] rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-black"></span>
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#1D1D1D] rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-black"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#6757ad90] rounded-md group-hover:translate-x-0"></span>
                <span className="relative text-center p-1 text-lg w-full  text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Sign Up
                </span>
              </motion.button>
              <p className="text-gray-500 mt-1 font-medium text-base md:text-lg mx-auto">
                Already have an account?
                <Link href="/login" className="underline ml-1 text-[#9777E9]">
                  Log in
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </>
  )

  {
    /* <p>
        {`This is where new customers can signup and create a new account. To manage all users, `}
        <Link href="/admin/collections/users">login to the admin dashboard</Link>
        {'.'}
      </p>
      <Message error={error} className={classes.message} />
      <input name="email" required error={errors.email} type="email" />
      <Input
        name="name"
        label="Full name"
        required
        register={register}
        error={errors.name}
        type="text"
      />
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
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Sign up'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div> */
  }
}

export default CreateAccountForm
