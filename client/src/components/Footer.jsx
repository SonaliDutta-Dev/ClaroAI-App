import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-br from-[#EEF1FF] via-[#E0CCFF] to-[#D2E0FB] pt-16 pb-10 px-6 md:px-16 lg:px-24 xl:px-32">

            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between gap-12 pb-10 border-b border-black/10">

                    {/* LEFT SIDE */}
                    <div className="md:max-w-xs">
                    <img 
  src={assets.logo} 
  className="h-[110px] sm:h-[140px] lg:h-[180px] mb-4"
  alt="logo"
/>


                        <p className="text-gray-700 text-sm leading-relaxed">
                            Experience the power of ClaroAI.<br />
                            Create, generate and enhance content with cutting-edge AI.
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col sm:flex-row md:justify-end gap-12 sm:gap-20">

                        {/* COMPANY LINKS */}
                        <div>
                            <h2 className="font-semibold mb-3 sm:mb-4 text-gray-900 text-lg">Company</h2>
                            <ul className="text-sm text-gray-700 space-y-2">
                                <li><a className="hover:text-gray-900 transition" href="#">Home</a></li>
                                <li><a className="hover:text-gray-900 transition" href="#">About us</a></li>
                                <li><a className="hover:text-gray-900 transition" href="#">Contact us</a></li>
                                <li><a className="hover:text-gray-900 transition" href="#">Privacy policy</a></li>
                            </ul>
                        </div>

                        {/* NEWSLETTER */}
                        <div className="max-w-xs">
                            <h2 className="font-semibold mb-3 sm:mb-4 text-gray-900 text-lg">
                                Stay Updated
                            </h2>

                            <p className="text-sm text-gray-700 leading-relaxed">
                                Get the latest AI updates, features & releases delivered weekly.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">

                                <input
                                    className="
                                        w-full h-10 px-3 text-sm
                                        placeholder-gray-500 text-gray-800 
                                        rounded-xl outline-none
                                        border border-gray-300 bg-white
                                    "
                                    type="email"
                                    placeholder="Enter your email"
                                />

                                <button
                                    className="
                                        w-full sm:w-auto
                                        px-5 h-10 text-sm rounded-xl text-white font-medium
                                        bg-gradient-to-r from-purple-500 to-fuchsia-500 
                                        hover:opacity-90 transition
                                    "
                                >
                                    Subscribe
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                <p className="pt-6 text-center text-xs md:text-sm text-gray-700">
                    © 2025 ClaroAI — All Rights Reserved.
                </p>

            </div>

        </footer>
    )
}

export default Footer
