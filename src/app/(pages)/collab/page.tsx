import React from 'react';
import { HideFooter } from '../../_components/HideFooter';
const MOMIFALandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center md:justify-normal md:flex-row pt-20 px-5">
      <div className="flex-1 p-8 ">
        <h1 className="text-4xl font-bold text-white">Join the MOMIFA community</h1>
        <p className='text-white mt-10'>MOMIFA was founded in September of 2022 by two fellas from different parts of the world - one from New Jersey and one from Sri Lanka. We created this brand for everyone who loves to dress in a fashionable minimalist way. Our goal was to create a high quality, minimalist fashion style that was also very affordable.</p>

        <h2 className="text-xl font-bold text-white mt-16">Partnership Opportunities</h2>
        <div className="flex items-center flex-wrap gap-4 mt-5 ">
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Affiliate marketing</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Discount codes</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Campaigns</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Usage rights</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Content creation</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Additional opportunities</div>
          <div className="bg-[#212121] text-white px-4 py-2 rounded-xl w-52 cursor-pointer border border-[#383838]">Gifting</div>
        </div>

        <div className="bg-[#212121] px-6 py-2 rounded-full inline-block mt-10 border border-[#383838]">
            <button className="text-transparent bg-gradient-to-r from-[#D2B4FF] to-[#828BFF] bg-clip-text font-bold">
                Apply Now
                </button>
                </div>
      </div>
      <div className="flex-1 ml-5 max-w-sm rounded-lg">
      <img src="/media/collab.jpg" alt="" 
      className='w-full h-full rounded-lg'
      />
      </div>
      <HideFooter />
    </div>
  );
};

export default MOMIFALandingPage;