import React, { useMemo } from 'react'
import { ButtonType, ButtonTypeStyle } from './button.constant'
import cn from 'classnames'

interface ButtonProps {
  primary?: boolean
  type?: ButtonType
  label: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const Button = ({
  primary = false,
  type = ButtonType.PRIMARY_LARGE,
  label,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const ButtonClassName = useMemo(() => {
    if (primary) {
      return ButtonTypeStyle.PRIMARY_LARGE
    }
    if (type) {
      return ButtonTypeStyle[type]
    }
    return ''
  }, [type, primary, ButtonTypeStyle])

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(ButtonClassName, className)}
      {...props}
    >
      {label}
    </button>
  )
}
