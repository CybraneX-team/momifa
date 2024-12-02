import React from 'react'
import { IoMdMail, IoIosSend } from 'react-icons/io'
import { GoLocation } from 'react-icons/go'
import { FiPhone } from 'react-icons/fi'
import { HideFooter } from '../../_components/HideFooter'

export default function ContactUs() {
  return (
    <div className="px-4 py-5 sm:p-6 bg-[url('/media/pages-bg.png')] bg-no-repeat bg-cover bg-fixed pt-32 pb-20 h-screen">
      <div className="text-center text-white mt-20">
        <h2 className="text-3xl font-bold text-white mb-4">We'd Love to Hear From You!</h2>
        <p className="text-base text-[#a8a5a5] mb-6">
          Fill out the form below with your query or message. We'll get back to you as soon as we
          can!
        </p>
      </div>
      <form className="max-w-2xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            className="border p-3 w-full rounded-md bg-[#29292951] text-white backdrop-blur-sm"
            placeholder="First Name"
            required
          />
          <input
            className="border p-3 w-full rounded-md bg-[#29292951] text-white backdrop-blur-sm"
            placeholder="Last Name"
            required
          />
          <input
            className="border p-3 w-full rounded-md bg-[#29292951] text-white backdrop-blur-sm"
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="border p-3 w-full rounded-md bg-[#29292951] text-white backdrop-blur-sm"
            placeholder="Phone (Optional)"
            type="tel"
          />
        </div>
        <textarea
          className="border p-3 w-full bg-[#1f1e1e98] rounded-md mt-5 text-white backdrop-blur-sm"
          placeholder="Your Message"
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <IoIosSend className="mr-2" /> Send Message
        </button>
      </form>
      <div className="mt-8 flex flex-col text-white items-center justify-center">
        <h3 className="text-lg font-semibold">Additional Contact Info</h3>
        <ul className="mt-2 space-x-2 flex items-center justify-center">
          <li className="flex items-center mx-2">
            <GoLocation className="mr-2" />
            123 Main St, Anytown, USA
          </li>
          <li className="flex items-center mx-2">
            <FiPhone className="mr-2" />
            +1 732-232-5549
          </li>
          <li className="flex items-center mx-2">
            <IoMdMail className="mr-2" />
            hello@momifa.com
          </li>
        </ul>
      </div>
      <HideFooter />
    </div>
  )
}
