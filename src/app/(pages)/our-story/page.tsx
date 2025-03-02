import React from 'react'
import { HideFooter } from '../../_components/HideFooter'

const Story = () => {
  return (
    // <div className="bg-[url('/media/pages-bg.png')] bg-no-repeat bg-cover bg-fixed h-screen">
    //   <div className="flex gap-8 p-8 max-w-7xl mx-auto pt-24 ">
    //     <div className="flex-1 space-y-8 ">
    //       <div>
    //         <h2 className="text-indigo-600 mb-2">MOdern MInimal FAshion</h2>
    //         <h1 className=" text-4xl md:text-5xl font-bold mb-6 text-white">Our Story</h1>
    //       </div>

    //       <p className="text-[#a8a5a5]">
    //         MOMIFA clothing isn’t just about looking good; it’s about embracing{' '}
    //         <span className="font-bold text-white">high quality </span> and{' '}
    //         <span className="font-bold text-white"> modern fashion </span> and an with a purpose.
    //         Imagine famous people like Steve Jobs, Mark Zuckerberg, and Elon Musk, who kept things
    //         simple in their lives. Our clothes follow that philosophy – simple, elegant, and perfect
    //         for <span className="font-bold text-white"> everyday outfits </span> , designed to help
    //         you focus on your goals without unnecessary distractions. We create{' '}
    //         <span className="font-bold text-white"> modern clothing styles </span> that inspire,
    //         just like these successful individuals.
    //       </p>
    //       <p className="text-[#a8a5a5]">
    //         Simplicity lies at the heart of our brand. It’s not just about appearance but also about
    //         how our clothes make you feel. At MOMIFA, we believe in{' '}
    //         <span className="font-bold text-white">sustainable fashion</span> and care deeply about
    //         the environment. That’s why our materials and crafting methods reflect our commitment to
    //         eco-friendly practices. We deliver timeless{' '}
    //         <span className="font-bold text-white">basics and minimalist clothing</span> that blend
    //         responsibility with <span className="font-bold text-white">modern wear.</span>
    //       </p>

    //       <p className="text-[#a8a5a5]">
    //         But our story is about more than fashion. MOMIFA stands for kindness and action. Some of
    //         our revenue supports children with autism and disabled veterans because we believe in
    //         giving back. Every purchase contributes to these meaningful causes. Whether you're
    //         picking out <span className="font-bold text-white">classic polos</span> or curating a
    //         <span className="font-bold text-white">minimal fashion</span> wardrobe, you’re helping
    //         us spread love and support.
    //       </p>
    //       <p className="text-[#a8a5a5]">
    //         With <span className="font-bold text-white">fast shipping</span> and a focus on{' '}
    //         <span className="font-bold text-white">modern outfits</span>, MOMIFA delivers more than
    //         clothes—we bring a mission of compassion to your doorstep. When you choose MOMIFA,
    //         you’re not just investing in{' '}
    //         <span className="font-bold text-white">minimalist style</span> but also supporting a{' '}
    //         <span className="font-bold text-white">small business</span> that cares deeply about
    //         making a difference.
    //       </p>
    //     </div>
    //     <HideFooter />
    //   </div>
    // </div>
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/*Image */}
          <div className="shrink-0">
            <div className="w-60 h-60 rounded-md overflow-hidden bg-neutral-200">
              <img src="/media/ceo.png" alt="image" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
              Our Steps are growing <br /> bigger and stronger.
            </h1>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed ">
              Our Philosophy: We believe that fashion should empower and inspire. That's why we
              design with purpose: combining modern aesthetics with timeless craftsmanship to create
              clothing that feels as good as it looks. Each collection is carefully curated to
              celebrate diversity and individuality, ensuring that our designs resonate with every
              person's unique identity.
            </p>

            <div className="pt-2 fllex justify-center">
              <button className="border border-neutral-500 text-neutral-300 hover:bg-neutral-800 transition-colors rounded-full px-8 py-2 text-sm duration-200">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story
