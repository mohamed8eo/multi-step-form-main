import React from 'react'

const Summary = ({ formData, onStepComplete, onStepBack, onChangePlan }) => {
  const { plan, addons } = formData

  // Extract numeric value from price string
  const getPriceValue = (priceString) => {
    return Number(priceString.replace(/[^0-9.-]+/g, ''))
  }

  // Calculate total including plan price and addons
  const totalPrice = getPriceValue(plan.price) + formData.total

  const handleChangePlan = (e) => {
    e.preventDefault()
    onChangePlan(2) // Navigate back to step 2 (Select-plan)
  }

  return (
    <>
      <div className="max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8">
      <div className="flex-1 overflow-auto">
        <form onSubmit={(e) => {
            e.preventDefault()
            onStepComplete({
              step: 'summary',
              status: 'completed'
            })
        }}>
          <h2 className="text-[2rem]">Finishing up</h2>
          <p className="mb-10 text-[#9699ab] leading-[1.5em] font-normal">
            Double-check everything looks OK before confirming.
            </p> 
            
          <div className="bg-[#f0f5ff] p-8 rounded-lg flex flex-col gap-6 mb-8">
              <div className='summary_detills border-b border-b-[#d6d9e6] pb-8'>
                <div>
                  <h3 className="capitalize  font-bold text-[1.3rem] text-[#02295a] mb-1">
                    {plan.name} ({plan.billingCycle})
                  </h3>
                  <button 
                    onClick={handleChangePlan}
                    className="underline cursor-pointer text-[#9699ab] hover:text-[#473dff] transition-colors duration-200 ease-in-out"
                  >
                    Change
                  </button>
                </div>
                {/* list of adding  */}
                <div className='font-extrabold text-[1.1rem] text-[#02295a]'>{plan.price}</div>
              </div>
              
              {/* Add-ons section */}
              <div className='flex flex-col gap-4'>
                {addons && addons.map((addon, index) => (
                  <div key={index} className='flex items-center justify-between'>
                    <p className='text-[#9699ab]'>{addon.name}</p>
                    <p className='text-[#02295a] font-bold'>+{addon.price}</p>
                  </div>
                ))}
              </div>

              {/* Total section */}
              <div className='flex items-center justify-between mt-4'>
                <p className='text-[#9699ab]'>Total (per {plan.billingCycle})</p>
                <p className='text-[#473dff] font-bold text-[1.3rem]'>
                  +${totalPrice}/{plan.billingCycle === 'monthly' ? 'mo' : 'yr'}
                </p>
              </div>
          </div>

          <div className="flex justify-between mt-auto">
            <button
              type="button"
              onClick={onStepBack}
              className="border-none px-6 py-4 rounded-lg font-medium text-base cursor-pointer text-[#9699ab] transition-colors duration-200 ease-in-out hover:text-[#02295a] "
            >
              Go Back
            </button>
            <button 
              type="submit"
              className="border-none px-6 py-4 rounded-lg font-bold text-base cursor-pointer text-white ml-auto transition-[filter] duration-200 ease-in-out bg-[#473dff] hover:opacity-90 tracking-widest"
            > 
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Summary
