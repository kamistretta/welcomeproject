import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/30 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-purple-700 text-white shadow-sm hover:bg-purple-800',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
        outline: 'border border-purple-200 bg-white text-purple-700 shadow-sm hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300',
        secondary: 'bg-purple-100 text-purple-800 shadow-sm hover:bg-purple-200',
        ghost: 'text-purple-700 hover:bg-purple-50 hover:text-purple-800',
        link: 'text-purple-700 underline-offset-4 hover:underline',
        gold: 'bg-gold-500 text-purple-900 shadow-sm hover:bg-gold-400 font-semibold',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
