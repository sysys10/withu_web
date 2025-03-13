interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size: 'lg' | 'md' | 'sm'
}

export function Button({ children, size, className, ...props }: ButtonProps) {
  const sizeStyle = {
    lg: 'w-full',
    md: 'w-1/2',
    sm: 'w-1/3'
  }
  return (
    <button
      className={sizeStyle[size] + 'h-12 w-full py-3 bg-black text-white rounded-md p-2' + className}
      {...props}>
      {children}
    </button>
  )
}
