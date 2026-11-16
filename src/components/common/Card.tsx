import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  hoverable = false,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}, ref) => {
  const paddingMap = {
    none: '',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7 md:p-8',
    lg: 'p-8 sm:p-10'
  };

  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-[20px] 
        ${bordered ? 'border border-black/[0.06]' : ''}
        shadow-2xs
        ${hoverable ? 'hover:border-black/[0.12] hover:shadow-xs transition-all duration-300' : ''}
        ${paddingMap[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
