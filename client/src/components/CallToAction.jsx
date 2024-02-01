import { Button } from 'flowbite-react';
import React from 'react'

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center 
    rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex flex-1 justify-center flex-col  '>
            <h2 className='text-2xl'>Want to learn more about Javascript?</h2>
            <p className='text-gray-500 my-2'>Let's connect on github</p>
            <Button gradientDuoTone={'purpleToPink'} className='rounded-tl-xl rounded-bl-none '>
                <a href="https://github.com/imRkofficial" target='_blank' rel='noopener noreferrer'>
                    Visit Github Profile
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://editor.analyticsvidhya.com/uploads/765900ba9-article-200807-github-gitguardbody-text.jpg" alt="GitHub" />
        </div>
    </div>
  )
}

export default CallToAction;