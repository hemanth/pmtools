'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generatePRD, generateEpics, generateStories } from "@/lib/ai"
import { Loader2, ArrowRight, Edit2, Sparkles } from 'lucide-react'
import { MarkdownDisplay } from "./markdown-display"
import { Steps } from "./steps"

const EXAMPLE_DATA = {
  productName: "TaskFlow Pro",
  productDescription: "A smart task management application designed for remote teams. It uses AI to automatically prioritize tasks, suggest optimal task distribution among team members, and provide insights into team productivity patterns.",
  targetAudience: "Remote-first companies and distributed teams of 10-500 people, particularly in tech, consulting, and creative industries. Primary users include project managers, team leads, and individual contributors who need to collaborate effectively across different time zones.",
  businessGoals: "1. Achieve 10,000 active users within the first 6 months\n2. Maintain a user retention rate of 80% after 3 months\n3. Generate $500,000 in annual recurring revenue through subscription model\n4. Establish partnerships with 5 major remote-work platforms"
}

type Step = 'input' | 'prd' | 'epics' | 'stories'

export function ProductForm() {
  const [formData, setFormData] = useState(EXAMPLE_DATA)
  const [prd, setPrd] = useState("")
  const [epics, setEpics] = useState("")
  const [stories, setStories] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('input')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const prdContent = await generatePRD(
        formData.productName,
        formData.productDescription,
        formData.targetAudience,
        formData.businessGoals
      )
      setPrd(prdContent)
      setCurrentStep('prd')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateEpics() {
    setLoading(true)
    try {
      const epicsContent = await generateEpics(prd)
      setEpics(epicsContent)
      setCurrentStep('epics')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateStories(epic: string) {
    setLoading(true)
    try {
      const storiesContent = await generateStories(epic)
      setStories(storiesContent)
      setCurrentStep('stories')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStepClick = (step: Step) => {
    if (
      (step === 'prd' && !prd) || 
      (step === 'epics' && !epics) || 
      (step === 'stories' && !stories)
    ) {
      return;
    }
    setCurrentStep(step);
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <Steps 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
        hasContent={{
          prd: !!prd,
          epics: !!epics,
          stories: !!stories
        }}
      />
      
      {currentStep === 'input' && (
        <Card className="transition-all hover:shadow-lg w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Product Details</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Start by providing basic information about your product
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 overflow-x-auto">
            <form id="product-form" onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter the product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your product and its main features"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="Who is this product for?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessGoals">Business Goals</Label>
                <Textarea
                  id="businessGoals"
                  name="businessGoals"
                  value={formData.businessGoals}
                  onChange={handleInputChange}
                  placeholder="What are the business objectives?"
                  required
                />
              </div>
            </form>
          </CardContent>
          <div className="flex justify-end px-6 py-4 border-t">
            <Button 
              type="submit" 
              form="product-form" 
              disabled={loading}
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate PRD
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 'prd' && (
        <Card className="transition-all hover:shadow-lg w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-display">Product Requirements Document</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentStep('input')}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
              <Button 
                size="sm"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const newPrd = await generatePRD(
                      formData.productName,
                      formData.productDescription,
                      formData.targetAudience,
                      formData.businessGoals
                    );
                    setPrd(newPrd);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Regenerate PRD
              </Button>
              <Button 
                size="sm"
                onClick={handleGenerateEpics}
                disabled={loading}
                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Epics
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 overflow-x-auto">
            <MarkdownDisplay 
              content={prd} 
              onEdit={(newContent) => setPrd(newContent)} 
            />
          </CardContent>
        </Card>
      )}

      {currentStep === 'epics' && (
        <Card className="transition-all hover:shadow-lg w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-display">Epics</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const newEpics = await generateEpics(prd);
                    setEpics(newEpics);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Regenerate Epics
              </Button>
              <Button 
                size="sm"
                onClick={() => handleGenerateStories(epics)}
                disabled={loading}
                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Stories
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 overflow-x-auto">
            <MarkdownDisplay
              content={epics}
              onEpicClick={handleGenerateStories}
              onEdit={(newContent) => setEpics(newContent)}
            />
          </CardContent>
        </Card>
      )}

      {currentStep === 'stories' && (
        <Card className="transition-all hover:shadow-lg w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-display">User Stories</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentStep('epics')}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Epics
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 overflow-x-auto">
            <MarkdownDisplay 
              content={stories} 
              onEdit={(newContent) => setStories(newContent)} 
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

