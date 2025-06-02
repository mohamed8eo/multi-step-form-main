import React, { useState, useEffect } from 'react'

const Add_ons = ({ onStepComplete, onStepBack, initialData }) => {
  const [selectedAddons, setSelectedAddons] = useState(
    initialData ? 
    initialData.reduce((acc, addon) => ({
      ...acc,
      [addon]: true
    }), {}) :
    {
      'Online Service': false,
      'Larger storage': false,
      'Customizable profile': false
    }
  )

  const handleToggle = (addonName) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonName]: !prev[addonName]
    }))
  }

  const ADD_On = {
    "Online Service": {
      description: "Access to multiplayer games",
      price: 1
    },
    "Larger storage": {
      description: "Extra 1TB cloud save",
      price: 2
    },
    "Customizable profile": {
      description: "Custom theme on your profile",
      price: 2
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Get selected addons
    const selectedAddonsList = Object.entries(selectedAddons)
      .filter(([, isSelected]) => isSelected)
      .map(([name]) => ({
        name,
        price: `$${ADD_On[name].price}/mo`
      }))

    // Calculate total
    const total = Object.entries(selectedAddons)
      .filter(([, isSelected]) => isSelected)
      .reduce((sum, [name]) => sum + ADD_On[name].price, 0)

    // Save to localStorage before submitting
    localStorage.setItem('selectedAddons', JSON.stringify(selectedAddons))

    // Submit form data
    onStepComplete({
      addons: selectedAddonsList,
      price: total
    })
  }

  // Initialize state from localStorage if available
  useEffect(() => {
    const savedAddons = localStorage.getItem('selectedAddons')
    if (savedAddons) {
      setSelectedAddons(JSON.parse(savedAddons))
    }
  }, [])

  // Add useEffect to handle page unload
  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear()
    }

    window.addEventListener('beforeunload', handleUnload)

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  return (
    <div className="max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8">
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-[2rem]">Pick add-ons</h2>
          <p className="mb-10 text-[#9699ab] leading-[1.5em] font-normal">
            Add-ons help to enhance your gaming experience.
          </p> 
          
          <div className='flex gap-4 flex-col mb-6 :'>
            {Object.entries(ADD_On).map(([name, { description, price }]) => (
              <div 
                key={name}
                onClick={() => handleToggle(name)}
                className="flex items-center gap-8 p-6 border border-[#d6d9e6] rounded-lg cursor-pointer transition-all duration-200 ease-in-out peer-checked:bg-[#f0f5ff] peer-checked:border-[#473dff] hover:border-[#473dff]"
              >
                <input 
                  type="checkbox"
                  checked={selectedAddons[name]}
                  onChange={() => handleToggle(name)}
                  className="accent-[#473dff] w-[1.2rem] aspect-square cursor-pointer shrink-0 peer" 
                />
                <div>
                  <h4 className="text-[1.1rem] text-[#02295a] mb-1">{name}</h4>
                  <p className="font-normal text-[#9699ab] leading-[1.5em]">{description}</p>
                </div>
                <p className="ml-auto font-bold text-[#473dff]">+${price}/mo</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-auto">
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

export default Add_ons
