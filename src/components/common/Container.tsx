import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-[800px]',
    md: 'max-w-[1020px]',
    lg: 'max-w-[1200px]',
    full: 'w-full'
  };

  return (
    <div
      className={`mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
