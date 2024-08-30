'use client'
import React from 'react'

export const HideFooter: React.FC = () => {
  return (
    <style jsx global>{`
      footer {
        display: none !important;
      }
    `}</style>
  )
}
