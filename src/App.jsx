import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Step_form from './Step_form'



const App = () => {
    const Form_steps = {
    1: "your info",
    2: "select plan",
    3: "add-ons",
    4: "summary"
  }


  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isActiveStep = (step) => currentStep === Number(step)
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <>
      <main className='w-[100%] h-[100vh] py-8 px-4 grid place-items-center bg-[#fafbff]'>
        <div className="w-full max-w-[1000px] md:p-4 rounded-lg grid md:grid-cols-[320px_1fr] shadow-[10px_10px_80px_-10px_#0000001a] overflow-hidden  md:bg-white p-0 grid-cols-1 isolate relative">
          <div className={`py-12 px-8 rounded ${isMobile?'bg-[url("/assets/images/bg-sidebar-mobile.svg")]':'bg-[url("/assets/images/bg-sidebar-desktop.svg")]'} bg-no-repeat bg-center bg-cover flex md:flex-col gap-8 overflow-auto absolute top-0 z-[-1] flex-row h-[16rem] md:z-1 md:relative md:h-auto md:w-auto w-full justify-center md:justify-start`}>
            {Object.entries(Form_steps).map(([step, title]) => (
              <div key={step} className='flex items-start gap-4 cursor-pointer h-max'>
                <div className={`w-10 aspect-[1] rounded-full grid place-items-center 
                  ${isActiveStep(step) 
                    ? 'border-2 bg-[#bfe2fd] text-[#02295a] border-[#bfe2fd]' 
                    : 'text-[#bfe2fd] border'} 
                  transition-all duration-200 ease-in-out`}>
                  {step}
                </div>
                {!isMobile && 
                <div>
                  <p className='text-[#d6d9e6] mb-1 text-[.9rem]'>
                    Step {step}
                  </p>
                  <h1 className='text-white text-[1rem] uppercase'>{title}</h1>
                </div>
                }
              </div>
            ))}
        </div>
          <div className="pt-16 px-8 pb-8 max-w-[600px] w-full justify-self-center flex flex-col overflow-hidden gap-8 bg-white md:m-0 mt-32 rounded-[20px] md:rounded-none">
            <Step_form currentStep={currentStep} setCurrentStep={setCurrentStep} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App



