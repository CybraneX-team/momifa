import React from 'react'
import { HideFooter } from '../../_components/HideFooter'

const Quality = () => {
  return (
    <div className="bg-[url('/media/pages-bg.png')] bg-no-repeat bg-cover bg-fixed">
      <div className="flex gap-8 p-8 max-w-7xl mx-auto pt-24 ">
        <div className="flex-1 space-y-8 ">
          <div>
            <h2 className="text-indigo-600 mb-2">MOdern MInimal FAshion</h2>
            <h1 className=" text-4xl md:text-5xl font-bold mb-6 text-white">Quality</h1>
          </div>

          <p className="text-[#a8a5a5]">
            The MOMIFA clothing line is all about{' '}
            <span className="font-bold text-white">high quality </span>, thoughtfully crafted with
            care by skilled artisans from Sri Lanka, a garment capital. These talented craftsmen
            pour their dedication and expertise into every stitch, ensuring that each garment
            exemplifies <span className="font-bold text-white"> modern clothing style </span> and an
            enduring commitment to excellence. We take pride in selecting the finest fabrics,
            guaranteeing a luxurious and comfortable experience for everyone who wears our clothes.
            From intricate designs to precise construction, every detail is executed to perfection.
            Our dedication to quality goes beyond aesthetics; we're committed to creating
            <span className="font-bold text-white"> sustainable fashion </span> pieces that stand
            the test of time.
          </p>
          <p className="text-[#a8a5a5]">
            The artisans from Sri Lanka bring a unique flair to our collection, blending their rich
            heritage of craftsmanship with{' '}
            <span className="font-bold text-white">modern fashion</span> sensibilities. Their
            expertise infuses every piece with authenticity and tradition. By carefully selecting
            fabrics from trusted suppliers, we ensure that every thread meets our rigorous
            standards. The result is a collection of{' '}
            <span className="font-bold text-white">minimalist clothing</span> that effortlessly
            combines <span className="font-bold text-white">timeless basics with modern wear</span>{' '}
            , delivering an elevated experience in style and comfort.
          </p>

          <p className="text-[#a8a5a5]">
            At MOMIFA, our clothing represents a fusion of premium quality, expert craftsmanship,
            and exquisite materials. It’s more than just fashion—it’s an investment in{' '}
            <span className="font-bold text-white">modern outfits</span> that reflect enduring
            quality and timeless elegance. Whether it’s for{' '}
            <span className="font-bold text-white">everyday outfits</span> or a polished look with{' '}
            <span className="font-bold text-white"></span>classic polos, our collection embodies the
            pinnacle of sophistication and <span className="font-bold text-white"></span>
            minimalist style.
          </p>
          <p className="text-[#a8a5a5]">
            Choosing MOMIFA means supporting a{' '}
            <span className="font-bold text-white">small business</span> that values sustainability
            and community. With <span className="font-bold text-white"></span> fast shipping, we
            make it easy to embrace <span className="font-bold text-white">modern clothing </span>
            while also contributing to meaningful causes, including efforts to{' '}
            <span className="font-bold text-white">support autism</span> and promote inclusivity.
            When you wear MOMIFA, you’re not just buying clothes—you’re stepping into a world of
            style, comfort, and purpose.
          </p>
        </div>
        <HideFooter />
      </div>
    </div>
  )
}

export default Quality
