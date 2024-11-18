import Paragraph from '@/components/paragraph'
import React from 'react'
import Word from "@/components/word";
import Character from '@/components/character'

 const paragraph = 'The Overlay works with most liners and is compatible with distal fixation, suspension sleeves, active and passive vacuum systems.'

const RevealText = () => {
  return (
<div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-black">
      <div className="fixed top-0 left-0 w-full flex flex-col items-center text-white z-50 py-4 pt-20 backdrop-blur-lg">
      <span className="text-lg font-semibold">Scroll down to see the text reveal</span>
      <div className="animate-bounce mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18m0 0l-6-6m6 6l6-6"
          />
        </svg>
      </div>
    </div>
      <Word value={paragraph} />
      <Character value={paragraph} />
      <Paragraph value={paragraph} />

    </div>

  )
}

export default RevealText