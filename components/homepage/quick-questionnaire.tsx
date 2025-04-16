"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, HelpCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function QuickQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const questions = [
    {
      id: "spending",
      question: "How would you rate your spending this week?",
      type: "radio",
      options: [
        { value: "excellent", label: "Excellent - Under budget" },
        { value: "good", label: "Good - On budget" },
        { value: "fair", label: "Fair - Slightly over budget" },
        { value: "poor", label: "Poor - Well over budget" },
      ],
    },
    {
      id: "savings",
      question: "Did you add to your savings this week?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "stress",
      question: "Rate your financial stress level (1-10)",
      type: "slider",
      min: 1,
      max: 10,
    },
  ]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    })
  }

  const renderQuestion = () => {
    const question = questions[currentStep]

    switch (question.type) {
      case "radio":
        return (
          <RadioGroup value={answers[question.id] || ""} onValueChange={handleAnswer} className="mt-4 space-y-3">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "slider":
        return (
          <div className="mt-6 space-y-6">
            <Slider
              value={answers[question.id] ? [answers[question.id]] : [5]}
              min={question.min}
              max={question.max}
              step={1}
              onValueChange={(value) => handleAnswer(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Stress</span>
              <span>High Stress</span>
            </div>
            {answers[question.id] && (
              <div className="text-center">
                <Badge variant="outline" className="text-sm">
                  {answers[question.id]}
                </Badge>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Daily Financial Check-in</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 rounded-full bg-green-500/10 p-3">
            <Check className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Check-in Complete!</h3>
          <p className="mb-6 text-muted-foreground">
            Thanks for your input. We've updated your financial insights based on your answers.
          </p>
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary">+5 Points</Badge>
            <Badge variant="outline">Streak +1</Badge>
          </div>
          <Button asChild>
            <Link href="/dashboard">View Updated Insights</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Daily Financial Check-in</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentStep + 1) / questions.length) * 100} className="h-2" />
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium">{questions[currentStep].question}</h3>
          {renderQuestion()}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!answers[questions[currentStep].id]}>
          {currentStep === questions.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
