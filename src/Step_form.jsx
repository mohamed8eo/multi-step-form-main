import { useState, useEffect } from 'react'
import Personal_info from './components/Personal_info'
import Select_plan from './components/Select_plan'
import Add_ons from './components/Add_ons'
import Summary from './components/Summary'
import Confirm from './components/Confirm'

const Step_form = ({ currentStep, setCurrentStep }) => {
  const [formData, setFormData] = useState(() => {
    // Get saved data from localStorage or use default values
    const savedData = localStorage.getItem('formData')
    return savedData ? JSON.parse(savedData) : {
      personalInfo: null,
      plan: null,
      addons: [],
      total: 0
    }
  })

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  // Clear localStorage on page unload
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('formData')
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  const handleStepComplete = (stepData) => {
    // Handle personal info
    if (stepData.personalInfo) {
      setFormData(prev => ({
        ...prev,
        personalInfo: stepData.personalInfo
      }))
    }

    // Handle plan selection
    if (stepData.planDetails) {
      setFormData(prev => ({
        ...prev,
        plan: stepData.planDetails
      }))
    }
    
    // Handle addons selection
    if (stepData.addons) {
      setFormData(prev => ({
        ...prev,
        addons: stepData.addons,
        total: stepData.price
      }))
    }

    setCurrentStep(prev => prev + 1)
  }

  const handleStepBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleChangePlan = (step) => {
    setCurrentStep(step)
  }

  return (
    <>
      {currentStep === 1 && (
        <Personal_info 
          onStepComplete={handleStepComplete}
          initialData={formData.personalInfo} 
        />
      )}
      {currentStep === 2 && (
        <Select_plan 
          onStepComplete={handleStepComplete}
          onStepBack={handleStepBack}
          initialData={formData.plan}
        />
      )}
      {currentStep === 3 && (
        <Add_ons 
          onStepComplete={handleStepComplete}
          onStepBack={handleStepBack}
          initialData={formData.addons}
        />
      )}
      {currentStep === 4 && (
        <Summary 
          formData={formData}
          onStepComplete={handleStepComplete}
          onStepBack={handleStepBack}
          onChangePlan={handleChangePlan}
        />
      )}
      {currentStep === 5 && <Confirm />}
    </>
  )
}

export default Step_form