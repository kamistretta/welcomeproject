import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-ink-800 text-white shadow-sm hover:bg-ink-700 hover:shadow-[0_0_15px_rgba(255,16,240,0.2)]',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
        outline: 'border border-neon-cyan/50 bg-transparent text-neon-cyan shadow-sm hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]',
        secondary: 'bg-ink-800 text-ink-100 shadow-sm hover:bg-ink-700',
        ghost: 'text-ink-200 hover:bg-ink-800/50 hover:text-white',
        link: 'text-neon-cyan underline-offset-4 hover:underline',
        coral: 'bg-coral-500 text-white shadow-sm hover:bg-coral-600 font-semibold box-glow-pink',
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
