import Image from 'next/image'
import { useEffect } from 'react'

import SUCCESS_IMG from '@/public/icons/check.svg'
import { useToast } from '@/src/context/toast'

import S from './Toast.module.scss'

type Timeout = NodeJS.Timeout

const Toast = () => {
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    const timeouts: Record<string, Timeout> = {}

    toasts.forEach((toast) => {
      setTimeout(() => {
        const element = document.getElementById(toast.id.toString())
        if (element) {
          element.classList.add(S.toastHide)
        }
      }, 2500)

      timeouts[toast.id] = setTimeout(() => {
        removeToast(toast.id)
      }, 3000)
    })

    return () => {
      Object.values(timeouts).forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [toasts, removeToast])

  return (
    <div className={S.toastContainer}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={toast.id.toString()}
          className={`${S.toast} ${S[`toast-${toast.type}`]}`}
        >
          {toast.type === 'success' && (
            <div className={S.imgSuccess}>
              <Image src={SUCCESS_IMG} alt="성공" width={18} height={18} />
            </div>
          )}
          {toast.type === 'error' && <div className={S.imgError}>!</div>}
          <p className={S.text}>{toast.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Toast
