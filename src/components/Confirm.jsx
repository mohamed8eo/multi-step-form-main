import React from 'react'

const Confirm = () => {
  return (
    <div className="max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8 py-[120px]">
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center text-center">
        <img 
          src="./assets/images/icon-thank-you.svg" 
          alt="Thank you icon"
          className="mb-8 w-20"
        />
        <h2 className="text-[2rem] text-[#02295a] mb-4">Thank you!</h2>
        <p className="text-[#9699ab] leading-[1.5em] font-normal max-w-[500px]">
          Thanks for confirming your subscription! We hope you have fun using our platform. 
          If you ever need support, please feel free to email us at support@loremgaming.com.
        </p>
      </div>
    </div>
  )
}

export default Confirm