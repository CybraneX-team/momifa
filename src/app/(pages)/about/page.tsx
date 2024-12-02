import React from 'react'
import { HideFooter } from '../../_components/HideFooter'

const About = () => {
  return (
    <div className="bg-black">
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl mx-auto pt-24 bg-[url('/media/Group.svg')] bg-no-repeat bg-cover">
        <div className="max-w-xs h-[450px] md:w-[480px] md:h-[480px] relative overflow-hidden bg-gradient-to-t from-[#8C4EFF] to-[#3B1E71] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-end">
          <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21V19L5 17V11C5 7.9 7.03 5.17 10 4.29V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V4.29C16.97 5.17 19 7.9 19 11V17L21 19V21H3ZM12 24C11.2044 24 10.4413 23.6839 9.87868 23.1213C9.31607 22.5587 9 21.7956 9 21H15C15 21.7956 14.6839 22.5587 14.1213 23.1213C13.5587 23.6839 12.7956 24 12 24Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xl font-semibold">Workcation</span>
            </div>
          </div>
          <div className="space-y-6 ">
            <p className="text-2xl font-semibold leading-tight">
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus nesciunt quas,
              et optio deleniti ipsa sints?"
            </p>
            <div>
              <p className="font-medium">Judith Rogers, CEO at Workcation</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8 ">
          <div>
            <h2 className="text-indigo-600 mb-2">MOdern MInimal FAshion</h2>
            <h1 className=" text-4xl md:text-5xl font-bold mb-6 text-white">Welcome to momifa</h1>
          </div>

          <p className="text-[#a8a5a5]">
            MOMIFA was founded in September of 2022 by two fellas from different parts of the world-
            one from New Jersey and one from Sri Lanka. We created this brand for everyone who loves
            to dress in a fashionable minimalist way. Our goal was to create a high quality
            minimalist fashion style that was also very affordable. MOMIFA garments are produced in
            Sri Lanka with some of the finest fabrics in the world..
          </p>

          <p className="text-[#a8a5a5]">
            MOMIFA literally stands for MOdern MInimal FAshion <br /> But MOMIFA means SO much more:
            MOMIFA means Comfort. MOMIFA means Elegance MOMIFA means Style MOMIFA means Luxury
            MOMIFA means Affordability MOMIFA means Active Lifestyle And more importantly: MOMIFA
            means Home MOMIFA means Family MOMIFA means.......Happiness FFrom all of your friends
            here at MOMIFA, we would like to wish you a happy MOMIFA day!
          </p>

          <p className="text-[#a8a5a5]">
            MOMIFA stands at the forefront of minimalist fashion, dedicated to offering simplicity
            and comfort through our clothing line. We are committed to providing our customers with
            a selection of high-quality, everyday wear designed for utmost comfort and effortless
            style. MOMIFA was born of the founders' vision to create a streamlined shopping
            experience for minimalist fashion enthusiasts. Motivated by their desire for simplicity
            and efficiency, they set out on a mission to create the ideal platform they had always
            imagined, one that had been missing from the marketplace until now.
          </p>
        </div>

        <HideFooter />
      </div>
    </div>
  )
}

export default About
