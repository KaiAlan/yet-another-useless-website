import Image from 'next/image'
import React from 'react'

const ImageMorph = () => {
  return (
    <div className='w-full min-h-screen bg-black text-white flex flex-col justify-start items-center pt-20 mx-auto'>
        <div className='flex felx-col justify-start items-start gap-4'>
          <h1></h1>
          <Image
            src='/images/epx-2.png'
            alt='image'
            width={0}
            height={0}
            placeholder='empty'
            className='w-[500px] h-auto [perspective:1000px] [rotateZ:20deg] [rotateY:30deg]'
          />
        </div>
    </div>
  )
}

export default ImageMorph