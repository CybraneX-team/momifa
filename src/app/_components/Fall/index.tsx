import React from 'react'
import { FlipWords } from '../ui/FlipWords'

const WhyWeAreSpecial = () => {
  const features = [
    'Social contributions',
    'Luxury Polos',
    'Modern & Elegance',
    'Modern Trends',
    'Timeless look',
    'Handmade',
    'Wardrobe Staples',
    'Refined casual',
    'Essentials',
    'Soft Cotton',
    'Premium Quality',
  ]
  const wordsArray = [
    {
      name: 'Joel Carter',
      review: '"Brand you Can Trust for your wardrobe"',
    },
    {
      name: 'Carter',
      review: '"Minimal supree quality..."',
    },
    {
      name: 'Alice',
      review: '"Modern look comfy.."',
    },
  ]
  return (
    <div className="bg-black p-8 md:pt-12 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <h1 className="bg-gradient-to-b from-[#FF5F85] to-[#6F6F6F] inline-block text-transparent bg-clip-text text-4xl md:text-6xl font-bold mb-2 md:mb-3">
            Why we are special
          </h1>

          <p className="text-white text-xl mb-8 font-bold">10,000 + People trust us.</p>

          <div
            className="md:hidden md:w-[400px] md:h-60 text-white p-6 mb-10 rounded-2xl border border-[#FF2C68]"
            style={{
              background: 'radial-gradient(circle at center, #ff2c6861 0%, #320E17 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <p className="text-lg">
                <FlipWords words={wordsArray.map(item => item.name)} duration={1000} />
              </p>
            </div>
            <p className="text-xl font-semibold">
              <FlipWords words={wordsArray.map(item => item.review)} duration={1000} />
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {features.map((feature, index) => (
              // <div
              //   key={index}
              //   className={`px-6 py-3 rounded-full bg-[#292929] text-white
              //     ${feature === 'Timeless look' ? 'ring-1 ring-gradient' : ''}`}
              // >
              //   {feature}
              // </div>
              <div
                className={`relative p-[1px] bg-[#292929]  inline-block rounded-full"
              ${
                feature === 'Timeless look'
                  ? ' inline-block rounded-full p-[1px] bg-gradient-to-r from-pink-500 to-indigo-500 '
                  : 'rounded-full'
              }`}
              >
                <div className="px-6 py-3  bg-[#292929] text-white rounded-full">
                  {/* Inner content */}
                  {feature}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="md:w-[400px] md:h-60 text-white p-6 mt-16 hidden md:block rounded-2xl border border-[#FF2C68]"
          style={{
            background: 'radial-gradient(circle at center, #ff2c6861 0%, #320E17 100%)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
            <p className="text-lg">
              <FlipWords words={wordsArray.map(item => item.name)} duration={3000} />
            </p>
          </div>
          <p className="text-2xl font-semibold">
            <FlipWords words={wordsArray.map(item => item.review)} duration={3000} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhyWeAreSpecial
