type StepProps = {
  currentStep: 'input' | 'prd' | 'epics' | 'stories'
  onStepClick: (step: 'input' | 'prd' | 'epics' | 'stories') => void
  hasContent: {
    prd: boolean
    epics: boolean
    stories: boolean
  }
}

const steps = [
  { id: 'input', name: 'Product Details' },
  { id: 'prd', name: 'PRD' },
  { id: 'epics', name: 'Epics' },
  { id: 'stories', name: 'Stories' }
] as const

export function Steps({ currentStep, onStepClick, hasContent }: StepProps) {
  return (
    <nav aria-label="Progress">
      <ol className="grid grid-cols-2 gap-2 sm:flex sm:space-x-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id
          const hasStepContent = step.id === 'input' || hasContent[step.id as keyof typeof hasContent]
          
          return (
            <li key={step.name} className="sm:flex-1">
              <button
                onClick={() => hasStepContent && onStepClick(step.id)}
                className={`
                  w-full px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md
                  ${hasStepContent ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                  ${isActive ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 
                    hasStepContent ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700' :
                    'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}
                `}
                disabled={!hasStepContent}
              >
                {step.name}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

