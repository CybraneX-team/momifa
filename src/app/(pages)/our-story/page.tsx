import React from 'react'
import { HideFooter } from '../../_components/HideFooter'

const Story = () => {
  return (
    <div className="bg-[url('/media/pages-bg.png')] bg-no-repeat bg-cover bg-fixed h-screen">
      <div className="flex gap-8 p-8 max-w-7xl mx-auto pt-24 ">
        <div className="flex-1 space-y-8 ">
          <div>
            <h2 className="text-indigo-600 mb-2">MOdern MInimal FAshion</h2>
            <h1 className=" text-4xl md:text-5xl font-bold mb-6 text-white">Our Story</h1>
          </div>

          <p className="text-[#a8a5a5]">
            MOMIFA clothing isn’t just about looking good; it’s about embracing{' '}
            <span className="font-bold text-white">high quality </span> and{' '}
            <span className="font-bold text-white"> modern fashion </span> and an with a purpose.
            Imagine famous people like Steve Jobs, Mark Zuckerberg, and Elon Musk, who kept things
            simple in their lives. Our clothes follow that philosophy – simple, elegant, and perfect
            for <span className="font-bold text-white"> everyday outfits </span> , designed to help
            you focus on your goals without unnecessary distractions. We create{' '}
            <span className="font-bold text-white"> modern clothing styles </span> that inspire,
            just like these successful individuals.
          </p>
          <p className="text-[#a8a5a5]">
            Simplicity lies at the heart of our brand. It’s not just about appearance but also about
            how our clothes make you feel. At MOMIFA, we believe in{' '}
            <span className="font-bold text-white">sustainable fashion</span> and care deeply about
            the environment. That’s why our materials and crafting methods reflect our commitment to
            eco-friendly practices. We deliver timeless{' '}
            <span className="font-bold text-white">basics and minimalist clothing</span> that blend
            responsibility with <span className="font-bold text-white">modern wear.</span>
          </p>

          <p className="text-[#a8a5a5]">
            But our story is about more than fashion. MOMIFA stands for kindness and action. Some of
            our revenue supports children with autism and disabled veterans because we believe in
            giving back. Every purchase contributes to these meaningful causes. Whether you're
            picking out <span className="font-bold text-white">classic polos</span> or curating a
            <span className="font-bold text-white">minimal fashion</span> wardrobe, you’re helping
            us spread love and support.
          </p>
          <p className="text-[#a8a5a5]">
            With <span className="font-bold text-white">fast shipping</span> and a focus on{' '}
            <span className="font-bold text-white">modern outfits</span>, MOMIFA delivers more than
            clothes—we bring a mission of compassion to your doorstep. When you choose MOMIFA,
            you’re not just investing in{' '}
            <span className="font-bold text-white">minimalist style</span> but also supporting a{' '}
            <span className="font-bold text-white">small business</span> that cares deeply about
            making a difference.
          </p>
        </div>
        <HideFooter />
      </div>
    </div>
  )
}

export default Story
