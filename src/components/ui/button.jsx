import React from 'react'

function Button({ variant = 'default', size = 'default', className = '', children, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-white text-black hover:bg-gray-100',
    secondary: 'bg-black text-white hover:bg-gray-800',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 py-3 text-lg'
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export { Button } 