'use client'

import React from 'react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import { FilterProvider } from './Filter'
import { ThemeProvider } from './Theme'
import { AppcontextProvider } from '../Context/AppContext'
export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <CartProvider>
            <AppcontextProvider>
             {children}
          </AppcontextProvider>
            </CartProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
