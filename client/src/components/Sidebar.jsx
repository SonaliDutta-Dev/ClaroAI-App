import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import {
  Eraser, FileText, Hash, House, Image,
  LogOut, QrCode, Scissors, SquarePen,
  Users, Youtube, Camera
} from 'lucide-react'

import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', lable: 'Dashboard', Icon: House },
  { to: '/ai/write-article', lable: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', lable: 'Blog Titles', Icon: Hash },
  { to: '/ai/qr-generator', lable: 'QR Generator', Icon: QrCode },
  { to: '/ai/extract-text', lable: 'Image to Text', Icon: Image },
  { to: '/ai/generate-images', lable: 'Generate Images', Icon: Image },
  { to: '/ai/image-compressor', lable: 'Compress Resize', Icon: Image },
  { to: '/ai/remove-background', lable: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', lable: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', lable: 'Review Resume', Icon: FileText },
  { to: '/ai/pdf-summarizer', lable: 'DocuSense', Icon: FileText },
  { to: '/ai/youtube-summarizer', lable: 'YouTube Summarizer', Icon: Youtube },
  { to: '/ai/community', lable: 'Community', Icon: Users },
  { to: '/ai/exam-generator', lable: 'Exam Generator', Icon: FileText },
  { to: '/ai/image-caption', lable: 'Image Captioner', Icon: Camera },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`
        w-64 bg-white/75 backdrop-blur-xl border-r border-gray-200
        flex flex-col justify-between
        max-sm:fixed top-14 bottom-0 left-0 z-40
        transition-all duration-300 ease-in-out
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      `}
    >

      {/* Top */}
      <div className="my-6 px-5 overflow-y-auto">
        <img
          src={user.imageUrl}
          alt="avatar"
          className="w-16 h-16 mx-auto rounded-full shadow"
        />

        <h1 className="mt-3 text-center font-semibold text-[#222]">
          {user.fullName}
        </h1>

        <div className="mt-8 space-y-2">
          {navItems.map(({ to, lable, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) => `
                px-5 py-2.5 flex items-center gap-4 rounded-lg transition
                ${isActive
                  ? 'bg-gradient-to-r from-[#8d7bff] to-[#c58aff] text-white shadow'
                  : 'hover:bg-gray-100 text-[#333]'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{lable}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 px-5 py-4 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
        >
          <img
            src={user.imageUrl}
            className="w-10 h-10 rounded-full shadow"
          />
          <div>
            <h1 className="text-sm font-medium text-[#222]">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">Premium</Protect> plan
            </p>
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-red-500 cursor-pointer transition"
        />
      </div>

    </div>
  )
}

export default Sidebar
