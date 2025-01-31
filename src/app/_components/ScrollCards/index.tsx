'use client'
import React from 'react'
import Image from 'next/image'

const HorizontalScroll = () => {
  const services = [
    {
      title: 'Better Payments',
      items: [
        'Different ways to pay',
        'Shop Pay',
        'Google Pay',
        'Apple Pay',
        'Debit and Credit Cards'
      ]
    },
    {
      title: 'Humane Core Values',
      items: [
        'Nature Friendly Fabric',
        'Donations towards Autism',
        'Donations to Veterans',
        'Sustainable Clothing'
      ]
    },
    {
      title: 'Premium Quality',
      items: [
        'Crafted with love',
        'Made by Sri Lankan Artisans',
        'Finest fabrics used',
        '100% Cotton'
      ]
    },
    {
      title: '24/7 Customer Service',
      items: [
        'Faster reach with different platforms',
        'Phone at 732-232-5549',
        'info@momifa.com',
        'Multiple Social Media handles'
      ]
    }
  ]

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-8">
        Momifa Cares
      </h1>

      <div className="w-full max-w-6xl bg-[#0F0F0F] border border-[#2E2E2E] rounded p-4 flex items-center justify-center space-x-4 mb-8">
        <Image
          width={40}
          height={40}
          src="/media/Group 11.svg"
          alt="icon"
          className="w-10 h-10"
        />
        <Image
          width={64}
          height={64}
          src="/media/Group 14.svg"
          alt="icon"
          className="w-16 h-16"
        />
        <Image
          width={40}
          height={40}
          src="/media/Group 15.svg"
          alt="icon"
          className="w-10 h-10"
        />
      </div>

      <div className="w-full max-w-6xl bg-[#0F0F0F] border border-[#2E2E2E] rounded p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <h2 className="text-lg font-bold mb-4">{service.title}</h2>
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm font-light">
                    {item}
                  </li>
                ))}
              </ul>
              {index < services.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll