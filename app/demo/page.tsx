"use client"

import { motion } from "framer-motion"
import { Card3D } from "@/components/ui/card-3d"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Status bar */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-1">
          <div className="text-xs">9:41</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="mr-4 h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-cyan-500/10 flex items-center justify-center">
            <span className="text-xl font-bold">
              Fin<span className="text-cyan-400">X</span>
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">3D Card Effects</h1>
            <p className="text-blue-400/80">Interactive demo of 3D card effects</p>
          </div>
        </div>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="bg-[#111] rounded-full p-1 flex mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
              activeTab === "basic" ? "bg-[#000] text-white" : "text-blue-400/80"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
              activeTab === "parallax" ? "bg-[#000] text-white" : "text-blue-400/80"
            }`}
            onClick={() => setActiveTab("parallax")}
          >
            Parallax
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
              activeTab === "advanced" ? "bg-[#000] text-white" : "text-blue-400/80"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>

        {/* Card content based on active tab */}
        <div className="grid grid-cols-2 gap-4">
          {activeTab === "basic" && (
            <>
              <Card3D className="h-64 p-6 bg-[#111] rounded-3xl">
                <div className="flex h-full flex-col justify-between">
                  <h3 className="text-xl font-bold">Basic 3D Card</h3>
                  <p className="text-blue-400/80">Hover over this card to see the basic 3D rotation effect.</p>
                  <div className="flex justify-end">
                    <Button className="bg-[#222] hover:bg-[#333] text-white border-none">Interact</Button>
                  </div>
                </div>
              </Card3D>

              <Card3D className="h-64 p-6 bg-cyan-500 rounded-3xl" glareIntensity={0.3}>
                <div className="flex h-full flex-col justify-between text-white">
                  <h3 className="text-xl font-bold">Colored Card with Glare</h3>
                  <p>This card has a custom background color and enhanced glare effect.</p>
                  <div className="flex justify-end">
                    <Button variant="secondary" className="bg-[#111] hover:bg-[#222] text-white">
                      Interact
                    </Button>
                  </div>
                </div>
              </Card3D>
            </>
          )}

          {activeTab === "parallax" && (
            <>
              <Card3D className="h-64 p-6 bg-[#111] rounded-3xl" depth={50}>
                <div className="relative h-full">
                  {/* Background layer */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />

                  {/* Middle layer with higher translateZ for parallax */}
                  <motion.div style={{ translateZ: 40 }} className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-80" />
                  </motion.div>

                  {/* Top layer with highest translateZ */}
                  <motion.div style={{ translateZ: 80 }} className="absolute inset-x-0 bottom-6">
                    <h3 className="text-center text-xl font-bold">Parallax Layers</h3>
                    <p className="text-center text-sm text-blue-400/80">
                      This card has multiple layers at different depths
                    </p>
                  </motion.div>
                </div>
              </Card3D>

              <Card3D className="h-64 overflow-hidden p-0 rounded-3xl" depth={40}>
                <div className="relative h-full">
                  {/* Background image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-900"></div>

                  {/* Content overlay with parallax */}
                  <motion.div
                    style={{ translateZ: 60 }}
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
                  >
                    <h3 className="text-xl font-bold">Image Parallax</h3>
                    <p className="text-sm text-blue-400/80">Content appears to float above the background image</p>
                  </motion.div>
                </div>
              </Card3D>
            </>
          )}

          {activeTab === "advanced" && (
            <>
              <Card3D className="h-64 p-6 bg-[#111] rounded-3xl" rotationIntensity={25} glareIntensity={0.4}>
                <div className="relative h-full">
                  {/* Floating elements at different depths */}
                  <motion.div
                    style={{ translateZ: 30 }}
                    className="absolute left-4 top-4 h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500"
                  />
                  <motion.div
                    style={{ translateZ: 50 }}
                    className="absolute right-8 top-8 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                  />
                  <motion.div
                    style={{ translateZ: 70 }}
                    className="absolute bottom-8 left-10 h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-red-500 rotate-45"
                  />

                  <motion.div style={{ translateZ: 90 }} className="absolute inset-x-0 bottom-6 text-center">
                    <h3 className="text-xl font-bold">Advanced 3D</h3>
                    <p className="text-sm text-blue-400/80">Multiple floating elements at different depths</p>
                  </motion.div>
                </div>
              </Card3D>

              <Card3D className="h-64 overflow-hidden p-0 rounded-3xl" depth={60} glareIntensity={0.5}>
                <div className="relative h-full bg-gradient-to-br from-cyan-900 to-blue-900">
                  {/* Grid lines */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* 3D elements */}
                  <motion.div style={{ translateZ: 40 }} className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-32 w-32">
                      <motion.div
                        className="absolute h-full w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80"
                        animate={{
                          rotateY: [0, 180, 360],
                          rotateX: [0, 180, 0],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div style={{ translateZ: 80 }} className="absolute inset-x-0 bottom-6 p-4 text-white">
                    <h3 className="text-xl font-bold">Cyberpunk Grid</h3>
                    <p className="text-sm text-blue-400/80">Futuristic 3D visualization with animated elements</p>
                  </motion.div>
                </div>
              </Card3D>
            </>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-around items-center p-4 border-t border-[#222] mt-auto">
        <Link href="/" className="flex flex-col items-center text-blue-400/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center text-blue-400/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 20V10M12 20V4M6 20V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link href="/activity" className="flex flex-col items-center text-blue-400/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-1">Activity</span>
        </Link>
        <Link href="/streaks" className="flex flex-col items-center text-blue-400/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 12H18L15 21L9 3L6 12H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-1">Streaks</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-blue-400/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-1">Chat</span>
        </Link>
      </div>
    </div>
  )
}
