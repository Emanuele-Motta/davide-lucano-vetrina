import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 
    'bg-[#006875] text-white hover:bg-[#00525d] active:scale-[0.98] shadow-xs hover:shadow-md transition-all duration-200 focus-visible:ring-[#006875]',
  secondary: 
    'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] active:scale-[0.98] border border-black/[0.06] transition-all duration-200 focus-visible:ring-black/20',
  outline: 
    'border border-[#006875] text-[#006875] bg-transparent hover:bg-[#006875]/8 active:scale-[0.98] transition-all duration-200 focus-visible:ring-[#006875]',
  ghost: 
    'text-[#1d1d1f] hover:bg-black/[0.05] active:scale-[0.98] transition-all duration-200 focus-visible:ring-black/20',
  white: 
    'bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] active:scale-[0.98] shadow-2xs border border-black/[0.08] transition-all duration-200 focus-visible:ring-black/20'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-[13px] px-3.5 py-1.5 gap-1.5 rounded-full min-h-[36px]',
  md: 'text-[14px] sm:text-[15px] px-5 py-2.5 gap-2 rounded-full min-h-[44px]',
  lg: 'text-[16px] px-6 py-3.5 gap-2.5 rounded-full min-h-[48px]'
};

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium whitespace-nowrap select-none cursor-pointer
    focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if (as === 'a' || href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={baseClasses}
        aria-disabled={disabled || isLoading}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
