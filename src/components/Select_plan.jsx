import { useState } from "react"

const Select_plan = ({ onStepComplete, onStepBack, initialData }) => {
  const [selectedPlan, setSelectedPlan] = useState(initialData?.name || 'arcade')
  const [isYearly, setIsYearly] = useState(initialData?.billingCycle === 'yearly')

  const Plans_Details = {
    arcade: {
      id: "arcade",
      src: "./assets/images/icon-arcade.svg",
      monthly_price: "$9/mo",
      yearly_price: "$90/yr"
    },
    advanced: {
      id: "advanced",
      src: "./assets/images/icon-advanced.svg",
      monthly_price: "$12/mo",
      yearly_price: "$150/yr"
    },
    pro: {
      id: "pro",
      src: "./assets/images/icon-pro.svg",
      monthly_price: "$15/mo",
      yearly_price: "$120/yr"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedPlan) {
      return // Don't proceed if no plan is selected
    }
    
    onStepComplete({ 
      plan: selectedPlan,
      billing: isYearly ? 'yearly' : 'monthly',
      price: isYearly ? Plans_Details[selectedPlan].yearly_price : Plans_Details[selectedPlan].monthly_price,
      planDetails: {
        name: selectedPlan,
        price: isYearly ? Plans_Details[selectedPlan].yearly_price : Plans_Details[selectedPlan].monthly_price,
        billingCycle: isYearly ? 'yearly' : 'monthly'
      }
    })
  }

  return (
    <div className="max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8">
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-[2rem]">Select your plan</h2>
          <p className="mb-10 text-[#9699ab] leading-[1.5em] font-normal">
            You have the option of monthly or yearly billing.
          </p>
          <div className=" grid grid-cols-3 mb-8 gap-4">
              {Object.entries(Plans_Details).map(([label, { id, src, monthly_price, yearly_price }]) => (
                <div key={id}>
                  <input
                    type="radio"
                    name="plan"
                    id={id}
                    value={label}
                    checked={selectedPlan === label}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={label}
                    className="p-4 rounded-lg flex flex-col border border-[#d6d9e6] cursor-pointer transition-all duration-200 ease-in-out peer-checked:bg-[#f0f5ff] peer-checked:border-[#473dff]"
                  >
                    <img
                    className="w-[40px] h-[40px] object-cover mb-16"
                    src={src}
                    alt="Arcade icon (plan)"
                    />
                    <div>
                      <h4 className="mt-auto text-[1.1rem] text-[#02295a] mb-1 capitalize">
                        {label}
                      </h4>
                      <p className="text-[.9rem] font-normal leading-6 text-[#9699ab]">
                        {isYearly ? yearly_price : monthly_price}
                      </p>
                      {isYearly && <p className='font-bold text-[#02295a]'>2 months Free</p>}
                    </div>
                  </label>
                </div>
              ))}
          </div>
          <div className=" bg-[#f0f5ff] p-4 flex  justify-center rounded-lg">
            <div className="flex items-center gap-4">
              <h5 className={`mb-1 ${!isYearly ? 'text-[#02295a]' : 'text-[#9699ab]'}`}>
                Monthly
              </h5>
              <input 
                type="checkbox" 
                id="billing" 
                className="hidden peer"
                checked={isYearly}
                onChange={(e) => setIsYearly(e.target.checked)} 
              />
              <label 
                htmlFor="billing" 
                tabIndex="0"
                className="w-12 aspect-[2/1] block bg-[#02295a] rounded-full relative cursor-pointer p-1 after:content-[''] after:absolute after:bg-white after:top-1 after:bottom-1 after:left-1 after:aspect-square after:rounded-full after:transition-all after:duration-300 after:ease-in-out peer-checked:after:translate-x-6"
              />
              <h5 className={`mb-1 ${isYearly ? 'text-[#02295a]' : 'text-[#9699ab]'}`}>
                Yearly
              </h5>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onStepBack}
              className="border-none px-6 py-4 rounded-lg font-medium text-base cursor-pointer text-[#9699ab] transition-colors duration-200 ease-in-out hover:text-[#02295a]"
            >
              Go Back
            </button>
            <button 
              type="submit"
              className="border-none px-6 py-4 rounded-lg font-medium text-base cursor-pointer text-white ml-auto transition-[filter] duration-200 ease-in-out bg-[#02295a] hover:opacity-90"
            > 
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Select_plan

// display: flex
// ;
//     align-items: center;
//     gap: 1rem;