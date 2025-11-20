import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plan = () => {
  return (
    <div className="w-full px-6 sm:px-14 py-24">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[36px] sm:text-[42px] font-semibold text-[#222]">
          Choose Your Plan
        </h2>
        <p className="text-[#555] max-w-lg mx-auto text-sm">
          Start for free and scale up as you grow.
        </p>
      </div>

      {/* Clerk Pricing inside soft gradient block */}
      <div
        className="
          max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl 
          bg-white/70 backdrop-blur-md border border-gray-200
          shadow-[0_0_25px_rgba(150,120,255,0.15)]
        "
      >
        <PricingTable />
      </div>

    </div>
  )
}

export default Plan
