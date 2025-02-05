
"use client"
import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll, useSpring } from 'framer-motion';
import classes from './index.module.scss';

function Hoodies() {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(0, springConfig);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      y.set(latest / 5); // Smooth parallax effect
    });
  }, [scrollY, y]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`bg-[url("/media/hoodies-bg.png")] bg-no-repeat bg-center lg:bg-top bg-cover h-[50rem] lg:pt-28 p-5 lg:p-20 ${classes.container}`}
    >
      <motion.div 
        className="pt-20"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        <motion.p 
          className='text-[#FF4F86] text-4xl font-bold'
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wrap up in Style,
          <motion.span 
            className="text-white text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          > Discover latest <br /> Momifa Hoodies !</motion.span>
        </motion.p>
        <motion.p 
          className="text-[#7b7b7b] font-[200] text-base md:text-lg mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Momifa, comfort and style all at same place.
        </motion.p>
        <motion.p 
          className="hidden lg:block text-[#7b7b7b] font-[200] text-base absolute -mt-40 right-28"
          style={{ y }}
        >
          MADE WITH COTTON AND POLYSTER
        </motion.p>
      </motion.div>

      <motion.div 
        className="mt-[23rem] lg:mt-48 border-2 border-[#262626] rounded-xl p-5 bg-[#2626262a] max-w-md h-40 lg:h-60 backdrop-blur-[5px] relative"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true }}
      >
        <motion.p 
          className="text-[#ececec] font-extralight text-sm mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Available in 3 solid colors <br />
          Get yours now at the lowest price of
          <motion.span 
            className='font-bold text-white text-lg'
            whileHover={{ scale: 1.1 }}
          > 49.9$</motion.span>
        </motion.p>
        
        <div className="absolute right-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 md:mt-20 flex justify-center gap-2 items-center mx-auto shadow-xl text-xs md:text-base text-gray-800 bg-[#8c8c8c66] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 py-1 md:py-1.5 px-4 overflow-hidden rounded-full group"
          >
            Pre order
            <motion.svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border[#fff] group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </motion.svg>
          </motion.button>
        </div>

        <motion.div 
          className="flex items-center absolute top-8 right-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { bg: "bg-[#F4FF57]" },
            { bg: "bg-[#FF4747]" },
            { bg: "bg-[#55B5FF]" }
          ].map((color, index) => (
            <motion.div
              key={index}
              className={`rounded-full p-1.5 ${color.bg} mx-1`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hoodies;