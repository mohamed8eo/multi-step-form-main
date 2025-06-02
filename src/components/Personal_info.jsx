import { useState } from 'react'

const Personal_info = ({ onStepComplete, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || ''
  })
  const [errors, setErrors] = useState({})

  const Input_Field = {
    name: {
      type: "text",
      placeholder: "e.g. Stephen King",
      autoComplete: "name"
    },
    email: {
      type: "email",
      placeholder: "e.g. stephenking@lorem.com",
      autoComplete: "email"
    },
    phone: {
      type: "tel",
      placeholder: "e.g. +1 234 567 890",
      autoComplete: "tel"
    }
  }

  const validateField = (field, value) => {
    if (!value.trim()) {
      return 'This field is required'
    }

    switch (field) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        break
      }
      case 'phone': {
        const phoneRegex = /^\+?[\d\s-]+$/
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number'
        }
        break
      }
    }
    return ''
  }

  const handleChange = (field, value) => {
    // For phone number, only allow numbers, spaces, + and -
    if (field === 'phone' && value) {
      const lastChar = value[value.length - 1]
      if (!/[\d\s+-]/.test(lastChar)) {
        return
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Validate on change
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Check all fields with validation
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    // If there are errors, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // If no errors, proceed to next step
    onStepComplete({
      personalInfo: formData
    })
  }

  return (
    <div className="max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8">
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-[2rem]">Personal Info</h2>
          <p className="mb-10 text-[#9699ab] leading-[1.5em] font-normal">
            Please provide your name, email, address, and phone number.
          </p>
          {Object.entries(Input_Field).map(([label, { type, placeholder, autoComplete }]) => (
            <div key={label} className="flex flex-col gap-2 mb-6 relative">
              <div className="flex justify-between">
                <label className="ml-1 font-bold text-[#02295a]">
                  {label}
                </label>
                {errors[label] && (
                  <span className="text-[#ed3548] text-sm font-bold">
                    {errors[label]}
                  </span>
                )}
              </div>
              <input
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={formData[label]}
                onChange={(e) => handleChange(label, e.target.value)}
                className={`p-3 text-[1rem] border ${errors[label] ? 'border-[#ed3548]' : 'border-[#d6d9e6]'} rounded-lg outline-none text-[#02295a] font-bold focus:border-[#02295a]`}
              />
            </div>
          ))}
          <div className="flex mt-auto">
            <button 
              type="submit"
              className="border-none px-6 py-4 rounded-lg font-medium font-inherit text-base cursor-pointer text-white ml-auto transition-[filter] duration-200 ease-in-out bg-[#02295a] hover:opacity-90"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Personal_info

