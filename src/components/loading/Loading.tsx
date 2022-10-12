import React from 'react'
import { Waveform } from '@uiball/loaders'


export default function Loading() {
  return (
    <div className=' bg-primary-100 h-screen w-full flex justify-center items-center '>
      <Waveform 
        size={80}
        lineWeight={5}
        speed={1} 
        color="#007aff" 
        />
    </div>
  )
}
