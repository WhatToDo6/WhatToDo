import { createContext, useContext, useState } from 'react'

import { ChildrenProps } from '../types/commonType'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }: ChildrenProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const addToast = (message: string, type: Toast['type']) => {
    const id = new Date().getTime()

    setToasts([...toasts, { id, message, type }])
  }
  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
