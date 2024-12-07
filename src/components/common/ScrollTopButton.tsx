'use client';

import { useState, useEffect } from 'react';

import { ArrowUpIcon } from "lucide-react";

import { Button } from '../ui/button';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      const viewportHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      const scrollPercentage = (scrolled / (fullHeight - viewportHeight)) * 100

      if (scrollPercentage > 20) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      aria-label="Scroll to top"
      className="size-8 fixed bottom-4 right-4 rounded-full p-2"
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </Button>
  )
}
