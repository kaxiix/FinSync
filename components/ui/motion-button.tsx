"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface MotionButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  motionProps?: React.ComponentProps<typeof motion.button>
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, motionProps, children, ...props }, ref) => {
    return (
      <motion.div {...motionProps} className={cn("w-full", className)}>
        <Button ref={ref} className="w-full" {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)

MotionButton.displayName = "MotionButton"
