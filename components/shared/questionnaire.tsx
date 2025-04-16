"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

// Mock data - would come from your database in a real app
const questions = [
  {
    id: "q1",
    text: "Did you track all your expenses today?",
    type: "boolean",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "q2",
    text: "How would you rate your spending decisions today?",
    type: "rating",
    options: [
      { value: "1", label: "Poor" },
      { value: "2", label: "Fair" },
      { value: "3", label: "Good" },
      { value: "4", label: "Excellent" },
    ],
  },
  {
    id: "q3",
    text: "Did you make progress towards your savings goals?",
    type: "boolean",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "q4",
    text: "Which financial activities did you complete today?",
    type: "multiple",
    options: [
      { value: "budget", label: "Reviewed budget" },
      { value: "bills", label: "Paid bills" },
      { value: "savings", label: "Added to savings" },
      { value: "research", label: "Researched investments" },
    ],
  },
  {
    id: "q5",
    text: "Did you avoid any unnecessary purchases today?",
    type: "boolean",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
]

export function Questionnaire() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const currentQuestion = questions[currentStep]
  const isLastQuestion = currentStep === questions.length - 1

  const handleSingleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleMultipleAnswer = (value: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentValues = (prev[currentQuestion.id] as string[]) || []

      if (checked) {
        return { ...prev, [currentQuestion.id]: [...currentValues, value] }
      } else {
        return {
          ...prev,
          [currentQuestion.id]: currentValues.filter((v) => v !== value),
        }
      }
    })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Questionnaire submitted",
        description: "Your daily financial check-in has been recorded.",
      })

      // Reset the form
      setAnswers({})
      setCurrentStep(0)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit questionnaire. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isNextDisabled = () => {
    const answer = answers[currentQuestion.id]

    if (!answer) return true

    if (currentQuestion.type === "multiple") {
      return (answer as string[]).length === 0
    }

    return false
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentStep + 1} of {questions.length}
          </span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h3 className="mb-4 text-lg font-medium">{currentQuestion.text}</h3>

        {(currentQuestion.type === "boolean" || currentQuestion.type === "rating") && (
          <RadioGroup
            value={(answers[currentQuestion.id] as string) || ""}
            onValueChange={handleSingleAnswer}
            className="space-y-2"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.type === "multiple" && (
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={((answers[currentQuestion.id] as string[]) || []).includes(option.value)}
                  onCheckedChange={(checked) => handleMultipleAnswer(option.value, checked as boolean)}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isSubmitting}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isNextDisabled() || isSubmitting} isLoading={isSubmitting}>
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  )
}
