/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-auto w-full rounded-md border border-gray-800 bg-white px-[1rem] py-[0.7rem] text-sm ring-offset-gray-700  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 shadow',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
