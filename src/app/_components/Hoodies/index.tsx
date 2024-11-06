
import React from 'react'
import classes from './index.module.scss'

function Hoodies() {
  return (
    <div className={`bg-[url("/media/hoodies-bg.png")] bg-no-repeat bg-center lg:bg-top bg-cover h-[50rem] lg:pt-28 p-5 lg:p-20 ${classes.container}`}>
        <div className=" pt-20">
            <p className='text-[#FF4F86] text-4xl font-bold '>Wrap up in Style,
            <span className="text-white text-4xl font-bold"> Discover latest <br /> Momifa Hoodies !</span>
            </p>
            <p className="text-[#7b7b7b] font-[200] text-base md:text-lg mt-3">
                Momifa, comfort and style all at same place.
            </p>

            <p className="hidden lg:block text-[#7b7b7b] font-[200] text-base absolute -mt-40 right-28">
                MADE WITH COTTON AND POLYSTER
            </p>
            
        </div>
        <div className=" mt-[23rem] lg:mt-48 border-2 border-[#262626] rounded-xl p-5 bg-[#2626262a] max-w-md h-40 lg:h-60 backdrop-blur-[5px] relative">
        <p className="text-[#ececec] font-extralight text-sm mt-3">
                Available in 3 solid colors <br /> 
                Get yours now at the lowest price of  
                <span className='font-bold text-white text-lg'> 49.9$</span>
            </p>

        <div className="absolute right-4"> 
<button
  type="submit"
  className=" mt-5 md:mt-20 flex justify-center gap-2 items-center mx-auto shadow-xl text-xs md:text-base text-gray-800 bg-[#8c8c8c66] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 py-1 md:py-1.5 px-4 overflow-hidden rounded-full group"
>
  Pre order
  <svg
    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border[#fff] group-hover:border-none p-2 rotate-45"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      className="fill-gray-800 group-hover:fill-gray-800"
    ></path>
  </svg>
</button>
</div> 


            <div className="flex items-center absolute top-8 right-5">
                <div className="rounded-full p-1.5 bg-[#F4FF57] mx-1"></div>
                <div className="rounded-full p-1.5 bg-[#FF4747] mx-1"></div>
                <div className="rounded-full p-1.5 bg-[#55B5FF] mx-1"></div>
            </div>
        </div>
      
    </div>
  )
}

export default Hoodies
