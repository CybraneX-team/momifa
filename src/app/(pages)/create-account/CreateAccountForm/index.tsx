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
import { SparklesCore } from '../../../_components/ui/sparkle'
import { FlipWords } from '../../../_components/ui/FlipWords'

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
  const wordsArray = ['Modern', 'Minimal']
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/verificationMail`, {
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
        toast.success(`Verification Link Sent, ${data.name}! Please Check Your Email To Create Account!`)
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        console.log("data mera data :", data)
        console.log("redirect is", redirect)
        // await login(data)
        clearTimeout(timer)
        // if (redirect) router.push(redirect as string)
        // else router.push(`/`)
        // window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <>
      <div className="flex w-screen overflow-hidden ">
        {/* Left Section Image*/}
        <motion.div
          className="bg-[#0c0c0c] h-screen text-white w-full p-5 pt-10 "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Link href="/">
            <motion.svg
              className="max-w-24"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 496.93 121.26"
              variants={itemVariants}
            >
              <path
                d="M291.8,310.19H273.4l-.14-.14a.44.44,0,0,1-.08-.11.51.51,0,0,1,0-.13,1.24,1.24,0,0,1,0-.27.57.57,0,0,1,0-.13V209a.57.57,0,0,0,0-.13v-.14s0-.09,0-.13a.65.65,0,0,0,0-.13.61.61,0,0,0-.05-.12c-.94-.28-15.58-.38-17.87-.12a5.31,5.31,0,0,0-.18.85c0,.45,0,.9,0,1.35V310c-1.06.32-16.2.43-18.7.15-.15-3.33-.05-6.7-.07-10.05s0-6.85,0-10.28V208.33c-1.1-.31-16.64-.39-18.6-.11-.13,3.06,0,6.15,0,9.24s0,6.13,0,9.19v83.49H198.73V189.3c1-.28,90.68-.39,93-.13C292,190.11,292.11,308.41,291.8,310.19Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M76.41,208.16H58.2c0,3.45,0,6.81,0,10.17v91.84H39.38V208.39c-1.05-.38-16-.51-18.53-.2a4.57,4.57,0,0,0-.16.85c0,.45,0,.9,0,1.36V310c-1.1.29-17.32.34-18.76.06V189.17H95.16v121H76.41Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M179.8,189.21v121H114.11V189.3C115.13,189,177.92,188.94,179.8,189.21ZM160.91,291.1c.26-1.8.17-81.91-.07-82.88-1.84-.3-27-.2-27.9.13V291.1Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M480.09,259.23H451.8c-.16,1.7-.06,3.4-.07,5.09s0,3.34,0,5V310c-1.05.32-17.08.39-18.75.1V189.3c1-.29,64.45-.33,65.87,0V310.14H480.16c0-.53-.07-1.09-.07-1.66q0-23.72,0-47.45Zm-28.37-51.05v16c0,2.65,0,5.31,0,8s-.15,5.27.11,7.89H480V208.18Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M367.29,310.18h-18.6c-.31-1.07-.35-119.59-.05-121h65.47v18.91H367.36v32c1.82.06,3.61,0,5.39,0s3.7,0,5.55,0h27.22v19l-4.71,0H367.29Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
              <path
                d="M329.45,310.19h-18.4a1,1,0,0,1-.14-.13s-.08-.07-.08-.11c0-.36-.08-.71-.08-1.07q0-59.62,0-119.25a1.57,1.57,0,0,1,.16-.46h18.45C329.66,190.1,329.76,308.31,329.45,310.19Z"
                transform="translate(-1.92 -189.02)"
                fill="#ffffff"
              />
            </motion.svg>
          </Link>

          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center p-5 md:px-24 mt-5 md:mt-14 lg:mt-10"
          >
            <motion.h2 variants={itemVariants} className="text-white text-2xl mb-0 md:text-3xl">
              Create an Account!
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={containerVariants}
              className={classes.form}
            >
              <motion.div
                variants={containerVariants}
                className="flex flex-col md:flex-row items-center justify-center -mt-1  w-full"
              >
                <div className="flex flex-col  mr-2 w-full">
                  <motion.label
                    htmlFor="name"
                    variants={itemVariants}
                    className="text-white text-lg font-medium"
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
                    className="text-[#A19B9B] mt-3 md:mt-2 text-base focus:outline-none w-full px-3 py-2 bg-transparent border border-[#363636] rounded-lg"
                  />
                </div>

                {/* <div className="w-full "> */}
                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
                <div className="flex flex-col mt-4 md:mt-0 mx-2 w-full">
                  <motion.label
                    htmlFor="email"
                    variants={itemVariants}
                    className="text-white text-lg font-medium"
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
                    className="text-[#A19B9B] text-base focus:outline-none w-full px-3 py-2 mt-3 md:mt-2 bg-transparent border border-[#363636] rounded-lg"
                  />
                </div>
              </motion.div>

              <motion.label
                htmlFor="password"
                variants={itemVariants}
                className="text-white -mt-2 text-lg font-medium"
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
                className="text-[#A19B9B] text-lg font-medium focus:outline-none w-full px-3 py-2 -mt-2 bg-transparent border border-[#363636] rounded-lg"
              />
              <motion.label
                htmlFor="password"
                variants={itemVariants}
                className="text-white -mt-2 text-lg  font-medium"
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
                className="text-[#A19B9B] text-base font-medium focus:outline-none w-full px-3 py-2 -mt-2 bg-transparent border border-[#363636] rounded-lg"
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
        {/* Right Section Form */}
        <motion.div
          variants={containerVariants}
          className="relative hidden xl:flex flex-col p-10 px-12 h-screen w-screen max-w-[50%] justify-center items-center"
          initial="hidden"
          animate="visible"
        >
          <SparklesCore className="absolute inset-0 z-0" />
          <h1 className="text-white font-bold text-7xl z-50">MOMIFA</h1>
          <div className="flex flex-row items-center">
            <FlipWords
              words={wordsArray}
              duration={2000} // Optional: Time in milliseconds for each word
              className="text-4xl font-semibold z-50" // Optional: Additional Tailwind classes
            />
            <h2 className="text-white font-semibold text-4xl z-50">Fashion</h2>
          </div>

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
            className=" hidden xl:flex flex-col justify-center p-10"
          >
            {/* <motion.img
            variants={itemVariants}
            src="/media/loginImg.png"
            className="  lg:h-[90%] max-h-1/2 absolute bottom-0 pt-12 hover:scale-105 duration-300 transition"
            alt="Login illustration"
          /> */}
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
